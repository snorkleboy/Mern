import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/entryPage.css';
import List from '../stocks/list';
import News from '../rss/news'
export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.ensure();
    }
    componentWillUpdate(prevprops,newprops){
    }
    ensure(){
        if (this.props.stocks.gainers.length < 1){
            this.props.getMosts();
        }


    }
    render(){
        console.log("ENTRY",this.props);
        const date = this.props.stocks.gainers[0] ? new Date(this.props.stocks.gainers[0].latestTime).toLocaleDateString() : "Today"
        return(
            <main className='entry'>
            
                
                <section className='lists'>

                    <h1>{date}'s Mosts'</h1>
                    <div className='gridParent'>
                        <article className='gainers'>
                        <h1> Most Gained</h1>
                            <List
                                data={{
                                    'headers': this.getHeaders(this.props.stocks.gainers),
                                    'entries': this.getEntries(this.props.stocks.gainers)
                                }}
                            />               
                        </article>
                        <article className='losers'>
                        <h1>Most Lost</h1>
                            <List
                                data={{
                                    'headers':this.getHeaders(this.props.stocks.losers),
                                    'entries':this.getEntries(this.props.stocks.losers)
                                }}
                            />
                        </article>
                        <article className='mostActive'>
                        <h1>Most Active</h1>
                            <List
                                data={{
                                    'headers': this.getHeaders(this.props.stocks.mostActive),
                                    'entries': this.getEntries(this.props.stocks.mostActive)
                                }}
                            />
                        </article>
                        <article className='mostVolume'>
                        <h1>Most Volume</h1>
                            <List
                                data={{
                                    'headers': this.getHeaders(this.props.stocks.mostVolume),
                                    'entries': this.getEntries(this.props.stocks.mostVolume)
                                }}
                            />
                        </article>
                    </div>
                </section>

                <News />
            </main>
            
        )
    }
    getEntries(array){
        return array;
    }
    getHeaders(array){
        return (array && !array.length == 0) ? 
            Object.keys(array[0]).filter((key) => !notHeaders.includes(key))
        :
            [];
    }
}

const notHeaders = ["change","latestTime","previousClose","peRatio","avgTotalVolume"]

