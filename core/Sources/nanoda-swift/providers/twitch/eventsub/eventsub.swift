import Foundation

extension Twitch {
    public enum EventSub {
        enum Host {
            static let api: String = "https://api.twitch.tv/helix/eventsub"
            static let wss: String = "wss://eventsub.wss.twitch.tv/ws"
        }

        enum Response {}
    }
}

extension Twitch.EventSub.Response {
    struct Subscriptions: Decodable {
        struct Subscription: Decodable {
            let id: String
            let status: String?
            let type: String
            let version: String?
            let condition: Condition
            let created_at: String?
            let transport: Condition
            let cost: Int
        }

        let data: [Subscription]?
        let total: Int?
        let total_cost: Int?
        let max_total_cost: Int?
    }
}

extension Twitch.EventSub.Response.Subscriptions.Subscription {
    struct Condition: Decodable {
        let user_id: String
    }

    struct Transport: Decodable {
        let method: String
        let callback: String
    }
}
