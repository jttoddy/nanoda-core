import Foundation
import Logging

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
            Log.Twitch.eventsub.info("Attempting to receive message via connector")
            var message: Message = try await websocket.receive()

            if case .unknown = message.metadata.message.kind {
                Log.Twitch.eventsub.warning("Unknown message type!")
                throw Errors.unknownMessageType
            }

            return message
        }
    }

    static func connect() async throws -> Message {
        Log.Twitch.eventsub.info("Creating websocket at host \(Host.wss)")
        let websocket = Network.websocket(at: URL(string: Host.wss)!)

        return try await Connector(websocket: websocket).receive()
    }
}
