import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/sidebar.css';


export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSearch(e){
        e.preventDefault();
        const val = document.getElementById('searchInput').value
        this.props.history.push("/stocks/"+val.toString())
    }
    render(){
        return(
            <div className='sidebarHolder'>
                <section className='sidebar'>
                <div className='logo'>
                    Tfin
                    
                </div>
                    <ul className='categories'>
                        <li className='searchBar'>
                            <input id='searchInput' placeholder="search Ticker" />
                            <input type='submit' onClick={this.handleSearch.bind(this)} Name='submit searchSubmit'/>
                        </li>
                        <li><Link to='/stocks'>homepage</Link></li>
                        <li><Link to='/'>signin</Link></li>
                    </ul>
                    <div className='ack'>
                        credits to IEX and Quandl
                    </div>
                </section>
            </div>
        );
    }
}