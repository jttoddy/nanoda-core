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
}
