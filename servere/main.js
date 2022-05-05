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


var spotifyApi = new SpotifyWebApi()




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


const app = express()
const port = 3001


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


app.get('/api/get_data', async (req, res) => {
    let type_data = req.query.type == "1" ?  "recommended" : `recommended/qt-${req.query.type}`

    axios.get(`https://tastedive.com/fragment/${type_data||"recommended"}/start-${req.query.offset||"0"}/rpp-${req.query.count||"12"}`, {
        headers: {
            'authority': 'tastedive.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'cache-control': 'max-age=0',
            'cookie': `${req.query.token}`,
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



app.get('/api/login', (req, res) => {
    /*req.query.email, req.query.password*/
    axios.get('https://tastedive.com/account/signin', {
        params: {
            'next': 'https://tastedive.com/',
            'trigger': 'TopBar'
        },
        withCredentials: true,
        headers: {
            'authority': 'tastedive.com',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'referer': 'https://tastedive.com/',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36'
        }
    }).then((e)=>{
        axios.get('https://tastedive.com/account/signin', {
            headers: {
                'authority': 'tastedive.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
                'cache-control': 'max-age=0',
                'cookie': `${e.headers["set-cookie"].toString().split(";")[0]}`,
                'origin': 'https://tastedive.com',
                'referer': 'https://tastedive.com/account/signin?next=https%3A%2F%2Ftastedive.com%2F&trigger=TopBar',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36'
            }
        }).then((data)=>{
            htmlToJson.parse(data.data, ["input[name='_csrf_token']", function ($item) {
                return $item.attr("value");
            }]).done(r => {
                axios.post(
                    'https://tastedive.com/complete/email/',
                    new URLSearchParams({
                        'form_type': 'signin',
                        'next': 'https://tastedive.com/',
                        '_csrf_token': r,
                        'form_js': "ihasjs",
                        'email': req.query.email,
                        'password': req.query.password
                    }),
                    {
                        headers: {
                            'authority': 'tastedive.com',
                            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                            'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
                            'cache-control': 'max-age=0',
                            'cookie': `${e.headers["set-cookie"].toString().split(";")[0]}`,
                            'origin': 'https://tastedive.com',
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
                    }
                ).then((data)=>{

                    res.json({cookie:data.headers["set-cookie"].toString().split(";")[0]})
                }).catch(e=>e)
            })
        })

    })


})

app.get('/api/like', (req, res) => {
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


app.get('/api/getArtistSpotify', (req, res) => {
    spotifyApi.searchArtists(req.query.query)
        .then(function(data) {
            res.json({url:data.body.artists.items[0].external_urls.spotify})
        }, function(err) {
            res.json(err);
        });
})


app.get('/api/AnimeVostSearch', (req, res) => {
    animevost_search(req.query.query)
        .then(function(data) {
            res.json(data)
        }, function(err) {
            res.json({data: null});
        });
})


app.get('/api/SearchAll', (req, res) => {
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


app.get('/api/spotCode', (req, res) => {
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



