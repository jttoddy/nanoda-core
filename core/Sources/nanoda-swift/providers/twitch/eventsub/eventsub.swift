import Foundation

extension Twitch {
    public enum EventSub {
        enum Host {
            static let api: String = "https://api.twitch.tv/helix/eventsub"
            static let wss: String = "wss://eventsub.wss.twitch.tv/ws"
        }

        enum Response {
            struct Subscriptions: Decodable {
                //
            }
        }
    }
}
