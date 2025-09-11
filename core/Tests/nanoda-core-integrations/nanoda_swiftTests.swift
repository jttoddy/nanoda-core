import Testing

@testable import nanoda_swift

@Suite struct ConfigDotEnvTests {
    init() throws {
        try importDotEnv(path: "test.env")
    }

    @Test func inheritsTwitchAuthConfig() throws {
        //
    }
}
