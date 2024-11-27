import { adminAuth } from '$lib/server/firebaseAdmin';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const { cookies } = event;
	const sessionCookie = cookies.get('__session');
	if (!sessionCookie && event.url.pathname.startsWith('/dashboard')) {
		redirect(303,'/')
	}
	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);

		event.locals.userId = decodedClaims.uid;
		event.locals.profilePic = decodedClaims.picture
	} catch (e) {
		event.locals.userId = null;

		return resolve(event);
	}

	return resolve(event);
};