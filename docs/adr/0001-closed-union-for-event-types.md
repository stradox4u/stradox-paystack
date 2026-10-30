# Closed union for Event types

`PaystackEvent` is a closed union of the Event types the package knows about. It has no catch-all member for Event types Paystack adds later. A catch-all (`{ event: string; data: unknown }`) would stop TypeScript from narrowing on `event.event`, so every handler would need casts, which defeats the point of typed Events.

## Consequences

- The types are knowingly incomplete. An app on an older version can receive an Event whose type is not in the union. At runtime it falls through to the `default` branch of a `switch` on `event.event`.
- The README must tell users to keep a `default` branch that acknowledges the Webhook and does not throw. An exhaustiveness check such as `assertNever()` would turn every new Paystack Event type into a failed delivery that Paystack retries for 72 hours.
- New Event types are added to the union in minor releases. Adding a catch-all later would be a breaking change for everyone who narrows on `event.event`.
