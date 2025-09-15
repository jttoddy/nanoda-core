import Foundation
import Testing

@testable import nanoda_swift

@Suite struct EventSubTests {
    enum WowError: Error {
        case some
    }

    private let token: Twitch.Identity.Response.OAuthToken

    init() async throws {
        try importDotEnv()

        token = try await Twitch.Identity.getToken()
    }

    @Test func connectionReceivesWelcome() async throws {
        let connectTask = Task {
            return try await Twitch.EventSub.connect()
        }

        let message = try await connectTask.value

        #expect(message.metadata.message_type != nil)
    }

    @Test func websocketStreamsEvents() async throws {
        let stream = Twitch.EventSub.stream()

        var messages: [Twitch.EventSub.Message] = []
        for try await message in stream.stream {
            messages.append(message)
            break
        }

        #expect(messages.count > 0)

        stream.cancel()
    }
}
