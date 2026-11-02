---
"@kjanat/openauth": patch
---

Redeem authorization codes on storage adapters without `consume`, such as the built-in Cloudflare KV and DynamoDB storages, by reading and then removing the code. 0.5.0 threw instead, so code exchange failed on those adapters.
