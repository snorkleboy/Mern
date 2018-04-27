const RSSConverterUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';


export const urls = [
    ['economist', 'https://www.economist.com/sections/business-finance/rss.xml', 'https://cdn-images-1.medium.com/max/800/1*XT-ekcj-yJ5mvdJGpA8JNA.png'],
    ['reddit', 'https://www.reddit.com/r/stocks.rss',"http://icons.iconarchive.com/icons/uiconstock/socialmedia/512/Reddit-icon.png"],
    ['seekingAlpha', 'http://seekingalpha.com/feed.xml',"https://static.seekingalpha.com/assets/og_image_410-b8960ce31ec84f7f12dba11a09fc1849b69b234e0f5f39d7c62f46f8692e58a5.png"],
    ['investing.com', 'https://www.investing.com/rss/news_285.rss',"https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/d7/4e/a8/d74ea8e8-2689-ed73-6a07-6024f35065a2/mzl.bfjktawu.png/1200x630bb.jpg"],
    ['barrons', 'http://blogs.barrons.com/stockstowatchtoday/feed/', "https://apkzz.com/wp-content/uploads/2018/01/158217_featured.jpg"]

]
// export const fetchEconomistRSS = () => fetch(RSSConverterUrl + urls[0][1], {
//         method: "GET",
//         dataType: 'jsonp'
//     })
//     .then((res) => {
//         return res.json()
//     })
export const fetchSubReddit = (sub) => fetch(RSSConverterUrl + 'https://www.reddit.com/r/' + sub + '.rss', {
        method: "GET",
        dataType: 'jsonp'
    })
    .then(res=>res.json())

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
                results[i].backupImg = url[2]
                resObj[url[0]] = results[i]
            })
            return resObj;
        })
}