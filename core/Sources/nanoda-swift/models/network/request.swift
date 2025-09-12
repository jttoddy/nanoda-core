import Alamofire

extension Network {
    struct Request<T: Decodable> {
        let path: String
        var method: HTTPMethod = .get
        let headers: [String: String]
        let query: [String: String]

        var response: T.Type = T.self
    }
}
