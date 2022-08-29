const express = require('express')
const axios = require("axios");
const  nHtmlParser = require('node-html-parser')


var router = express.Router();










router.use(async (req, res, next) => {
if(req.originalUrl.includes("/get_avatar")){
    const response = await axios.get('https://tastedive.com/account/settings', {
    headers: {
        'authority': 'tastedive.com',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
        'cache-control': 'no-cache',
        'cookie': `${req.query.token}`,
        'pragma': 'no-cache',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
    }
})
    if(response.status == 200){
        const html = nHtmlParser.parse(response.data.toString())
        const avatarUrl =  html.querySelector(`div[class^="user"] > img[src]`).getAttribute("src")||"https://tastedive.com/dist/images/td-cover.jpg"
        const NickName =  html.querySelector('input[id="username"][name="username"]').getAttribute("value")
        res.data = {avatar_url:avatarUrl,nickname:NickName}
        }else{
               res.data = undefined
        }
    }

  next()

});




router.get('/get_avatar',   async function (req, res)  {

    if (res.data === undefined) {
        res.json({
            data: null
        })
    } else {

        return res.json(res.data)


    }


})


module.exports.GetAvatar = router;
