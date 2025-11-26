import { PrismaClient } from '@prisma/client';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// Ensure generated client exists (helpful during local dev on fresh clones)
try {
	const generatedIndex = path.resolve(process.cwd(), 'node_modules', '.prisma', 'client', 'index.js');
	if (!existsSync(generatedIndex)) {
		console.log('Prisma client not generated yet — running `npx prisma generate`...');
		execSync('npx prisma generate', { stdio: 'inherit' });
	}
} catch (e) {
	// If generation fails, continue — the error will be handled when trying to connect
	console.warn('Automatic prisma generate failed or skipped:', e && e.message ? e.message : e);
}

const prisma = new PrismaClient();

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function connectWithRetry(maxRetries = 10, baseDelayMs = 1000) {
	let attempt = 0;
	while (true) {
		attempt++;
		try {
			await prisma.$connect();
			console.log('Prisma connected');
			return;
		} catch (err) {
			console.error(`Prisma connect failed (attempt ${attempt}): ${err.message || err}`);
			if (attempt >= maxRetries) {
				console.error('Max retries reached. Throwing error.');
				throw err;
			}
			const backoff = baseDelayMs * Math.min(2 ** (attempt - 1), 16);
			console.log(`Retrying in ${backoff}ms...`);
			await sleep(backoff);
		}
	}
}

// Start connection attempt in background (so importers don't need to await)
connectWithRetry().catch((err) => {
	console.error('Failed to connect to DB after retries:', err);
	// Do not exit process here; let container management handle restarts if desired.
});

export default prisma;