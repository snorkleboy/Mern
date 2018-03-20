import React from 'react';
import * as RSSActions from '../../util/RSSAPI';
import '../../css/news.css';

export default class News extends React.Component {
    constructor(props){
        super(props);
        this.state = { rss: null };
        console.log("HERERHERHEHERHEHRE");
    }
    componentDidMount(){
        if (!this.state.rss) {
            RSSActions.FetchNewsRSS().then((res) => {
                console.log("RSS RES", res);
                this.setState({ rss: res });
            })
        }
    }
    render(){
        console.log("NEWS",this.state);
        
        return this.state.rss ?
            (
                <section className='news-Section'>
                    {this.state.rss.items.map((item)=>builder(item))}
                </section>
            )
        :
            (<section>
                <h1></h1>
            </section>)
    }
}

function builder(item){
    return (
        <article className='news-article'>
            <div className='rss-header'>
                <h1>{item.title}</h1>
                <img src={item.thumbnail}/>
            </div>
            <div className='rss-content'>
                <article>{item.description}</article>
                <h3>{item.pubDate}</h3>
                <a href={item.link}>read more
                
                </a>
            </div>
        </article>
    );
}

// { item.title }
// { item.pubDate }

// { item.description }
// { item.thumbnail }
// <img src={item.thumbnail} />
// { item.link }
