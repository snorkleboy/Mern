import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/entryPage.css';
import List from '../stocks/list';
export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
        console.log('entrypage', props);
    }
    componentDidMount(){
        this.ensure();
    }
    componentWillUpdate(prevprops,newprops){
        console.log('entrypage willupdate',prevprops, newprops);
    }
    ensure(){
        if (this.props.stocks.gainers.length < 1){
            this.props.getMosts();
        }
    }
    render(){
        // console.log("ENTRYPAGE PROPS.STOCKS",this.props.stocks)
        return(
            <main className='entry'>
            <section className='welcome'>
                <article>
                    <div className='logo'></div>
                    <h1>welcome</h1>

                </article>
            </section>
                <section className='lists'>
                    <article className='gainers'>
                    <h1>gainers</h1>
                        <List
                            data={{
                                'headers': this.getHeaders(this.props.stocks.gainers),
                                'entries': this.getEntries(this.props.stocks.gainers)
                            }}
                        /> 
                        
                    </article>

                    <article className='losers'>
                    <h1>losers</h1>
                        <List
                            data={{
                                'headers':this.getHeaders(this.props.stocks.losers),
                                'entries':this.getEntries(this.props.stocks.losers)
                            }}
                        />
                    </article>

                    <article className='mostActive'>
                    <h1>most active</h1>
                        <List
                            data={{
                                'headers': this.getHeaders(this.props.stocks.mostActive),
                                'entries': this.getEntries(this.props.stocks.mostActive)
                            }}
                        />
                    </article>

                    <article className='mostVolume'>
                    <h1>most volume</h1>
                        <List
                            data={{
                                'headers': this.getHeaders(this.props.stocks.mostVolume),
                                'entries': this.getEntries(this.props.stocks.mostVolume)
                            }}
                        />
                    </article>
                </section>
                
            </main>
            
        )
    }
    getEntries(array){
        return array;
    }
    getHeaders(array){
        return (array && !array.length == 0) ? 
            Object.keys(array[0])
        :
            [];
    }
}