import Alamofire

extension Network {
    struct QueryRequest<T: Decodable> {
        let path: String
        var method: HTTPMethod = .get
        let headers: [String: String]
        var query: [String: String] = [:]

        var response: T.Type = T.self
    }

    struct EncodableRequest<S: Encodable, T: Decodable> {
        let path: String
        var method: HTTPMethod = .get
        let headers: [String: String]
        let body: S

        var response: T.Type = T.self
    }

    typealias OK = EmptyResponse

    struct EmptyResponse: Codable {}
}
