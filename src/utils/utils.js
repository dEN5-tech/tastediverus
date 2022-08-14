import axios from "axios";

export async function SearchQuery(query) {
  const response = await axios.post(
    "https://zq8ipnerk4.execute-api.us-east-1.amazonaws.com/development/graphql",
    {
      documentId: "MultiSearchQuery",
      variables: {
        query: `${query}`,
        types: [
          "urn:entity:author",
          "urn:entity:book",
          "urn:entity:restaurant",
          "urn:entity:movie",
          "urn:entity:artist",
          "urn:entity:podcast",
          "urn:entity:tv_show",
          "urn:entity:videogame",
        ],
        tdTypes: ["a", "b", "r", "m", "s", "p", "h", "g"],
      },
    },
    {
      headers: {
        authority: "zq8ipnerk4.execute-api.us-east-1.amazonaws.com",
        accept: "*/*",
        "accept-language":
          "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5",
        "content-type": "application/json",
        origin: "https://tastedive.com",
        referer: "https://tastedive.com/",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      },
    }
  );
}
