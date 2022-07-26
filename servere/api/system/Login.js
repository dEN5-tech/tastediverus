var {Router} = require('express');
const {launch} = require('puppeteer');

const chromeOptions = {
    headless: true,
    defaultViewport: null,
    args: [
        "--incognito",
        "--no-sandbox",
        "--single-process",
        "--no-zygote"
    ],
};

const preparePageForTests = async (page) => {

// Pass the User-Agent Test.
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
}

async function puper_(mail, pass) {

    const browser = await launch(chromeOptions);;
    const page = await browser.newPage();
    await preparePageForTests(page);

    await page.goto('https://tastedive.com/account/signin?next=https%3A%2F%2Ftastedive.com%2F&trigger=TopBar', {waitUntil: 'load'});


    try{
        await page.evaluate((a, b) => {
            document.querySelector('#email').value = a;
            document.querySelector('#password').value = b;
            document.querySelector('button[class="button button-primary"]').click();
        }, mail, pass);
        await page.waitForSelector('body > main > article > div.title-toggle-wrap > hgroup > h2', {
            visible: true,
            timeout: 1500
        });
        var cookie = await page.evaluate(function() {
            return document.cookie;
        });

        await browser.close();
        return cookie
    }catch (e) {
        console.log(e)
        await browser.close();
        return false
    }finally {
      await browser.close();
    }


}






var router = Router();

router.get('/login', (req, res) => {
    /*req.query.email, req.query.password*/
    puper_(req.query.email, req.query.password).then((data)=>{
                    res.json(data ? {cookie:data} :{error:"Not valid data"})
                })

})

module.exports.Login = router;