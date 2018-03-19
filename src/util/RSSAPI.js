const RSSConverterUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';


const url = 'https://www.economist.com/sections/business-finance/rss.xml'
export const FetchNewsRSS = () => fetch(RSSConverterUrl + url, {
    method: "GET",
    dataType: 'jsonp'
}).then((res) => {
    return res.json()
})

