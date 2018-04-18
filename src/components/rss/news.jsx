import React from 'react';
import * as RSSActions from '../../util/RSSAPI';
import '../../css/news.css';
import { CSSTransition, transit } from "react-css-transition";
import {slideIn} from '../../util/transitionStyles'



export default class News extends React.Component {
    constructor(props){
        super(props);
        const rssObj = {}
        RSSActions.urls.map((url) => {
            rssObj[url[0]] = []
        })      
        this.state = { rss: rssObj, feed: RSSActions.urls[0][0], activeModal:null };
        this.builder = this.builder.bind(this);
    }
    componentDidMount(){
        RSSActions.fetchAll()
            .then((res) => this.setState({ rss: res }));

    }
    render(){
        console.log(this.state);
        const feed = this.state.rss[this.state.feed]
        return (
            <section className='news-section'>
                <div className='news-container'>
                    <div className='options-bar'>
                        <select onChange={this.handleSelectFeed.bind(this)} value={this.state.feed}>
                            {RSSActions.urls.map(feed => <option key={feed[0]+"feed"} value={feed[0]}>{feed[0]}</option>)}
                        </select>
                    </div>
                    <div className='feed-display'>
                        {(feed.items || []).map((item) => this.builder(item, feed.backupImg))}
                    </div> 
                </div>
                
            </section>

        )
    }
    handleSelectFeed(e){
        this.setState({feed:e.target.value});
    }
    builder(item, backupImg){
        const temp = document.createElement('div')
        temp.innerHTML = item.description;
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
                    <img src={item.thumbnail.length > 0 ? item.thumbnail : backupImg} />
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
