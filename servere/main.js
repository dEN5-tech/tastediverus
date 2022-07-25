const express = require('express')
const htmlToJson = require("html-to-json");
var cors = require('cors')
const axios = require("axios");
const JP = require('jsonpath') ;
const  nHtmlParser = require('node-html-parser')
const {Login} = require("./api/system/Login.js")
const {Like} = require("./api/system/Like.js")
const {GetData} = require("./api/GetData/GetData.js")
const {GetLoveData} = require("./api/GetData/GetLoveData.js")
const {GetSimData} = require("./api/GetData/GetSimData.js")
const {GetAutocomplete} = require("./api/GetData/GetAutocomplete.js")

const {YandexSearchImg} = require("./api/YandexSearch.js")




const delay = ms => new Promise(resolve => setTimeout(resolve, ms))





function getUseIdByToken(token){
    return token.match(/(!?tk_r\=(?<userId>.*)\|)/).groups.userId
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
    ).then(()=>{return response.data.data[0]})
    .catch(err=>{return {data: null}})
}


delay(5000)
const app = express();
const port =  3001


app.use(cors())



app.use('/', Login);
app.use('/', Like);

app.use('/', GetData);
app.use('/', GetLoveData);
app.use('/', GetSimData);
app.use('/', GetAutocomplete);

app.use('/', YandexSearchImg);




async function kinopoisk_query(query) {
    const response = axios.get('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword', {
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
    }).then(()=>{return response.data.films[0]})
    .catch(err=>{return {data: null}})

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



/*app.use(async (req, res, next) => {
    


  next()
})
*/



app.get('/AhoyAgregator', (req, res) => {
    let search = {
        'kinopoisk': req.query.kinopoisk,
        'resize': '1',
        'button_limit': '100',
        'button_size': '1',
        'separator': ','
    }
     axios.post(
         'https://ahoy.yohoho.cc/?cache081',
         new URLSearchParams(search),
         {
             headers: {
                 'authority': 'ahoy.yohoho.cc',
                 'accept': '*/*',
                 'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
                 'origin': 'https://4h0y.gitlab.io',
                 'referer': 'https://4h0y.gitlab.io/',
                 'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                 'sec-ch-ua-mobile': '?0',
                 'sec-ch-ua-platform': '"Windows"',
                 'sec-fetch-dest': 'empty',
                 'sec-fetch-mode': 'cors',
                 'sec-fetch-site': 'cross-site',
                 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36'
             }
         }
     ).then(r =>{
         res.json({data: r.data})
     }).catch(e=>{
         res.json({data: null})
     })


})




app.get('/search_kinopoisk', async (req, res) => {
const dt = await axios.post(
        'https://graphql.kinopoisk.ru/graphql/', {
            'operationName': 'SuggestSearch',
            'variables': {
                'keyword': `${req.query.query} ${req.query.year||""}`,
                'yandexCityId': 5,
                'limit': 1
            },
            'query': 'query SuggestSearch($keyword: String!, $yandexCityId: Int, $limit: Int) { suggest(keyword: $keyword) { top(yandexCityId: $yandexCityId, limit: $limit) { topResult { global { ...SuggestMovieItem ...SuggestPersonItem ...SuggestCinemaItem ...SuggestMovieListItem __typename } __typename } movies { movie { ...SuggestMovieItem __typename } __typename } persons { person { ...SuggestPersonItem __typename } __typename } cinemas { cinema { ...SuggestCinemaItem __typename } __typename } movieLists { movieList { ...SuggestMovieListItem __typename } __typename } __typename } __typename } } fragment SuggestMovieItem on Movie { id title { russian original __typename } rating { kinopoisk { isActive value __typename } __typename } poster { avatarsUrl fallbackUrl __typename } viewOption { buttonText isAvailableOnline: isWatchable(filter: {anyDevice: false, anyRegion: false}) purchasabilityStatus subscriptionPurchaseTag type availabilityAnnounce { groupPeriodType announcePromise availabilityDate type __typename } __typename } ... on Film { type productionYear __typename } ... on TvSeries { releaseYears { end start __typename } __typename } ... on TvShow { releaseYears { end start __typename } __typename } ... on MiniSeries { releaseYears { end start __typename } __typename } __typename } fragment SuggestPersonItem on Person { id name originalName birthDate poster { avatarsUrl fallbackUrl __typename } __typename } fragment SuggestCinemaItem on Cinema { id ctitle: title city { id name geoId __typename } __typename } fragment SuggestMovieListItem on MovieListMeta { id cover { avatarsUrl __typename } coverBackground { avatarsUrl __typename } name url description movies(limit: 0) { total __typename } __typename } '
        }, {
            params: {
                'operationName': 'SuggestSearch'
            },
            headers: {
                'authority': 'graphql.kinopoisk.ru',
                'accept': '*/*',
                'accept-language': 'ru,en;q=0.9',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                'cookie': 'yandexuid=1656658121627748886; yandex_login=twist.mas; mda_exp_enabled=1; i=gTlVadgMRXNT60jI0ekuxf9cw63dCD0HtgdeMuVR4OpZSi7GOvGYYmC4W6EGnfkEuH5rnq44sb2oRH91GilE46ukQCw=; ya_sess_id=3:1629316637.5.0.1628413571717:hi1tWQ:2a.1|888287499.-1.2.1:189654856|30:200744.287915.2bCVasFJwIM8uhErkxP3FYsCtH0; mda2_beacon=1629316637654; _yasc=M8tv0Ax3tFkhPdu1fY/2MSZfe7xCmsvebsXjnBZ5EqWnXg==; location=1; crookie=WiNL182ya+RL4l6PbkmgV720cnjxCgyWxExYSxbOIEjmMxcOAgFtK9Jf/U1GMbuYFnOaiYoLbkngruMydklZ9X6fC0c=; cmtchd=MTY1ODE2MjE2OTExNA==; sso_status=sso.passport.yandex.ru:blocked; PHPSESSID=b0d8d22371d5d5ed7f181f01f6bffe08; user_country=ru; yandex_gid=47; tc=5',
                'origin': 'https://www.kinopoisk.ru',
                'pragma': 'no-cache',
                'referer': 'https://www.kinopoisk.ru/',
                'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-site',
                'service-id': '25',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                'x-kp-searchexps': 'experiment3',
                'x-kp-testids': '604146,605606,614193,436979,573975,598964,606836,600434,606888',
                'x-request-id': '1658166051888870-5681630445875880107',
                'x-search-request-id': `${Date.now()}`
            }
        }
    )
    res.json(JP.query(dt.data.data,`$.*.*.topResult.global`).pop())

})




app.get('/AnimeVostSearch', (req, res) => {
    animevost_search(req.query.query)
        .then(function(data) {
            res.json(data)
        }, function(err) {
            res.json({data: null});
        });
})


app.get('/search_show_movie', (req, res) => {
        Promise.all(
            [animevost_search(req.query.query),
                myshows_query(req.query.query,1),
                kinopoisk_query(req.query.query)]
        ).then(function(data) {
            data[0] = {animevost:data[0]}
            data[1] = {myshows:data[1]}
            data[2] = {kinopoisk:data[2]}

            res.json({data: data})
        })

})



app.get('/search_music', (req, res) => {
        axios.post(
    'https://music.yandex.ru/handlers/suggest.jsx',
    new URLSearchParams({
        'text': req.query.query,
        'from': 'suggest',
        'lang': 'ru',
        'sign': '7aa8ebea45c34e57ed16038b873447805eb08625:1657953656316',
        'experiments': '{"ABTestIds":"","WebDontPayPopup":"promocode-fullscreen","WebGenerativeTab":"default","WebInteractiveSplashscreenWithTrackTimeLimit":"30sec","WebNewImport":"on","WebTVMusicYnison":"default","WebTouchReact2021":"on","WebYMConnect":"default","adv":"newMinimalBlock","barBelowExperiment":"default","boostConfigExperiment62b17ef2b96e38262e0a69a3":"default","boostConfigExperiment62b181379f048212d1693f3e":"default","boostConfigExperiment62b186a4b96e38262e0a69c2":"on","boostConfigExperiment62b1ad969f048212d16942dd":"default","boostConfigExperiment62c2e06013e44c7382e0fac9":"on","boostConfigExperiment62d0790a01632b329f00d41d":"on","boostConfigExperiment62d12246d72869181def93d2":"default","boostConfigExperiment62d129a07ee63376cf113243":"default","hideChildContentFromRecently":"on","iframeNewReact":"default","miniBrick":"advFixed","musicCrackdownTiming":"default","musicMobileWebLocked":"play","musicPrice":"default","musicSearchRanking":"default","playlistBoostExperiment607289c805a7dd7ae28a8b04":"default","playlistBoostExperiment607289d405a7dd7ae28a8b07":"default","playlistBoostExperiment62b52e604607ba1e1cbf3747":"default","playlistBoostExperiment62bfdb364c0095096ad69fe9":"on","playlistBoostExperiment62d073e61e45067a39fd9ec9":"on","playlistBoostExperiment62d073f21e45067a39fd9ecb":"on","playlistBoostExperiment62d074031e45067a39fd9ecd":"on","playlistBoostExperiment62d074131e45067a39fd9ecf":"on","playlistBoostExperiment62d074201e45067a39fd9ed1":"on","playlistBoostExperiment62d074321e45067a39fd9ed3":"on","playlistBoostExperiment62d102d901632b329f00d54e":"default","playlistBoostExperiment62d102e901632b329f00d550":"default","playlistBoostExperiment62d12234d72869181def93d0":"default","playlistBoostExperiment62d1284e01632b329f00d5c1":"default","plusWeb":"on","useHlsTracks":"default","webAntiMusicBlockNaGlavnoi":"on","webBannerRefrash":"on-3600","webBarBelowRubilnik":"default","webChromeCast":"default","webSidebarBanner":"default","webStationsHeadLink":"default"}',
        'external-domain': 'music.yandex.ru',
        'overembed': 'false'
    }),
    {
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': 'ys=vbch.2-35-0; yandexuid=3126363181657953656; _yasc=/fS1M/4rD3wpzTc1IQrF27ZC9mqn79u59oOMJiDn2KKBbA==; i=9ZwUWah4W6hwxmjacjl2RsH565EqXy1TLxKb0yJF9Qu+gr/BczoHY3mLR9MHAAr6+XUt2BgZQmBgAznpfGnrskCGKBI=; device_id=b6322782f8d2548d14d1c0ae17d73548fa39fb145; active-browser-timestamp=1657953659521',
            'Origin': 'https://music.yandex.ru',
            'Referer': 'https://music.yandex.ru/home',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'X-Retpath-Y': 'https://music.yandex.ru/home',
            'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"'
        }
    }
).then((e)=>{
            console.log(e)
            res.json({data: e.data})
        }).catch(()=>{
            res.json({data: null})
        })

})


app.listen(port,"localhost", () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



