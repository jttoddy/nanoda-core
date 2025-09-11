import Alamofire

extension Nanoda {
    enum Models {}
}

extension Nanoda.Models {
    enum Chat {
        struct User {
            let username: String
            let ext_user_id: String
            let pronouns: String?
        }

        struct Message {
            let time: String
            let user: User
            let message: String
            let ext_msg_id: String
        }
    }
}

extension Network {
    struct Request<T: Decodable> {
        let path: String
        var method: HTTPMethod = .get
        let headers: [String: String]
        let query: [String: String]

        var response: T.Type = T.self
    }
}
