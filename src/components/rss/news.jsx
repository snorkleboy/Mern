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
                <h1> thingingodfododo</h1>
            </section>)
    }
}

function builder(item){
    return (
        <article className='news-article'>
            <div dangerouslySetInnerHTML={{ __html: item.content }} />;
        </article>
    );
}

// { item.title }
// { item.pubDate }

// { item.description }
// { item.thumbnail }
// <img src={item.thumbnail} />
// { item.link }
