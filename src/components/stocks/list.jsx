import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/stocklist.css';

export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
        console.log('list comp',props);
    }

    render(){
        return(
            <main className='stockList'>
                <table >
                    <tr>
                        <th>ticker</th>
                        <th>price</th>
                        <th>change</th>
                    </tr>
                    <tr>
                        <td>aapl</td>
                        <td>213</td>
                        <td>.12</td>
                    </tr>
                    <tr>
                        <td>zagg</td>
                        <td>17</td>
                        <td>.23</td>
                    </tr>
                </table>
            </main>
        );
    };
}