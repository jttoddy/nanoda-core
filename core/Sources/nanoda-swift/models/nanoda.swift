enum Nanoda {}

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
