const express = require('express')
const axios = require("axios");


var router = express.Router();


router.get('/like', (req, res) => {
    const response =  axios.get(
        `https://tastedive.com/profile/add/1/${req.query.id}?qid=&t=${req.query.type}&n=${req.query.title}&d=${req.query.year}&ajax=1`
        , {
        headers: {
            'authority': 'tastedive.com',
            'accept': '*/*',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'content-type': 'application/json',
            'cookie': `${req.query.token}`,
            'referer': 'https://tastedive.com/shows',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
        }

}).then(e=>res.json((e.data))).catch(()=>{
        res.json({data: null})
    })
})



module.exports.Like = router;
