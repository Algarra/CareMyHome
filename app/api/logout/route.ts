import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const response = NextResponse.json({ message: 'Logged out successfully' });

		// ✅ Set the cookie with an expired date to delete it
		response.headers.set(
			'Set-Cookie',
			'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; HttpOnly; Secure; SameSite=Strict;'
		);

		return response;
	} catch (error) {
		console.error('❌ Logout Error:', error);
		return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
	}
}
