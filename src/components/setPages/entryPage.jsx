import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/entryPage.css';
import List from '../stocks/list';
export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
        console.log('list comp', props);
    }

    render(){
        return(
            <main className='entry'>
                <div className='lists'>
                    <h1>gainers</h1>
                    <h1>losers</h1>
                </div>
                
            </main>
            
        )
    }
}