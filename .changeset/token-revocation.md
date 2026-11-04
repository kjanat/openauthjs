---
"@kjanat/openauth": minor
---

Add RFC 7009 refresh token revocation. The issuer serves `POST /revoke` and advertises it as `revocation_endpoint`; it deletes a refresh token only for the client that owns it. Clients call `client.revoke(refresh)`, for example when a user signs out.
