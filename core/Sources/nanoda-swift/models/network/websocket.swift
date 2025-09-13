import Foundation

private let log = Log.Network.websocket

extension Network {

    actor Websocket {
        let task: URLSessionWebSocketTask
        init(task: URLSessionWebSocketTask) {
            self.task = task
        }

        enum Errors: Error {
            case stringReturnNotSupported
            case unknownReturnTypeFromWebsocket
        }

        func receive() async throws -> Data {
            log.info("Websocket receiving")
            let result = try await task.receive()
            log.info("Done")
            switch result {
            case .data(let data):
                log.info("Found data")
                return data
            case .string:
                throw Errors.stringReturnNotSupported
            default:
                throw Errors.unknownReturnTypeFromWebsocket
            }
        }

        func receive<T: Decodable>() async throws -> T {
            let data = try await receive()
            return try JSONDecoder().decode(T.self, from: data)
        }
    }
}
