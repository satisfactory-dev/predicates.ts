import {
	spec,
} from 'node:test/reporters';
import {
	run,
} from 'node:test';

const ac = new AbortController();

let already_stopped = false;

run({
	files: [
		`${import.meta.dirname}/tests/src/ArrayUtilities.spec.ts`,
		`${import.meta.dirname}/tests/src/predicates.spec.ts`,
	],
	concurrency: true,
	signal: ac.signal,
})
	.on('test:fail', (e) => {
		ac.abort();
		if (!already_stopped) {
			console.error(e);
		}
		already_stopped = true;
		process.exitCode = 1;
	})
	.compose(spec)
	.pipe(process.stdout);
