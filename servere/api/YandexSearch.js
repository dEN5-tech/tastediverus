const express = require('express')
const axios = require("axios");


var router = express.Router();


router.get('/YandexSearch', (req, res) => {
    const url = 'https://yandex.ru/images/search?' + new URLSearchParams({
        'from': 'tabbar',
        'rpt': 'imageview',
        'url': req.query.url||"https://placekitten.com/g/800/800",
        'cbir_page': 'similar',
        'callback': 'JSON.parse',
        'format': 'json',
        'p': `${req.query.page||'1'}`,
        "text": `${req.query.query||''}`,
        'request': JSON.stringify({
            "blocks": [
                {
                    "block": "serp-list_infinite_yes",
                    "params":
                        {
                            "initialPageNum": 0
                        },
                    "version": 2
                }]
        }),
        'yu': '4223410411658725149',
        'uinfo': 'sw-1280-sh-1024-ww-772-wh-913-pd-1-wp-5x4_1280x1024',
    })
    const r = await axios.get(url, {
        headers: {
        'authority': 'yandex.ru',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'ru-RU,ru;q=0.9',
        'cache-control': 'no-cache',
        'cookie': 'is_gdpr=1; is_gdpr_b=CLryEBCngAEYAQ==; ys=mclid.2256434-306; mda=0; yandex_gid=10502; yandexuid=4223410411658725149; yuidss=4223410411658725149; my=YwA=; i=3clKytzmZrOpGEyX5JSmqM0YeTqhdfBigZO6qDl4KfCud5nhMDcE4k7fECrc8yueF6XEXQjL279+AyonK+831gzuOuw=; KIykI=1; computer=1; yp=1661317150.ygu.1#1658984353.clh.2256434-306#1674493155.szm.1:1366x768:1366x657#1661403560.csc.1; _yasc=tQGpzl56eTpKx9FVYBEpOar5MS63UV//jOHI/rHEaT/x4AgMkQhjgt7c9fDIY8Gk',
        'device-memory': '4',
        'downlink': '2.05',
        'dpr': '1',
        'ect': '4g',
        'pragma': 'no-cache',
        'rtt': '100',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'viewport-width': '1366'
    }

    })
    const html = r.data.blocks[0].html
    const HtmlObj = nHtmlParser.parse(html)
    /*console.log(HtmlObj.toString())*/
    /*fs.writeFile('base.html', HtmlObj.toString(), 'ascii', ()=>console.log("save"))*/
    const dt = []
    const serpItems = HtmlObj.querySelectorAll('div[data-bem]')
    for(let i in serpItems){
        dt.push(JSON.parse(serpItems[i].getAttribute('data-bem'))["serp-item"])
    }

    res.json({dt})
})



module.exports.YandexSearchImg = router;
