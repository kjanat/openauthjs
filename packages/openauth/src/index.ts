export {
	/**
	 * @deprecated
	 * Use `import { createClient } from "@kjanat/openauth/client"` instead - it will tree shake better
	 */
	createClient,
} from './client.js';

export {
	/**
	 * @deprecated
	 * Use `import { createSubjects } from "@kjanat/openauth/subject"` instead - it will tree shake better
	 */
	createSubjects,
} from './subject.js';

import { issuer } from './issuer.js';

export {
	issuer,
	/**
	 * @deprecated
	 * Use `import { issuer } from "@kjanat/openauth"` instead, it was renamed
	 */
	issuer as authorizer,
};
