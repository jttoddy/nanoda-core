import Logging

enum Log {
    enum Network {
        static let request = Logger(label: "network-request")
        static let websocket = Logger(label: "network-websocket")
    }
    enum Twitch {
        static let eventsub = Logger(label: "twitch-eventsub")
    }

    static func info(message: Logger.Message, metadata: Logger.Metadata?) -> (Logger) -> Void {
        { logger in
            let prefix = logger.label
            logger.info("[\(prefix)] \(message)", metadata: metadata)
        }
    }

    static func warning(message: Logger.Message, metadata: Logger.Metadata?) -> (Logger) -> Void {
        { logger in
            let prefix = logger.label
            logger.warning("[\(prefix)] \(message)", metadata: metadata)
        }
    }

    static func trace(message: Logger.Message, metadata: Logger.Metadata?) -> (Logger) -> Void {
        { logger in
            let prefix = logger.label
            logger.trace("[\(prefix)] \(message)", metadata: metadata)
        }
    }
}
