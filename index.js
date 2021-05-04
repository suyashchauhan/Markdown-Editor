const express = require('express')
const puppeteer = require('puppeteer')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
const parser = require('./parser')
const themes = require('./themes').themes
const themeValue = require('./themes').themeValue

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/node_modules/highlight.js/styles/'))
app.use(express.json())
app.use(bodyParser.text({ type: 'text/html' }))
const marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, language) {
        const hljs = require('highlight.js');
        const validLanguage = hljs.getLanguage(language) ? language : 'md';
        return hljs.highlight(code, { language: validLanguage }).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});


let output;
let theme = "";
theme = theme === "" ? './default.css' : theme;

app.get('/', (req, res) => {
    res.render('index', { themes: themes, themeValue: themeValue, theme: theme, output: output })
})

app.post('/md', (req, res) => {
    output = parser(req.body.data)
    theme = req.body.theme
    const style = fs.readFileSync('./node_modules/highlight.js/styles' + theme.substring(1))
    output += `<style>${style}</style>`;

    res.send(output)
})

app.post("/pdf", async (req, res, next) => {

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const webPage = await browser.newPage();
    const html = req.body
    await webPage.setContent(html)

    const pdf = await webPage.pdf({
        path: `public/page.pdf`,
        printBackground: true,
        format: "A4",
        margin: {
            top: "20px",
            bottom: "40px",
            left: "20px",
            right: "20px"
        }
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is running`))
