const RSSConverterUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';


const urls = [
    ['economist','https://www.economist.com/sections/business-finance/rss.xml'],
    ['wallStreetBets', 'https://www.reddit.com/r/wallstreetbets.rss'],
    ['seekingAlpha', 'http://seekingalpha.com/feed.xml'],
    ['investing.com', 'https://www.investing.com/rss/news_25.rss'],
    ['barrons', 'http://blogs.barrons.com/stockstowatchtoday/feed/']

]
export const fetchEconomistRSS = () => fetch(RSSConverterUrl + urls[0][1], {
        method: "GET",
        dataType: 'jsonp'
    })
    .then((res) => {
        return res.json()
    })

export const fetchAll = () =>{
    const promises = urls.map( url=> {
        return fetch(RSSConverterUrl + url[1], {
            method: "GET",
            dataType: 'jsonp'
        })
        .then((res) => {
            const resp = res.json();
            return resp
        })
    })
    return Promise.all(promises)
        .then(results=>{
            const resObj = {}
            urls.map((url,i)=>{
                resObj[url[0]] = results[i]
            })
            return resObj;
        })
}