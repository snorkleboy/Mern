import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/stocklist.css';


String.prototype.precTrim = function (num) {
    const ind = this.indexOf('.')
    if (ind !== -1) {
        return this.slice(0, ind + num + 1);
    }
    return this
}


export default class List extends React.Component {
    constructor(props) {
        super(props);
    }
    
//makes headers as top row
//makes entry[header] for all other rows by iterating through entries and pulling out data by header
    listMaker(headers = this.props.data.headers || [], entries = this.props.data.entries || []) {
        return (
            <section class='table'>
                <header className='row'>
                    {headers.map((header,i) => <div className='chart-header' key={`${header}+${i}`}>{header}</div>)}
                </header>
                {entries.map((entry,i) => (
                    <Link className='row' key={`${entry} + ${i}`} to={`/stocks/${entry['symbol']}`}>
                        {headers.map((header, j) =>(                        
                            <div key={`${entry[header]}+${i}+${j}`}>
                                    {entry[header] ? entry[header].toString().precTrim(3) : 'unlisted'}
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


