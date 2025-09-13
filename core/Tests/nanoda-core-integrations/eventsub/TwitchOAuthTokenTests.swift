import Testing

@testable import nanoda_swift

@Test func fetchesOAuthToken() async throws {
    try importDotEnv()
    let token = try await Twitch.Identity.getToken()

    #expect(token.access_token != nil)
    #expect(token.expires_in != nil)
    #expect(token.token_type != nil)
}
