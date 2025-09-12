public func setup() {
    do {
        try importDotEnv()
    } catch {
        fatalError("Program failed to initialise: \(error.localizedDescription)")
    }
}
