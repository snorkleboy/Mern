import React from 'react';
import * as RSSActions from '../../util/RSSAPI';
import '../../css/news.css';

const feeds = ["Economist","Wall Street Bets", "Other"]
export default class News extends React.Component {
    constructor(props){
        super(props);
        this.state = { rss: [], feed:feeds[0] };
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
                            {feeds.map(feed => <option value={feed}>{feed}</option>)}
                        </select>
                    </div>
                    <div className='feed-display'>
                        {(this.state.rss.items || []).map((item) => builder(item))}
                    </div> 
                </div>
                
            </section>

        )
    }
    handleSelectFeed(e){
        this.setState({feed:e.target.value});
    }
}

function builder(item){
    const temp = document.createElement('div')
    temp.innerHTML = item.description;
    const ps = temp.querySelectorAll('p');
    let description=[];
    ps.forEach((p,i)=>{
        description.push(p.textContent);
    })
    description = description.join("\n\n")

    return (
        <article key={item.title} onMouseLeave={handlerClear} onMouseEnter={modalToggler} className='news-article' >
            <div  className='rss-header'>
                <h1>{removeAmps(item.title)}</h1>
                <img src={item.thumbnail.length > 0 ? item.thumbnail : 'https://cdn-images-1.medium.com/max/800/1*XT-ekcj-yJ5mvdJGpA8JNA.png'}/>
            </div>
            <div id={item.title}  className='modal rss-content'>
                <h1>{removeAmps(item.title)}</h1>
                <a href={item.link}>{item.author}</a>
                <article>{removeAmps(description)}</article>
                <h3>{item.pubDate}</h3>

            </div>
        </article>
    );
    function handlerClear(){
        clear();
    }
    function clear(exclude=[]){
        const modals = document.body.querySelectorAll(".modal-clicked")
            .forEach((modal) => { 
                if(!exclude.includes(modal.id)){
                    modal.classList.remove('modal-clicked'); modal.classList.add('modal')
                }
            })
    }
    function modalToggler(){
        clear([item.title])
        const el = document.getElementById(item.title)
        el.classList.add('modal-clicked');
        el.classList.remove('modal');

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
