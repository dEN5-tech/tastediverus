const axios = require('axios')
const htmlToJson = require("html-to-json");
const fs = require('fs')









async function LikeByIdApi(id,year,title,type){
        console.log(id,year,title,type)
}




async function getArtistSpotify(query){
    const response = await axios.get('/getArtistSpotify', {
        params: {
            'query': query
        },
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'If-None-Match': 'W/"40-PyBohQCG/YUKApco6gQ4JRi+AM8"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }
    });
    return response.data
}



async function get_token() {
    await axios.get('https://tastedive.com/account/signin', {
        headers: {
            'authority': 'tastedive.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'cache-control': 'max-age=0',
            'referer': 'https://tastedive.com/',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
        }
    }).then((data)=>{
        htmlToJson.parse(data.data, ["input[name='_csrf_token']", function ($item) {
            return $item.attr("value");
        }]).done(function (items) {
            return {_csrf_token:items}
        })
    })
}







async function get_show(offset,page) {
    const response = await axios.get('https://tastedive.com/fragment/recommended/qt-h/start-0/rpp-12', {
        headers: {
            'authority': 'tastedive.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'cache-control': 'max-age=0',
            'cookie': 'tk_r=427469|6ffbefef8ca908a7d478723a0aa7f9aa27d2656d22b196dc074a18a62aaae0bc022a183831ce947a6f29431f05def2436af715033edb143794765d807b9ac75f; tk_s=.eJxdkDFrwzAQhf9K0dIlg2RLJ1_GLu0WMC20kzidJCriWmDZARPy36vQDqXjvffx-LircFyX5NZyjrM4io-n1-f3l1MHozgIl5ZYP8VxXbbYrhwa4AlIaghaU9cZTqwGNIyUUCJahN6qAD5Z6oz34L32Jili1FKboUPZcKWZBqljL9kj6B4kAnqWwYM10RJYxYxs1WBkBJ1ASjvYoZeBVWpaU2Fac2m6V8F53d1MX_HuTkupE12mxnDZ5nXZHZdwr8a3P9kvPm61Zmp53XzIl1zbpFP_x-qZdno4-Ynq-ihuB7HVuPy8QndWA4rbNzVMY8g.FUV-0g.e1hqlxGKlWY4xgw15K-u1p7ZEBI',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
        }
    });
    return response.data.toString()
}


module.exports = get_show
module.exports = LikeByIdApi
module.exports = get_token
module.exports = getArtistSpotify






