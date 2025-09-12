extension Twitch.EventSub {
    enum Endpoint {
        static let Subscriptions:
            @Sendable (Twitch.ConfigProviding) -> Network.Request<Response.Subscriptions> = {
                config in
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
}
