import React from 'react';
import * as RSSActions from '../../util/RSSAPI';
import '../../css/news.css';
import { CSSTransition, transit } from "react-css-transition";
import {slideIn} from '../../util/transitionStyles'

const feeds = RSSActions.urls.map(el=>el[0])
export default class News extends React.Component {
    constructor(props){
        super(props);
        const rssObj = {}
        feeds.map((feed) => {
            rssObj[feed] = []
        })      
        this.state = {
            rss: rssObj,
            feed: feeds[0],
            activeModal:null,
            subFeed:'stocks'
        };
        this.builder = this.builder.bind(this);
    }
    componentDidMount(){
        RSSActions.fetchAll()
            .then((res) => this.setState({ rss: res }));

    }
    render(){
        const feed = this.state.rss[this.state.feed]
        return (
            <section className='news-section'>
                <div className='news-container'>
                    <div className='options-bar'>
                        <select onChange={this.handleSelectFeed.bind(this)} value={this.state.feed}>
                            {feeds.map(feed => <option key={feed+"feed"} value={feed}>{feed}</option>)}
                        </select>
                    </div>
                    <div className='feed-display'>
                        {(feed.items || feed[this.state.subFeed] || []).map((item) => this.builder(item, feed.backupImg))}
                    </div> 
                </div>
                
            </section>

        )
    }
    handleSelectFeed(e){
        const feed = e.target.value
        this.setState({ feed });
    }
    builder(item, backupImg){
        const temp = document.createElement('div')
        temp.innerHTML = item.description || item.content;
        const ps = temp.querySelectorAll('p');
        let description = [];
        ps.forEach((p, i) => {
            description.push(p.textContent);
        })
        description = description.join("\n\n")
        const that = this
        return (
            <article key={item.title} onMouseLeave={clear} onMouseEnter={modalToggler} className='news-article' >
                <div className='rss-header'>
                    <h1>{removeAmps(item.title)}</h1>
                    <img src={item.thumbnail.length > 0 ? item.thumbnail : backupImg} alt={backupImg} />
                </div>
                <CSSTransition
                    {...slideIn}
                    active={this.state.activeModal === item.title}
                >
                    <div id={item.title} className='rss-content'>
                        <h1>{removeAmps(item.title)}</h1>
                        <a href={item.link}>{item.author}</a>
                        <article>{removeAmps(description)}</article>
                        <h3>{item.pubDate}</h3>
                    </div>
                </CSSTransition>


            </article>
        );

        function clear() {
            that.setState({ activeModal: null })
        }
        function modalToggler() {
            that.setState({ activeModal: item.title })
        }

    }
}



function removeAmps(string){
    return string.split("&amp;quot;").join('"')
}

// { item.title }
// { item.pubDate }

// { item.description }
// { item.thumbnail }
// <img src={item.thumbnail} />
// { item.link }
