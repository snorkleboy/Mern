import React from 'react';
import * as RSSActions from '../../util/RSSAPI';
import '../../css/news.css';
import { CSSTransition, transit } from "react-css-transition";
import {slideIn} from '../../util/transitionStyles'



const feeds = ["Economist","Wall Street Bets", "Other"]
export default class News extends React.Component {
    constructor(props){
        super(props);
        this.state = { rss: [], feed:feeds[0], activeModal:null };
        this.builder = this.builder.bind(this);
    }
    componentDidMount(){
        if (this.state.rss.length === 0) {
            RSSActions.FetchNewsRSS().then((res) => {
                this.setState({ rss: res });
            })
        }
    }
    render(){
        return (
            <section className='news-section'>
                <div className='news-container'>
                    <div className='options-bar'>
                        <select onChange={this.handleSelectFeed.bind(this)} value={this.state.feed}>
                            {feeds.map(feed => <option key={feed+"feed"} value={feed}>{feed}</option>)}
                        </select>
                    </div>
                    <div className='feed-display'>
                        {(this.state.rss.items || []).map((item) => this.builder(item))}
                    </div> 
                </div>
                
            </section>

        )
    }
    handleSelectFeed(e){
        this.setState({feed:e.target.value});
    }
    builder(item){
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
                    <img src={item.thumbnail.length > 0 ? item.thumbnail : 'https://cdn-images-1.medium.com/max/800/1*XT-ekcj-yJ5mvdJGpA8JNA.png'} />
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
