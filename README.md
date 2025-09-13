# Nanoda's tools repo

- Nanoda core server framework
  - Integrates with Twitch for various API integrations
  - Has an API for my own clients to use
    - Web Stream Overlay
    - Streamdeck-adjacent things (IRL button do thing)
    - Chat interaction

## Requirements

- Swift 6.5
- macOS 10.15 or better
- `make`

## How to run core

create a copy of `.env.template` and call it `.env`, then

```
cd core
make build
```
