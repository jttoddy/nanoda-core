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
        for try await message in stream {
            messages.append(message)
            break
        }

        #expect(messages.count > 0)
    }

    @Test func createsThenDeletesSubscription() async throws {
        // Note: Currently broken
        //        let connectTask = Task {
        //            return try await Twitch.EventSub.connect()
        //        }
        //
        //        let message = try await connectTask.value
        //
        //        let userID = token.access_token ?? ""
        //        let sessionID = message.payload?.session?.id ?? ""
        //        #expect(userID != "")
        //        #expect(sessionID != "")
        //
        //        let response = try await Twitch.EventSub.createSubscription(
        //            userID: userID,
        //            sessionID: sessionID
        //        )
        //
        //        #expect(response.data.count > 0)
        //
        //        let subscription = response.data.first(where: { sub in
        //            sub.condition.user_id == userID
        //        })
        //
        //        #expect(subscription != nil)
        //
        //        let subscriptionID = subscription?.id ?? ""
        //
        //        #expect(subscriptionID != "")
        //
        //        try await Twitch.EventSub.deleteSubscription(with: subscriptionID)
    }
}
