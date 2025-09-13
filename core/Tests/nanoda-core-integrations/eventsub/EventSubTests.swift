import Foundation
import Testing

@testable import nanoda_swift

@Suite struct EventSubTests {
    enum WowError: Error {
        case some
    }

    @Test func connectionReceivesWelcome() async throws {
        try importDotEnv()

        let connectTask = Task {
            return try await Twitch.EventSub.connect()
        }

        let message = try await connectTask.value

        #expect(message.metadata.message_type != nil)
    }
}
