import * as util from 'gulp-util';
import * as chalk from 'chalk';

/**
 * Message styler (usually a chalk function).
 */
export type MessageStyle = (x: string) => string;

/**
 * A chunk of text forming part of an overall log message.
 */
export type MessageChunk = [string, MessageStyle];

/**
 * Render a collection of message chunks into a single, printable string.
 */
const render = (...c: MessageChunk[]) => c.map(([msg, style]) => style(msg))
                                          .filter((x) => x.length)
                                          .join(' ');
/**
 * Default styling function if not specified.
 */
const defaultStyle = (x: string) => x;

/**
 * Transform a chunk that may be a standalone stream into a MessageChunk.
 */
const createChunk: ((x: string | MessageChunk) => MessageChunk) = (x) =>
        typeof x === 'string' ? [x, defaultStyle] : x;

export interface LoggerOptions {
    /**
     * Optional prefix to prepend to all outgoing messages.
     */
    prefix?: MessageChunk | string;

    /**
     * Style to be applied to the log message itself. If ommitted the defualt
     * console style will be applied.
     */
    style?: MessageStyle;

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
    const chunks = [
        opts.prefix || '',
        [message, opts.style || defaultStyle]
    ].map(createChunk);

    (opts.writer || util.log)(render(...chunks));
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
