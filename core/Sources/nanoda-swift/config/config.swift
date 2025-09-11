import SwiftDotenv

enum Config {
    enum Twitch {
        enum Client {
            static let id: String = { Dotenv.TWITCH_CLIENT_ID?.stringValue ?? "" }()
            static let secret: String = { Dotenv.TWITCH_CLIENT_TOKEN?.stringValue ?? "" }()
        }
    }

    struct Provider: nanoda_swift.Twitch.ConfigProviding {
        var clientID: String { Config.Twitch.Client.id }
        var clientSecret: String { Config.Twitch.Client.secret }
    }
}
