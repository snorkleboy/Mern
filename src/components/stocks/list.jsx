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
        // this.state.headers=['ticker','price','volume'];
        // this.state.entries = [['aapl', 123, 432234], ['zaag', 321, 678686]];
        
        
    }
    

    tableMaker(headers = this.props.data.headers || [], entries = this.props.data.entries || []) {
        console.log('tablemaker',this.props, headers,entries);
        return (
            <tbody>
                <tr>
                    {headers.map((header) => <th>{header}</th>)}
                </tr>
                {entries.map((entry) => (
                    <tr>
                        {Object.values(entry).map((data) => <th>{data}</th>)}
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