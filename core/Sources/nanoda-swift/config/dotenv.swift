import Foundation
import SwiftDotenv

public func importDotEnv(
    path: String = FileManager.default.currentDirectoryPath + "/../.env"
) throws {
    try Dotenv.configure(atPath: path)
}
