import Atomics
import Foundation
import Logging

typealias MessageStream = AsyncThrowingMapSequence<WebSocketStream, Twitch.EventSub.Message>

extension URLSessionWebSocketTask: AtomicReference {}

extension ManagedAtomic: @unchecked Sendable {}

private let connections = ManagedAtomic<URLSessionWebSocketTask?>(nil)

extension Twitch.EventSub {
    enum Errors: Error {
        case unknownMessageType
        case subscription
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
        connections.store(websocket.task, ordering: .relaxed)

        return try await Connector(websocket: websocket).receive()
    }

    static func stream() -> MessageStream {
        Log.Twitch.eventsub.info("Creating websocket at host \(Host.wss)")
        let websocket = Network.session.webSocketTask(with: URL(string: Host.wss)!)
        connections.store(websocket, ordering: .relaxed)

        defer {
            // Could potentially have a session manager for resume/pause connection
            websocket.resume()
        }

        return Network.subscription(websocket.asyncStream)
    }
}
