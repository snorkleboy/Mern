import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/stocklist.css';
import prettify from '../../util/prettify'


export default class List extends React.Component {  
//makes headers as top row
//makes entry[header] for all other rows by iterating through entries and pulling out data by header
    mapper(headers = this.props.data.headers || [], entries = this.props.data.entries || []) {
        return entries.map((entry, i) => (
            <Link className='row' key={`${entry[i]} + ${i}`} to={`/stocks/${entry['symbol']}`}>
                {
                    headers.map((header, j) => (
                        <td key={`${entry[header]}+${i}+${j}`}>
                            {entry[header] ? prettify(entry[header]) : 'unlisted'}
                        </td>
                    ))
                }
            </Link>
        )
        )
    }
    listMaker(headers = this.props.data.headers || [], entries = this.props.data.entries || []) {
        return (
            <table className=''>
                <tbody>
                    <tr>
                            {headers.map((header,i) => <th className='' key={`${header}+${i}`}>{header}</th>)}
                    </tr>
                    {this.mapper()}
                </tbody>
            </table>
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


