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
    ensure(){
        if (!this.props.gainers) this.props.getGainers();
        if (!this.props.losers) this.props.getLosers();
        if (!this.props.volumes) this.props.getVolumes();
        if (!this.props.mostActives) this.props.getMostActives();
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