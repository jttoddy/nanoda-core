extension Twitch.EventSub {
    public enum Request {
        struct Subscriptions: Encodable {
            let type: String = "user.update"
            let version: String = "1"
            let condition: Condition
            struct Condition: Encodable {
                let user_id: String
            }
            let transport: Transport
            struct Transport: Encodable {
                let method: String = "websocket"
                let session_id: String
            }
        }
    }

    static func createSubscription(
        userID: String,
        sessionID: String
    ) async throws -> Response.Subscriptions {
        let request = Request.Subscriptions(
            condition: .init(user_id: userID),
            transport: .init(session_id: sessionID)
        )

        let endpoint = Endpoint.createSubscription(request: request)(Config.Provider())

        return try await Alamofy.request(endpoint, host: Host.api)
    }

    static func deleteSubscription(with id: String) async throws {
        let endpoint: Network.QueryRequest<Network.OK> =
            Endpoint
            .deleteSubscription(id)(Config.Provider())

        try await Alamofy.request(endpoint, host: Host.api)
    }
}
