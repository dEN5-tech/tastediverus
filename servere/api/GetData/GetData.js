const express = require('express')
const axios = require("axios");
const {getQueryKino,GetParsedInfo} = require("../utils.js")



var router = express.Router();

// middleware that is specific to this router
router.use(async (req, res, next) => {
if(req.originalUrl.includes("/get_data")){
            let type_data = req.query.type == "1" ? "recommended" : `recommended/qt-${req.query.type}`
    const r =  await axios.get(`https://tastedive.com/fragment/${type_data || "recommended"}/start-${req.query.offset || "0"}/rpp-${req.query.count || "12"}`, {
    headers: {
        'authority': 'tastedive.com',
        'accept': '*/*',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
        'content-type': 'application/json',
        'cookie': `${req.query.token}`,
        'referer': 'https://tastedive.com/',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36'
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


router.get('/get_data',   async function (req, res)  {

    if (res.data === undefined) {
        res.json({
            data: null
        })
    } else {
        return res.json(await GetParsedInfo(res.data,false))


    }


})


module.exports.GetData = router;
