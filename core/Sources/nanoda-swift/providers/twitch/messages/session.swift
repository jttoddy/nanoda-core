extension Twitch.EventSub {
    public struct Session: Sendable, Decodable {
        let id: String
        let status: String
        let connected_at: String
        let keepalive_timeout_seconds: Int
        let reconnect_url: String?
    }
}
