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
        var message = try await Twitch.EventSub.connect()
        let kind = message.metadata.message.kind

        #expect(kind == .unknown)
    }
}
