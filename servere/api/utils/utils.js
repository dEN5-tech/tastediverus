const axios = require("axios");
const  nHtmlParser = require('node-html-parser')
const JP = require('jsonpath') ;





async function getQueryKino(elem){
    const dt = await axios.post(
        'https://graphql.kinopoisk.ru/graphql/', {
            'operationName': 'SuggestSearch',
            'variables': {
                'keyword': `${elem.title} ${elem.year}`,
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
    return JP.query(dt.data.data,`$.*.*.topResult.global`).pop()
}

async function GetParsedInfo(resp){
    let dt = []
    const html = nHtmlParser.parse(resp)
    const cards = html.querySelectorAll('div[class*="entity entity-card grid-item js-entity"]')
    /*cards.forEach((e)=>console.log(e.rawAttrs))*/

    for(let elem in cards){
        const title = cards[elem].querySelector('span.entity-title').text
        const year = cards[elem].getAttribute("data-disambiguation")
        const type = cards[elem].querySelector('img[class^="entity-image"][alt]')?.getAttribute("class")?.split("entity-image ")[1]||cards[elem].querySelector('img[class^="entity-image no-thumbnail"]')?.getAttribute("class")?.split("entity-image no-thumbnail ")[1]
        const dataKino = await getQueryKino({title,year})
        if(dataKino === undefined){}else if(type==="shows"||"movies" && dataKino.__typename!="Person"){
            dt.push({
                title: !!dataKino.title.russian ? dataKino.title.russian : title,
                srcset: cards[elem].querySelector('div.entity-image-wrap > img')?.getAttribute("srcset")|| `https:${
                    dataKino
                        .poster
                        .avatarsUrl
                }/300x450`,
                id: cards[elem].querySelector('div.entity-card-content > a').getAttribute("id"),
                likes: cards[elem].querySelector('div.entity-opine > button.opine.like.js-opine-ex > span.count').text,
                rating: cards[elem].querySelector('div.entity-titles > span.entity-subtitle > span.score').text,
                year: cards[elem].getAttribute("data-disambiguation"),
                type: type,
                href_id: cards[elem].querySelector('a[id][href][class="js-resource-card-link"][data-no-instant]').getAttribute("href").split("/like/")[1],
                kinopoisk_id: dataKino.id
            })
        } else {
            dt.push({
                title: title,
                srcset: cards[elem].querySelector('div.entity-image-wrap > img').getAttribute("srcset")||null,
                id: cards[elem].querySelector('div.entity-card-content > a').getAttribute("id"),
                likes: cards[elem].querySelector('div.entity-opine > button.opine.like.js-opine-ex > span.count').text,
                rating: cards[elem].querySelector('div.entity-titles > span.entity-subtitle > span.score').text,
                year: year,
                type: type,
                href_id: cards[elem].querySelector('a[id][href][class="js-resource-card-link"][data-no-instant]').getAttribute("href").split("/like/")[1],
                kinopoisk_id: null
            })
        }


    }
    return dt
}






module.exports.GetParsedInfo =  GetParsedInfo;
module.exports.getQueryKino =  getQueryKino;