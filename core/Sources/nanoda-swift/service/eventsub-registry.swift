extension Service.EventSub {
    enum Errors: Error {
        case noSessionIDInSocketResponse
    }
    static func register(id: String) async throws -> WebsocketConnection {
        // Connect to Websocket
        let connection = Twitch.EventSub.stream(id: id)

        // Welcome message contains key
        let message = try await connection.stream.first(where: { message in 
            var metadata = message.metadata
            return metadata.message.kind == .sessionWelcome
        })

        guard let sessionID = message?.payload?.session?.id else {
            throw Errors.noSessionIDInSocketResponse
        }

        // REST API request to create subscription

        // Verify challenge message from Websocket

        return connection
    }
}
