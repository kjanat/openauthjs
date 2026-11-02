import { serve } from '@hono/node-server';
import { issuer } from '@kjanat/openauth';
import { PasswordProvider } from '@kjanat/openauth/provider/password';
import { MemoryStorage } from '@kjanat/openauth/storage/memory';
import { PasswordUI } from '@kjanat/openauth/ui/password';
import { subjects } from '../../subjects';

async function getUser(email: string) {
	// Get user from database
	// Return user ID
	return '123';
}

const app = issuer({
	subjects,
	storage: MemoryStorage({
		persist: './persist.json',
	}),
	providers: {
		password: PasswordProvider(
			PasswordUI({
				sendCode: async (email, code) => {
					console.log(email, code);
				},
			}),
		),
	},
	success: async (ctx, value) => {
		if (value.provider === 'password') {
			return ctx.subject('user', {
				id: await getUser(value.email),
			});
		}
		throw new Error('Invalid provider');
	},
});

serve(app);
