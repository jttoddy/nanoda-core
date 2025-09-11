import Foundation
import Testing

@testable import nanoda_swift

@Suite struct ConfigDotEnvTests {
    enum WowError: Error {
        case some
    }

    init() throws {
        let wd = FileManager.default.currentDirectoryPath
        let testEnvPath = "/Tests/nanoda-core-integrations/test.env"
        if !FileManager.default.fileExists(atPath: wd + testEnvPath) {
            throw WowError.some
        }
        try importDotEnv(path: wd + testEnvPath)
    }

    @Test func inheritsTwitchAuthConfig() throws {
        let sampleID = Config.Twitch.Client.id
        let sampleSecret = Config.Twitch.Client.secret
        #expect(sampleID == "test-id")
        #expect(sampleSecret == "test-token")
    }
}
