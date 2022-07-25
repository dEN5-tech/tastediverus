const express = require('express')
const axios = require("axios");
const {getQueryKino} = require("../utils/utils.js")





var router = express.Router();


router.use(async (req, res, next) => {
if(req.originalUrl.includes("/get_autocomplete")){

        const r =   await axios.get('https://tastedive.com/api/autocomplete', {
            params: {
                'v': '2',
                't': req.query.type,
                'q': req.query.query
            },
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
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
            }
        })
        if (r.data.suggestions.pop() == undefined) {
            res.data = {
                data: null
            }
        } else {
            res.data = r.data.suggestions


        }
    }

  next()

});


router.get('/get_autocomplete',   async function (req, res)  {

    if (res.data === undefined) {
        res.json({
            data: null
        })
    } else {
        let dt = []
        for( let i in res.data){
            const {title,disambiguation} = res.data[i]
            const datakino = await getQueryKino({title,year:disambiguation})
            dt.push({...res.data[i],
                    title:datakino?.title?.russian||res.data[i].title,
                    kinopoisk_id: datakino?.id||null,
                rating:datakino?.rating?.kinopoisk?.value||null}

                )
        }
        return res.json(dt)


    }


})



module.exports.GetAutocomplete = router;
