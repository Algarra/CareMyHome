import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import * as jwt from 'jsonwebtoken';

const MAX_AGE_MS = 60_000;

export async function GET(req: NextRequest) {
	const path = req.nextUrl.searchParams.get('path');
	const sig = req.nextUrl.searchParams.get('sig');

	if (!path || !sig) {
		return NextResponse.json({ error: 'Missing params' }, { status: 400 });
	}

	const sigContent: any = jwt.verify(sig, process.env.USER_ACTION_ACCESS as string);
	if (!sigContent) {
		return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
	}
	const { date } = sigContent;
	const now = Date.now();

	if (isNaN(date) || Math.abs(now - date) > MAX_AGE_MS) {
		return NextResponse.json({ error: 'Token expired' }, { status: 403 });
	}

	try {
		revalidatePath(path);
		return NextResponse.json({ revalidated: true });
	} catch {
		return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
	}
}
