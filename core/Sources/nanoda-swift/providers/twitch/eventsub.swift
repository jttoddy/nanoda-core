import Foundation

extension Twitch {
    enum EventSub {
        enum Host {
            static let api: String = "https://api.twitch.tv/helix/eventsub"
            static let wss: String = "wss://eventsub.wss.twitch.tv/ws"
        }

        enum Endpoint {
            static let Subscriptions:
                @Sendable (ConfigProviding) -> Network.Request<Response.Subscriptions> = { config in
                    Network.Request(
                        path: "/subscriptions",
                        method: .post,
                        headers: [
                            "Authorization": "Bearer ##TOKEN##",
                            "Client-Id": "##CLIENT_ID##",
                            "Content-Type": "application/json",
                        ],
                        query: [:]
                    )
                }
        }

        enum Request {
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

        enum Response {
            struct Subscriptions: Decodable {
                //
            }
        }

        static func connect() async throws {
            let websocket = Alamofy.websocket(url: URL(string: EventSub.Host.wss)!)

            let message = try await websocket.receive()

            // This should contain some kind of 'welcome-message' that we should decode
            // and retain.

            //{
            //  "metadata": {
            //    "message_id": "96a3f3b5-5dec-4eed-908e-e11ee657416c",
            //    "message_type": "session_welcome",
            //    "message_timestamp": "2023-07-19T14:56:51.634234626Z"
            //  },
            //  "payload": {
            //    "session": {
            //      "id": "AQoQILE98gtqShGmLD7AM6yJThAB",
            //      "status": "connected",
            //      "connected_at": "2023-07-19T14:56:51.616329898Z",
            //      "keepalive_timeout_seconds": 10,
            //      "reconnect_url": null
            //    }
            //  }
            //}
        }
    }
}
