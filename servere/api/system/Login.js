var {Router} = require('express');
const axios = require("axios");
const  nHtmlParser = require('node-html-parser')




async function GetCookies(query){
    const instance = axios.create({
      baseURL: 'https://tastedive.com',
      withCredentials: true
    });

    const response = await instance.get('/account/signin', {
    params: {
        'next': 'https://tastedive.com/',
        'trigger': 'TopBar'
    },
    headers: {
        'authority': 'tastedive.com',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
        'referer': 'https://tastedive.com/',
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
    const html = nHtmlParser.parse(response.data)
    const form = html.querySelector("input[type=hidden]:nth-child(3)").getAttribute("value")
    const response2 = await instance.post(
    'https://tastedive.com/complete/email/',
    new URLSearchParams({
        'form_type': 'signin',
        'next': 'https://tastedive.com/',
        '_csrf_token': form,
        'form_js': 'ihasjs',
        'email': query.email,
        'password': query.password
    }),
    {
        headers: {
            'authority': 'tastedive.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'cache-control': 'max-age=0',
            "cookie":response.headers['set-cookie'],
            'origin': 'https://tastedive.com',
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
        },
            maxRedirects: 0,
            validateStatus: function(status)
            {
                return status >= 200 && status < 303;
            },
        })
    if(!response2.data.includes("ef=password")){
return response2.headers['set-cookie'].join("; ")
    }else{
        return null
    }
    
}


var router = Router();

router.get('/login', async (req, res) => {
    /*req.query.email, req.query.password*/
    GetCookies(req.query).then((dt)=>{
        res.json({cookie:dt})
    })
    

})

module.exports.Login = router;