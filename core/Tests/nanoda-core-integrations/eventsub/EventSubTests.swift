import Foundation
import Testing

@testable import nanoda_swift

@Suite struct EventSubTests {
    enum WowError: Error {
        case some
    }

    init() throws {
        try importDotEnv()
    }

    @Test func connectionReceivesWelcome() async throws {
        // let message = try await Twitch.EventSub.connect()
    }
}
