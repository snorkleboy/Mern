import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/stocklist.css';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        console.log('list comp',props);
        if (this.props.data === undefined) {
            console.log('List.jsx error:', 'list must be passed props.data.headers and props.data.entries');            
        }      
    }
    

    tableMaker(headers = this.props.data.headers || [], entries = this.props.data.entries || []) {
        return (
            <tbody>
                <tr>
                    {headers.map((header,i) => <th key={`${header}+${i}`}>{header}</th>)}
                </tr>
                {entries.map((entry,i) => (
                    <tr key={`${entry} + ${i}`}>                  
                        {headers.map((header, j) =>(                        
                            <th key={`${entry[header]}+${i}+${j}`}>
                                <Link to={`/stocks/${entry['symbol'] || entry['ticker'] || entry['name'] || entry['company']}`}> 
                                    {entry[header] || 'unlisted'}
                                </Link>
                            </th>)
                        )}
                    </tr> 
                )
                )}
            </tbody>
        );
    }
    render(){
        return(
            <main className='stockList'>
                <table >
                    {this.tableMaker()}
                </table>
            </main>
        );
    }
}