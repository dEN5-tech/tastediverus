const express = require('express')
const axios = require("axios");
const nHtmlParser = require('node-html-parser')


var router = express.Router();










router.use(async (req, res, next) =>
{
    if (req.originalUrl.includes("/get_recommended_users"))
    {
        const response = await axios.get(`https://tastedive.com/fragment/recommended-users/start-${req.query.offset || "0"}/rpp-${req.query.count || "12"}`,
        {
            headers:
            {
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
        if (response.status == 200)
        {
            const html = nHtmlParser.parse(response.data.toString())
            let dt = []
            const elems = html.querySelectorAll('div[role="listitem"]')
            for (let i in elems)
            {
                const elem = elems[i]
                let obj = {
                    username: elem.querySelector('div.user-names > span.user-name').innerText,
                    user_id: elem.querySelector('span[class="user-username"]').innerText,
                    all_tp: elem.querySelector('span[class="user-card-tastepoints"]').innerText,
                    match_tp: elem.querySelector('span[class="user-lic-count"]').innerText

                }
                if(elem.querySelector('div[class^="user-image"]').attributes.class.includes("letter")){
                    obj["poster"] ="https://tastedive.com/dist/images/td-cover.jpg"
                }else{
                    obj["poster"] =elem.querySelector('div[class^="user-image"]').querySelector('img').getAttribute("src")
                }
                dt.push(obj)
            }
            res.data = dt
        }
        else
        {
            res.data = undefined
        }
    }

    next()

});




router.get('/get_recommended_users', async function(req, res)
{

    if (res.data === undefined)
    {
        res.json(
        {
            data: null
        })
    }
    else
    {

        return res.json(res.data)


    }


})


module.exports.GetRecUsersData = router;