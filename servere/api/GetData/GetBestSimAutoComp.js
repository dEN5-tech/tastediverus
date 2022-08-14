const express = require("express");
const axios = require("axios");
const nHtmlParser = require("node-html-parser");

var router = express.Router();

async function GetTranslate(query) {
	const response = await axios.get(
		`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ru&hl=ru&dt=t&dt=bd&dj=1&source=icon&tk=201819.201819&q=${encodeURI(
			query
		)}`,
		{
			headers: {
				authority: "translate.googleapis.com",
				accept: "*/*",
				"accept-language":
					"ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5",
				origin: "https://bestsimilar.com",
				referer: "https://bestsimilar.com/",
				"sec-ch-ua":
					'"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"Windows"',
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "cross-site",
				"user-agent":
					"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
				"x-client-data":
					"CI+2yQEIpbbJAQjEtskBCKmdygEIp9PKAQiUocsBCKK8zAEIhL3MAQizwcwBCMXBzAEI1sHMAQ==",
			},
		}
	);
	return response.data.sentences[0].trans;
}

async function GetGenres(url) {
	const response = await axios.get(`https://bestsimilar.com${url}`, {
		headers: {
			authority: "bestsimilar.com",
			accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-language":
				"ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5",
			cookie: "PrivacyAccept=1",
			"sec-ch-ua":
				'"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"Windows"',
			"sec-fetch-dest": "document",
			"sec-fetch-mode": "navigate",
			"sec-fetch-site": "none",
			"sec-fetch-user": "?1",
			"upgrade-insecure-requests": "1",
			"user-agent":
				"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
		},
	});
	const html = nHtmlParser.parse(response.data.toString());
	const itemBig = html.querySelector(
		'div[class="item-c"] > div[class="item item-big clearfix"]'
	);
	const row = itemBig.querySelector(
		'div[class="column-content-c"] > div[class="row"]'
	);
	const textDescr = row.querySelector('div[class="col-lg-5 col-md-5 col-sm-5 col-xs-12"]')


	const plot = itemBig.querySelector(
		".attr-tag.attr-tag-group-1 > span.value"
	)?.text||null;
	const style = itemBig.querySelector(
		".attr-tag.attr-tag-group-3 > span.value"
	)?.text||null;
	const genre = itemBig.querySelector(
		"div.col-lg-5.col-md-5.col-sm-5.col-xs-12 > div:nth-child(1) > span.value"
	)?.text||null;
	const title = itemBig.querySelector(
		".item-name.clearfix > div > div.name-c > span"
	)?.text||null;

	const out = await Promise.all([
		GetTranslate(plot),
		GetTranslate(style),
		GetTranslate(textDescr.innerText.match(/ Genre:(?<genres>(.*))/gm)[0].trim().replace("Genre:","").trim()),
	]);
	return {
		plot: out[0],
		style: out[1],
		genre: out[2],
	};
}

// middleware that is specific to this router
router.use(async (req, res, next) => {
	if (req.originalUrl.includes("/get_data_best_sim_auto_comp")) {
		var config = {
			method: "post",
			url: `https://bestsimilar.com/site/autocomplete?term=${encodeURI(req.query.query)}`,
			headers: {
				authority: "bestsimilar.com",
				accept: "application/json, text/javascript, */*; q=0.01",
				"accept-language":
					"ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5",
				"content-length": "0",
				cookie: "PrivacyAccept=1",
				origin: "https://bestsimilar.com",
				referer: "https://bestsimilar.com/movies",
				"sec-ch-ua":
					'"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"Windows"',
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"user-agent":
					"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
				"x-requested-with": "XMLHttpRequest",
			},
		};

		const response = await axios(config);
		res.data = response.data;

		/*		if (r.status == 200) {
			res.data = r.data.toString();
		} else {
			res.data = undefined;
		}*/
	}

	next();
});

router.get("/get_data_best_sim_auto_comp", async function (req, res) {
	if (res.data === undefined) {
		res.json([]);
	} else {
		res.data.movie[0]?.url ? GetGenres(res.data.movie[0].url).then((data) => res.json(data)) : res.json({})
	}
});

module.exports.GetDataBestSimAutoComp = router;
