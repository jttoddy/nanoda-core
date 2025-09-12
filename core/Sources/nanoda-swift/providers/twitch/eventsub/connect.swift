import Foundation

extension Twitch.EventSub {
    enum Errors: Error {
        case unknownMessageType
    }

    actor Connector {
        let websocket: Network.Websocket

        init(websocket: Network.Websocket) {
            self.websocket = websocket
        }

        func receive() async throws -> Message {
            var message: Message = try await websocket.receive()

            if case .unknown = message.metadata.message.kind {
                throw Errors.unknownMessageType
            }

            return message
        }
    }

    static func connect() async throws -> Message {
        let websocket = Alamofy.websocket(url: URL(string: Host.wss)!)
        return try await Connector(websocket: websocket).receive()
    }
}
