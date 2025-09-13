import Foundation

private let log = Log.Network.websocket
private let session = URLSession(configuration: URLSessionConfiguration.default)

extension Network {

    static func websocket(at path: URL) -> Websocket {
        let task = session.webSocketTask(with: path)
        return Websocket(task: task)
    }

    actor Websocket {
        let task: URLSessionWebSocketTask
        init(task: URLSessionWebSocketTask) {
            self.task = task
            self.task.resume()
        }

        enum Errors: Error {
            case stringReturnNotSupported(String)
            case unknownReturnTypeFromWebsocket
        }

        enum Response {
            case data(Data)
            case string(String)

            var data: Data? {
                switch self {
                case .data(let data): return data
                default: return nil
                }
            }

            var string: String? {
                switch self {
                case .string(let value): return value
                default: return nil
                }
            }
        }

        func receive() async throws -> Response {
            let result = try await task.receive()
            switch result {
            case .data(let data):
                log.trace("Found data")
                return .data(data)
            case .string(let value):
                log.trace("Found string")
                return .string(value)
            default:
                throw Errors.unknownReturnTypeFromWebsocket
            }
        }

        func receive<T: Decodable>() async throws -> T {
            let response = try await receive()
            switch response {
            case .data(let data):
                return try JSONDecoder().decode(T.self, from: data)
            case .string(let string):
                let data = string.data(using: .utf8)
                return try JSONDecoder().decode(T.self, from: data!)
            }
        }
    }
}
