import { ConnectToDatabase } from '@/utils/mongo';
import { NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import * as jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const { password, email } = body;

		const { business } = await ConnectToDatabase();

		const user = await business.collection('users').findOne({ email });

		if (!user) {
			return new Response(JSON.stringify({ error: 'User not found' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}
		if (await bcrypt.compare(password, user.password)) {
			const cookie = await cookies();

			const authToken = jwt.sign(
				{
					userId: user._id.toString(),
					username: user.username,
					email: user.email,
				},
				process.env.USER_ACTION_ACCESS as string
			);

			cookie.set('authToken', authToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 24 * 30, // 30 days
			});

			return new Response(JSON.stringify({ message: 'logged in' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		return new Response(JSON.stringify({ error: 'Wrong password' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('❌ ~ authenticate-user ~ error:', error);
		return new Response(JSON.stringify({ error: 'Something went wrong' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
