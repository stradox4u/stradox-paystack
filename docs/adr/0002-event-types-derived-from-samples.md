# Event types are derived from Paystack's sample payloads

Paystack documents one sample payload per Event type. The samples date from 2016 to 2025, and they disagree with each other and with this package's API response types. We type Events from those samples alone. Where they leave a field's type open, we use `unknown` or an optional field rather than a guess, because a confidently wrong type does users more harm than one they have to check.

## Rules

- A field that is `null` in every sample of its group is `unknown`, not `T | null`.
- Samples in the same group, such as the three transfer Events, are merged into one type:
  - fields in every sample are required, and fields in only some are optional
  - conflicting types become unions (`amount: number | string`)
  - a field that is `null` in some samples and set in others is `T | null`
  - both spellings of a field (`created_at`, `createdAt`) are optional
- Only `event` and `domain` get literal types. Values seen in samples aren't a complete list, so fields like `status` and `resolution` are `string`.
- An object seen both empty (`{}`) and full is typed as "full or empty", so checking one of its fields narrows it. An object only ever seen empty is `Record<string, unknown>`.
- `metadata` is always `unknown`, because it is whatever the merchant attached.
- Event data types are separate from the API response types, even where the shapes look alike. Payloads are not validated at runtime, which keeps the package dependency-free.

## Consequences

- Fields such as `message: unknown` will look under-typed. Tighten one only with evidence of what Paystack sends, such as a captured live Event. Don't copy the type from an API response.
- Tightening a type (`unknown` to `string | null`, or optional to required) is safe in a minor release. Widening one, for example adding `| null`, can break users' code.
- The samples live in `src/tests/unit/webhookEvents.ts`, and the type check fails if an Event type stops accepting them. Add newly captured payloads there.
