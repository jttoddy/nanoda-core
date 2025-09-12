import Alamofire

enum Twitch {
    protocol ConfigProviding {
        var clientID: String { get }
        var clientSecret: String { get }
    }
}
