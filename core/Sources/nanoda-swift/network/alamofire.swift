import Alamofire
import Foundation

enum Alamofy {
    static func request<T: Decodable & Sendable>(_ req: Network.Request<T>, host: String)
        async throws -> T
    {
        let request = AF.request(host + req.path, method: req.method)
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

    static func websocket(url: URL) -> URLSessionWebSocketTask {
        AF.session.webSocketTask(with: url)
    }
}
