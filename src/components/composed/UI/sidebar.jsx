import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/sidebar.css';



export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    handleSearch(e){
        const val = document.getElementById('searchInput').value
        this.props.history.push("/stocks/"+val.toString())
    }
    handleKeyDown(event) {
        if (event.keyCode == 13 /*enter*/) {
            this.handleSearch();
        }
    }
    componentDidMount(){
        document.getElementById('searchInput').addEventListener("keypress",this.handleKeyDown)
    }
    componentWillUnmount(){
        document.getElementById('searchInput').removeEventListener("keypress",this.handleKeyDown)
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
                            <input type='submit' onClick={this.handleSearch.bind(this)} className='submit searchSubmit'/>
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