import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/stocklist.css';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        console.log('list comp',props);
        this.state = {};
        try {
            this.state={'headers': props.data.headers,'entries': props.data.entries};
        } catch (error) {
            console.log('List.jsx error:', 'list must be passed props.data.headers and props.data.entries');
            console.log(error);
            this.state={'headers':[],'entries':[]};
        }
        console.log('list state', this.state);
        // this.state.headers=['ticker','price','volume'];
        // this.state.entries = [['aapl', 123, 432234], ['zaag', 321, 678686]];
        
        
    }

    tableMaker(headers = this.state.headers, entries = this.state.entries) {

        return (
            <tbody>
                <tr>
                    {headers.map((header) => <th>{header}</th>)}
                </tr>
                {entries.map((entry) => (
                    <tr>
                        {entry.map((data) => <th>{data}</th>)}
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