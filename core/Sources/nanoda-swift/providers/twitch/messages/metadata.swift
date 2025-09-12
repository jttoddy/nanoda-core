extension Twitch.EventSub {
    public struct Metadata: Sendable, Decodable {
        let message_id: String?
        let message_type: String?
        let message_timestamp: String?

        public struct Message: Sendable {
            enum Kind: String {
                case sessionWelcome = "session_welcome"
                case unknown
            }

            let id: String
            let type: String
            let timestamp: String

            var kind: Kind { Kind.init(rawValue: type) ?? .unknown }
        }

        public lazy var message = Message(
            id: message_id ?? "",
            type: message_type ?? "",
            timestamp: message_timestamp ?? ""
        )
    }
}
