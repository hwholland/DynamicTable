const Handlebars = require('handlebars');

const hljs = require('highlight.js');
const markdown = require('markdown-it')({
    highlight (code) {

        return hljs.highlight('javascript', code).value;

    },
    'html': true,
    'linkify': true
});

Handlebars.registerHelper('ifCond', (a, b, options) => {

    if (a === b) {

        return options.fn(this);

    }

    return options.inverse(this);

});

Handlebars.registerHelper('highlightBlock', block => {

    if (block) {

        return hljs.highlight('javascript', block).value;

    }

    return null;

});

Handlebars.registerHelper('markdown', block => {

    if (block) {

        return markdown.render(block);

    }

    return null;

});
