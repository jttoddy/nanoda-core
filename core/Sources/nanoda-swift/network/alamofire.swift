import Alamofire
import Foundation

enum Alamofy {
    static func request<T: Decodable & Sendable>(
        _ req: Network.Request<T>,
        host: String
    ) async throws -> T {
        let request = AF.request(
            host + req.path,
            method: req.method,
            parameters: req.query,
            headers: HTTPHeaders(req.headers)
        )

        Log.Network.request.info("\(req.method.rawValue) -> \(host + req.path)")

        return try await withCheckedThrowingContinuation { continuation in
            request.responseDecodable(
                of: T.self
            ) { dataResult in
                switch dataResult.result {
                case .success(let value):
                    continuation.resume(with: .success(value))

                case .failure(let error):
                    continuation.resume(throwing: error)
                }
            }
        }
    }

    static func websocket(url: URL) -> Network.Websocket {
        AF.session.webSocketTask(with: url).alamofy
    }
}

extension URLSessionWebSocketTask {
    var alamofy: Network.Websocket {
        Network.Websocket(task: self)
    }
}
