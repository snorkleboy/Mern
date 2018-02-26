import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/stocklist.css';
import prettify from '../../util/prettify'


export default class List extends React.Component {
    constructor(props) {
        super(props);
    }
    
//makes headers as top row
//makes entry[header] for all other rows by iterating through entries and pulling out data by header
    listMaker(headers = this.props.data.headers || [], entries = this.props.data.entries || []) {
        return (
            <section class='grid'>
                <div className='row rowHeader'>
                    {headers.map((header,i) => <div className='chart-header' key={`${header}+${i}`}>{header}</div>)}
                </div>
                {entries.map((entry,i) => (
                    <Link className='row' key={`${entry} + ${i}`} to={`/stocks/${entry['symbol']}`}>
                        {headers.map((header, j) =>(                        
                            <div key={`${entry[header]}+${i}+${j}`}>
                                {entry[header] ? prettify(entry[header]) : 'unlisted'}
                            </div>)
                        )}
                    </Link>
                    )
                )}
            </section>
        );
    }
    render(){
        return(
            <main className='stockList'>
                    {this.listMaker()}
            </main>
        );
    }
}


