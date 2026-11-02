---
"@kjanat/openauth": patch
---

Update `jose` to 6.2.15 and `@standard-schema/spec` to 1.1.0. `KeyPair` keys are typed as `CryptoKey`, and subject schemas are typed as `StandardSchemaV1`. Signing and encryption keys stored by earlier versions still load, and tokens they issued still verify and decrypt.
