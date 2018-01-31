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
        // console.log('entrypage willupdate',prevprops, newprops);
    }
    ensure(){
        console.log(this.props);
        if (this.props.stocks.gainers.length < 1){
            this.props.getMosts();
        }
    }
    render(){
        // console.log("ENTRYPAGE PROPS.STOCKS",this.props.stocks)
        return(
            <main className='entry'>
                <div className='lists'>
                    <div className='gainers'>
                    <h1>gainers</h1>
                        <List
                            data={{
                                'headers': this.getHeaders(this.props.stocks.gainers),
                                'entries': this.getEntries(this.props.stocks.gainers)
                            }}
                        /> 
                        
                    </div>

                    <div className='losers'>
                    <h1>losers</h1>
                        <List
                            data={{
                                'headers':this.getHeaders(this.props.stocks.losers),
                                'entries':this.getEntries(this.props.stocks.losers)
                            }}
                        />
                    </div>

                    <div className='mostActive'>
                    <h1>most active</h1>
                        <List
                            data={{
                                'headers': this.getHeaders(this.props.stocks.mostActive),
                                'entries': this.getEntries(this.props.stocks.mostActive)
                            }}
                        />
                    </div>

                    <div className='mostVolume'>
                    <h1>most volume</h1>
                        <List
                            data={{
                                'headers': this.getHeaders(this.props.stocks.mostVolume),
                                'entries': this.getEntries(this.props.stocks.mostVolume)
                            }}
                        />
                    </div>
                </div>
                
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