import Foundation
import Testing

@testable import nanoda_swift

@Suite struct EventSubTests {
    enum WowError: Error {
        case some
    }

    @Test func connectionReceivesWelcome() async throws {
        try importDotEnv()
        let token = try await Twitch.Identity.getToken()

        // var message = try await Twitch.EventSub.connect()
        // let kind = message.metadata.message.kind

        // #expect(kind == .unknown)
    }
}
