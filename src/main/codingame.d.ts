
/**
 * codingame.com uses SpiderMonkey for its JavaScript engine, here is a list of available functions:
 * https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Shell_global_objects
 * Some of them don't work, like build(), and some are not useful like help() because it prints to stout, which the game uses as input
 */
/**
 * Reads a single line of input from stdin, returning it to the caller.
 * @returns {string}
 */
declare function readline(): string

/**
 * prints given arg to the output
 * @param {(string | number)} output
 */
declare function print(output: string | number): void

/**
 * prints debugging messages
 * @param {*} output
 */
declare function printErr(output: any): void

/**
 * when compiling with webpack set to true, otherwise false for testing
 */
declare const isRunAtCodingame: boolean

/**
 * Only in JS_THREADSAFE builds. Sleep for dt seconds. Fractions of a second are supported. Returns true on success, false if the sleep was interrupted.
 */
declare function sleep(dt:number):boolean

/**
 * Execution time elapsed for the current thread.
 */
declare function elapsed():number
/**
 * Return the current time with sub-ms precision.
 */
declare function dateNow():number

/**
 * Get/Set the limit in seconds for the execution time for the current context. A negative value (default) means that the execution time is unlimited. If a second argument is provided, it will be invoked when the timer elapses. Calling this function will replace any callback set by setInterruptCallback.
 */
declare function timeout(seconds:number, callback:() => any):any

//declare function build():any
//declare function help():any
