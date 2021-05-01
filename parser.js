const marked = require('marked')
const emoji = require('node-emoji')

const parser = (markdown) => {
    const replacer = e => emoji.emojify(e.slice(1, -1))

    markdown = markdown.replace(/g:([^:]+):g/g, replacer)
    return marked(markdown);
}
module.exports = parser;
