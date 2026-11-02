import { issuer } from '@kjanat/openauth';
import { CodeProvider } from '@kjanat/openauth/provider/code';
import { MemoryStorage } from '@kjanat/openauth/storage/memory';
import { CodeUI } from '@kjanat/openauth/ui/code';
import { handle } from 'hono/aws-lambda';
import { subjects } from './subjects';

async function getUser(email: string) {
	// Get user from database and return user ID
	return '123';
}

const app = issuer({
	subjects,
	storage: MemoryStorage(),
	// Remove after setting custom domain
	allow: async () => true,
	providers: {
		code: CodeProvider(
			CodeUI({
				sendCode: async (email, code) => {
					console.log(email, code);
				},
			}),
		),
	},
	success: async (ctx, value) => {
		if (value.provider === 'code') {
			return ctx.subject('user', {
				id: await getUser(value.claims.email),
			});
		}
		throw new Error('Invalid provider');
	},
});

export const handler = handle(app);
