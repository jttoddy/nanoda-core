extension Nanoda {
    class Chatroom {
        let userStream: CurrentValueStream<[Models.Chat.User]> = .init([])
        let messageStream: PassthroughStream<[Models.Chat.Message]> = .init()
    }
}
