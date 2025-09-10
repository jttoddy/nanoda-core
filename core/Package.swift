// swift-tools-version: 6.1
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "nanoda-swift",
    platforms: [.macOS("10.15")],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "nanoda-swift",
            targets: ["nanoda-swift"])
    ],
    dependencies: [
        .package(url: "https://github.com/Alamofire/Alamofire.git", .upToNextMajor(from: "5.10.0"))
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "nanoda-swift", dependencies: ["Alamofire"]),
        .testTarget(
            name: "nanoda-swiftTests",
            dependencies: ["nanoda-swift"]
        ),
    ],
)
