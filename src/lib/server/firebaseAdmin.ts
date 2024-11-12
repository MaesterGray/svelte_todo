import { getAuth } from 'firebase-admin/auth';
import { SECRET_FB_CLIENT_EMAIL, SECRET_FB_PRIVATE_KEY, SECRET_FB_PROJECT_ID } from '$env/static/private';
import pkg from 'firebase-admin';

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: SECRET_FB_PROJECT_ID,
			clientEmail: SECRET_FB_CLIENT_EMAIL,
			privateKey: SECRET_FB_PRIVATE_KEY
		})
	});
} catch (e) {
	const err = e as Error; 
	if (!/already exists/u.test(err.message)) {
		console.error('Firebase Admin Error: ', err.stack);
	}
}

export const adminAuth = getAuth();