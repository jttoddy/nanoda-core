import SwiftDotenv

public func importDotEnv(path: String = "../.env") throws {
    try Dotenv.configure(atPath: path)
}
