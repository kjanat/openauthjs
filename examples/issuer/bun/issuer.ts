import { issuer } from "@kjanat/openauth"
import { MemoryStorage } from "@kjanat/openauth/storage/memory"
import { PasswordProvider } from "@kjanat/openauth/provider/password"
import { PasswordUI } from "@kjanat/openauth/ui/password"
import { subjects } from "../../subjects.js"

async function getUser(email: string) {
  // Get user from database
  // Return user ID
  return "123"
}

export default issuer({
  subjects,
  storage: MemoryStorage({
    persist: "./persist.json",
  }),
  providers: {
    password: PasswordProvider(
      PasswordUI({
        sendCode: async (email, code) => {
          console.log(email, code)
        },
        validatePassword: (password) => {
          if (password.length < 8) {
            return "Password must be at least 8 characters"
          }
        },
      }),
    ),
  },
  async allow() {
    return true
  },
  success: async (ctx, value) => {
    if (value.provider === "password") {
      return ctx.subject("user", {
        id: await getUser(value.email),
      })
    }
    throw new Error("Invalid provider")
  },
})
