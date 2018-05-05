'use strict';

const PROCESS_CMD_LINE_ARGS_LENGTH = 2;
const FLAG_REGEX_PATTERN = /^-{1,2}/;

/**
 * Returns an object containing the path and flags parsed from process.argv
 *
 *     console.log(parseCmdArgs());
 *     console.log(parseCmdArgs(process.argv.slice(2)));
 *
 *     console.log(parseCmdArgs(['--version']));
 *     console.log(parseCmdArgs(['-s', 'Test email']));
 *     console.log(parseCmdArgs(['./src/', '-s', 'Test email']));
 *
 *     console.log(parseCmdArgs(null, {'requireUserInput': true}));
 *     console.log(parseCmdArgs(null, {'allowMultipleInputs': true}));
 *
 * @param {Array} [args] Arguments to parse through.
 * @param {Object} [options] Options object.
 * @param {Object} [options.requireUserInput] Require user defined input through process.argv removing default of current directory.
 * @param {Object} [options.allowMultipleInputs] Allow for multiple user defined inputs. Causes parseCmdArgs to return an array of inputs.
 * @return {Object} Object with keys for both the input and flags parsed out of arguments array.
 * @public
 */

const parseCmdArgs = (args, options) => {

    const inputs = [];

    if (!options) {

        options = {};

    }

    const flags = {};

    let key = null;
    let value = null;

    if (!args) {

        args = process.argv.slice(PROCESS_CMD_LINE_ARGS_LENGTH);

    }

    while (args.length) {

        if (!args[0].match(FLAG_REGEX_PATTERN)) {

            inputs.push(args.shift());

        } else if (args[0].match(FLAG_REGEX_PATTERN)) {

            key = args.shift();

            if (args.length && !args[0].match(FLAG_REGEX_PATTERN)) {

                value = args.shift();

            } else {

                value = true;

            }

            flags[key] = value;

        }

    }

    if (!inputs.length && !options.requireUserInput) {

        inputs.push(process.cwd());

    }

    if (options.allowMultipleInputs) {

        return {
            flags,
            inputs
        };

    }

    return {
        flags,
        'input': inputs[0]
    };

};

module.exports = parseCmdArgs;
