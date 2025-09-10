enum Twitch {
    protocol ConfigProviding {
        var clientID: String { get }
        var clientSecret: String { get }
    }

    enum Identity {
        enum Host {
            static let identity: String = "id.twitch.tv"
        }

        enum Endpoint {
            static let OAuthToken:
                @Sendable (ConfigProviding) ->
                    Network.Request<Response.OAuthToken> = { config in
                        Network.Request(
                            path: "/oauth2/token", method: "POST",
                            headers: ["Content-Type": "application/x-www-form-urlencoded"],
                            query: [
                                "client_id": config.clientID,
                                "client_secret": config.clientSecret,
                                "grant_type": "client_credentials",
                            ]
                        )
                    }
        }

        enum Response {
            struct OAuthToken: Codable {
                let access_token: String?
                let expires_in: Int?
                let token_type: String?
            }
        }
    }
}
