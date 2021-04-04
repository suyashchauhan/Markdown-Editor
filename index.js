const express = require('express')
const puppeteer = require('puppeteer')
const fs = require('fs')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/html',async(req,res)=>{
    res.render('template')
})
app.post('/html',async(req,res)=>{
console.log(req.body.html)
    res.render('template',{html:req.body.html})
})
app.post("/pdf", async (req, res) => {
    const url = req.query.target;
    const name = req.query.name;
console.log(req.body)
res.send('done download')
    // const browser = await puppeteer.launch({
    //     headless: true
    // });

    // const webPage = await browser.newPage();

    // await webPage.goto(url, {
    //     waitUntil: "networkidle0"
    // });
    
    // const pdf = await webPage.pdf({
    //     path:`${name}.pdf`,
    //     printBackground: true,
    //     format: "Letter",
    //     margin: {
    //         top: "20px",
    //         bottom: "40px",
    //         left: "20px",
    //         right: "20px"
    //     }
    // });

    // await browser.close();

    // res.contentType("application/pdf");
    // res.send(pdf);
})

app.listen(8000, () => console.log(`server is running`  ))
