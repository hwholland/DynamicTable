const dox = require('dox');

/**
 * Format string as name.
 *
 * @example formatStringForName('module.exports.parser');
 * @param {String} contents String to format.
 * @return {String} Formatted string.
 * @private
 */

const formatStringForName = content =>
    content.toString()
        .replace(/module\.exports\.|\.prototype|\(\)/g, '');

/**
 * Format string as param.
 *
 * @example formatStringForParam('[optional param]');
 * @param {String} contents String to format.
 * @return {String} Formatted string.
 * @private
 */

const formatStringForParam = content =>
    content.toString()
        .replace(/\[|\]/g, '');

/**
 * Format string as UID.
 *
 * @example formatStringForUID('example string');
 * @param {String} contents String to format.
 * @return {String} Formatted string.
 * @private
 */

const formatStringForUID = content =>
    content.toString()
        .toLowerCase()
        .replace(/[^\w\.]+/g, '-')
        .replace(/^-|-$/g, '');

/**
 * Dox parser for doxdox.
 *
 * @example parser(content, 'index.js').then(methods => console.log(methods));
 * @param {String} content Contents of file.
 * @param {String} filename Name of file. Used to generate UIDs.
 * @return {Promise} Promise with methods parsed from contents.
 * @public
 */

const parser = (content, filename) =>
    dox.parseComments(content, {
        'raw': true,
        'skipSingleStar': true
    }).filter(method => !method.ignore && method.ctx)
        .map(method => ({
            'uid': formatStringForUID(`${filename}-${method.ctx.string}`),
            'isPrivate': method.isPrivate,
            'type': method.ctx.type,
            'name': formatStringForName(method.ctx.string),
            'description': method.description.full,
            'empty': !method.description.full && !method.tags.length,
            'params': method.tags.filter(tag =>
                tag.type === 'param' && !tag.name.match(/\./))
                .map(tag => {

                    if (tag.optional) {

                        return `[${formatStringForParam(tag.name)}]`;

                    }

                    return formatStringForParam(tag.name);

                })
                .join(', ')
                .replace(/\], \[/g, ', ')
                .replace(', [', '[, '),
            'tags': {
                'example': method.tags.filter(tag => tag.type === 'example')
                    .map(tag => tag.string),
                'param': method.tags.filter(tag => tag.type === 'param')
                    .map(tag => ({
                        'name': formatStringForParam(tag.name),
                        'isOptional': tag.optional,
                        'types': tag.types,
                        'description': tag.description
                    })),
                'property': method.tags.filter(tag => tag.type === 'property')
                    .map(tag => ({
                        'name': tag.name,
                        'types': tag.types,
                        'description': tag.description
                    })),
                'return': method.tags.filter(tag =>
                    tag.type === 'return' || tag.type === 'returns')
                    .map(tag => ({
                        'types': tag.types,
                        'description': tag.description
                    }))
            }
        }))
        .filter(method => !method.empty);

module.exports = parser;
