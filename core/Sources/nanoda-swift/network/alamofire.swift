import Alamofire
import Foundation

enum Alamofy {
    @discardableResult
    static func request<S: Encodable & Sendable, T: Decodable & Sendable>(
        _ req: Network.EncodableRequest<S, T>,
        host: String
    ) async throws -> T {
        let request = AF.request(
            host + req.path,
            method: req.method,
            parameters: req.body,
            headers: HTTPHeaders(req.headers)
        )

        Log.Network.request.info("\(req.method.rawValue) -> \(host + req.path)")

        return try await response(request)
    }

    @discardableResult
    static func request<T: Decodable & Sendable>(
        _ req: Network.QueryRequest<T>,
        host: String
    ) async throws -> T {
        let request = AF.request(
            host + req.path,
            method: req.method,
            parameters: req.query,
            headers: HTTPHeaders(req.headers)
        )

        Log.Network.request.info("\(req.method.rawValue) -> \(host + req.path)")

        return try await response(request)
    }
}

private func response<T: Decodable & Sendable>(_ req: DataRequest) async throws -> T {
    return try await withCheckedThrowingContinuation { continuation in
        req.responseDecodable(
            of: T.self
        ) { dataResult in
            switch dataResult.result {
            case .success(let value):
                Log.Network.request.trace("Retrieved \(T.Type.self)")
                continuation.resume(with: .success(value))

            case .failure(let error):
                Log.Network.request.error(
                    """
                    Failed decoding response: \(error.errorDescription ?? "Unknown")
                    """
                )
                continuation.resume(throwing: error)
            }
        }
    }
}
