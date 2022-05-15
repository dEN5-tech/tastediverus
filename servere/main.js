const express = require('express')
const get_show = require("./api/api");
const htmlToJson = require("html-to-json");
var cors = require('cors')
const LikeByIdApi = require("./api/api");
const get_token = require("./api/api");
const axios = require("axios");
const SmarthardSearch = require("./api/api");
var SpotifyWebApi = require('spotify-web-api-node');
const getArtistSpotify = require("./api/api");
var kinopoisk = require('kinopoisk-ru');
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



const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

var spotifyApi = new SpotifyWebApi()



const preparePageForTests = async (page) => {

// Pass the User-Agent Test.
    const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
}


async function puper_(mail, pass) {

    const browser = await puppeteer.launch(chromeOptions);;
    const page = await browser.newPage();
    await preparePageForTests(page);

    await page.goto('https://tastedive.com/account/signin?next=https%3A%2F%2Ftastedive.com%2F&trigger=TopBar', {waitUntil: 'load'});



    await page.evaluate((a, b) => {
        document.querySelector('#email').value = a;
        document.querySelector('#password').value = b;
        document.querySelector('button[class="button button-primary"]').click();
    }, mail, pass);
    await page.waitForSelector('body > main > article > div.title-toggle-wrap > hgroup > h2', {
        visible: true,
    });
    var cookie = await page.evaluate(function() {
        return document.cookie;
    });

    await browser.close();
    return cookie
}











async function animevost_search(q){
    const response = await axios.post(
        'https://api.animevost.org/v1/search',
        new URLSearchParams({
            'name': q
        }),
        {
            headers: {
                'authority': 'api.animevost.org',
                'accept': '*/*',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
                'origin': 'https://reansn0w.github.io',
                'referer': 'https://reansn0w.github.io/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
            }
        }
    ).catch(err=>{data: null})

    return response?.data?.data[0]
}


delay(5000)
const app = express()
const port =  3001


app.use(cors())


async function kinopoisk_query(query) {
    const response = await axios.get('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword', {
        params: {
            'keyword': query,
            'page': '1'
        },
        headers: {
            'authority': 'kinopoiskapiunofficial.tech',
            'accept': 'application/json',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'referer': 'https://kinopoiskapiunofficial.tech/documentation/api/',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
            'x-api-key': '1a98a0b3-5b44-4174-87fe-9fc1cc15eff8'
        }
    }).catch(err=>{data: null})
    return response.data.films[0]
}


async function myshows_query(query, id) {
    const dt = await axios.post(
        'https://myshows.me/v3/rpc/',
        {
            'jsonrpc': '2.0',
            'id': parseInt(id),
            'method': 'shows.Search',
            'params': {
                'query': query
            }
        },
        {
            responseType: 'json',
            headers: {
                'authority': 'myshows.me',
                'accept': 'application/json',
                'accept-language': 'ru',
                'content-type': 'application/json',
                'cookie': 'myshowsLocale=ru; msid=X9WZImJj/PQamUlTEsLfAg==',
                'origin': 'https://myshows.me',
                'platform': 'web',
                'referer': 'https://myshows.me/view/44455/',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
            }
        }
    ).catch(err=>{data: null})
    return dt.data.result[0]
}




app.get('/get_data', async (req, res) => {
    let type_data = req.query.type == "1" ?  "recommended" : `recommended/qt-${req.query.type}`

    axios.get(`https://tastedive.com/fragment/${type_data||"recommended"}/start-${req.query.offset||"0"}/rpp-${req.query.count||"12"}`, {
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
    }).then(r => {
        if (r.data == undefined){
            res.json({data: null})
        }else{
            var promise = htmlToJson.parse(r.data.toString(), function () {
                let num =  1
                return this.map('div[class*="entity entity-card grid-item js-entity"]', function ($item) {

                    var dtn = {
                        title:$item.find('span.entity-title').text(),
                        srcset: $item.find('div.entity-image-wrap > img').attr("srcset"),
                        id: $item.find('div.entity-card-content > a').attr("id"),
                        likes: $item.find('div.entity-opine > button.opine.like.js-opine-ex > span.count').text(),
                        rating: $item.find('div.entity-titles > span.entity-subtitle > span.score').text(),
                        year: $item.attr("data-disambiguation"),
/*
                        type: $item.find("div.entity-titles > span.entity-subtitle").children[0].text(),
*/


                    };

                    num++
                    return dtn

                });
            }).done(function (items) {

                        res.json({data: items})

            }, function (err) {
                res.json({data: null})
            });
        }

    }
    )
})



app.get('/login', (req, res) => {
    /*req.query.email, req.query.password*/
    puper_(req.query.email, req.query.password).then((data)=>{
                    res.json({cookie:data})
                }).catch(e=>e)

})

app.get('/like', (req, res) => {
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

}).then(e=>res.json((e.data)))
})


app.get('/getArtistSpotify', (req, res) => {
    spotifyApi.searchArtists(req.query.query)
        .then(function(data) {
            res.json({url:data.body.artists.items[0].external_urls.spotify})
        }, function(err) {
            res.json(err);
        });
})


app.get('/AnimeVostSearch', (req, res) => {
    animevost_search(req.query.query)
        .then(function(data) {
            res.json(data)
        }, function(err) {
            res.json({data: null});
        });
})


app.get('/SearchAll', (req, res) => {
    if(req.query.type=="h"||req.query.type=="m"){
        Promise.all(
            [animevost_search(req.query.query),
                myshows_query(req.query.query,1),
                kinopoisk_query(req.query.query)]
        ).then(function(data) {
            data[0] = {animevost:data[0]}
            data[1] = {myshows:data[1]}
            data[2] = {kinopoisk:data[2]}

            res.json({data: data})
        }, function(err) {
            res.json({data: null});
        });
    }

})



app.get('/spotCode', (req, res) => {
    spotifyApi.authorizationCodeGrant(req.query.code).then(
        function(data) {
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
        },
        function(err) {
            console.log('Something went wrong!', err);
        }
    );
})


app.listen(port,"localhost", () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



