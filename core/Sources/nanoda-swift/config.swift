enum Config {
    enum Twitch {
        enum Client {
            static let id: String = ""
            static let secret: String = ""
        }
    }

    struct Provider: nanoda_swift.Twitch.ConfigProviding {
        var clientID: String { Config.Twitch.Client.id }
        var clientSecret: String { Config.Twitch.Client.secret }
    }
}
