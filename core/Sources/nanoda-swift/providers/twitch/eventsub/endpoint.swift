extension Twitch.EventSub {
    enum Endpoint {
        static func subscriptions(request: Request.Subscriptions)
            -> @Sendable (Twitch.ConfigProviding)
            -> Network.EncodableRequest<Request.Subscriptions, Response.Subscriptions>
        {
            return { config in
                Network.EncodableRequest(
                    path: "/subscriptions",
                    method: .post,
                    headers: [
                        "Authorization": "Bearer \(config.clientSecret)",
                        "Client-Id": "\(config.clientID)",
                        "Content-Type": "application/json",
                    ],
                    body: request
                )
            }
        }
    }
}
