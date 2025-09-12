extension Twitch.EventSub {
    public struct Payload: Sendable, Decodable {
        public let session: Session?
    }

    public struct Message: Sendable, Decodable {
        var metadata: Metadata
        var payload: Payload?
    }
}
