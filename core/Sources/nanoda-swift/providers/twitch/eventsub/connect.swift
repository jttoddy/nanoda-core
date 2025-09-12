import Foundation

extension Twitch.EventSub {
    enum Errors: Error {
        case unknownMessageType
    }

    static func connect() async throws -> Message {
        let websocket = Alamofy.websocket(url: URL(string: Host.wss)!)

        var message: Message = try await websocket.receive()

        if case .unknown = message.metadata.message.kind {
            throw Errors.unknownMessageType
        }

        return message
    }
}
