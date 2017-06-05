import * as util from 'gulp-util';
import * as chalk from 'chalk';

type Chunk = [string, chalk.ChalkChain] | string;

/**
 * Render a message chunk out to a printable string.
 */
const render = (c: Chunk) => typeof c === 'string' ? c : c[1](c[0]);

/**
 * Flatten a collection of message chunks into a single, rendered string.
 */
const flatten = (...c: Chunk[]) => c.map(render)
                                    .filter((x) => x.length)
                                    .join(' ');

/**
 * Append a message to the gulp output.
 */
const log = (...message: Chunk[]) => util.log(flatten(...message));

interface LoggerOptions {
    prefix?: Chunk;
    style?: chalk.ChalkChain;
}

/**
 * Create a styled logger with a predfined prefix.
 */
const logger = (opts: LoggerOptions) => (message: string) => {
    const m = opts.style ? [message, opts.style] as Chunk : message;
    const p = opts.prefix || '';
    log(p, m);
};

/**
 * Append an error message to the gulp output.
 */
export const error = logger({
    prefix: ['ERROR', chalk.black.bgRed]
});

/**
 * Append a warning message to the gulp output.
 */
export const warn = logger({
    prefix: ['WARNING', chalk.black.bgYellow]
});

/**
 * Append an info message to the gulp output.
 */
export const info = logger({});

/**
 * Append an info message to the gulp output.
 */
export const debug = logger({
    style: chalk.dim
});
