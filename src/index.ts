import * as util from 'gulp-util';
import * as chalk from 'chalk';

/**
 * An chunk of text forming part of an overall log message.
 */
export type MessageChunk = [string, chalk.ChalkChain] | string;

/**
 * Render a message chunk out to a printable string.
 */
const render = (c: MessageChunk) => typeof c === 'string' ? c : c[1](c[0]);

/**
 * Flatten a collection of message chunks into a single, printable string.
 */
const flatten = (...c: MessageChunk[]) => c.map(render)
                                           .filter((x) => x.length)
                                           .join(' ');

export interface LoggerOptions {
    /**
     * Optional prefix to prepend to all outgoing messages.
     */
    prefix?: MessageChunk;

    /**
     * Style to be applied to the log message itself. If ommitted the defualt
     * console style will be applied.
     */
    style?: chalk.ChalkChain;

    /**
     * The log writer that handles output of the rendered message. This can
     * mostly be ignored unless you'd like to redirect output to somewhere
     * other than the stadard gulp output.
     */
    writer?: (message: string) => void;
}

/**
 * Create a styled, prefixed logger.
 */
export const logger = (opts: LoggerOptions) => (message: string) => {
    const msg = opts.style ? [message, opts.style] as MessageChunk : message;
    const pre = opts.prefix || '';
    const log = opts.writer || util.log;
    log(flatten(pre, msg));
};

/**
 * Emit an error message.
 */
export const error = logger({
    prefix: ['ERROR', chalk.white.bgRed]
});

/**
 * Emit a warning message.
 */
export const warn = logger({
    prefix: ['WARNING', chalk.black.bgYellow]
});

/**
 * Emit an info message.
 */
export const info = logger({});

/**
 * Emit a debug message.
 */
export const debug = logger({
    prefix: '→',
    style: chalk.dim
});
