const express = require('express')
const axios = require("axios");
const {GetParsedInfo} = require("../utils/utils.js")


function getUseIdByToken(token){
    return token.match(/(!?tk_r\=(?<userId>.*)\|)/).groups.userId
}


var router = express.Router();

// middleware that is specific to this router
router.use(async (req, res, next) => {
if(req.originalUrl.includes("/get_love_data")){

        const r =  await axios.get(`https://tastedive.com/profile/`+
            `resources/${getUseIdByToken(req.query.token)}/`+
            `1/${req.query.type}/added/${req.query.offset || "0"}/${req.query.count || "12"}`, {
            headers: {
                'authority': 'tastedive.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
                'cookie': `${req.query.token}`,
                'pragma': 'no-cache',
                'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
            }
        })
        if (r.data == undefined) {
            res.data = {
                data: null
            }
        } else {
            res.data = r.data.toString()


        }
    }

  next()

});


router.get('/get_love_data',   async function (req, res)  {

    if (res.data === {
        data: null
    }) {
        res.json({
            data: null
        })
    } else {
        return res.json(await GetParsedInfo(res.data))


    }


})


module.exports.GetLoveData = router;
