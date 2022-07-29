var {Router} = require('express');
const puppeteer = require('puppeteer');

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
    const userAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36';
    await page.setUserAgent(userAgent);
}

async function puper_(mail, pass) {

    const browser = await puppeteer.launch(chromeOptions);;
    const page = await browser.newPage();
    await preparePageForTests(page);

    await page.goto('https://tastedive.com/account/signin?next=https%3A%2F%2Ftastedive.com%2F&trigger=TopBar', {waitUntil: 'load'});


    try{
        await page.evaluate((a, b) => {
            document.querySelector('#email').value = a;
            document.querySelector('#password').value = b;
            document.querySelector('button[class="button button-primary"]').click();
        }, mail, pass);

        const waitsel = await page.waitForSelector('ul[class="alert-list"] >  li[class="alert-message"]', {
            visible: true,
            timeout: 8000
        });
        let all_cookies = ""
        const cookies = await page.cookies()
        cookies.forEach((e)=>all_cookies+=`${e.name}=${e.value}; `)
        await browser.close();
        return all_cookies
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