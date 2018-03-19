import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/sidebar.css';
import SessionForm from '../user/signupContainer'


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
        console.log("SIDEBARPROPS",this.props);
        return(
                <section className='sidebar'>
                    <Link to='/' className='logo'>
                        <img src='http://res.cloudinary.com/flyakite/image/upload/c_crop,g_custom/v1521431044/LogoMakr_8ZTKUQ_vznqxg.png' />
                    </Link>
                    
                    <ul className='categories'>
                        <li>
                            <div className='user-bar'>
                                <SessionForm />
                            </div>
                        </li>
                        <li className='searchBar inputForm'>
                            <label> Search a Ticker
                                <div className='inputForm'>
                                    <input type='submit' onClick={this.handleSearch.bind(this)} value="search" className='submitButton searchSubmit ' />
                                    <input id='searchInput' placeholder="search Ticker" />
                                </div>
                                
                            </label>
                        </li>
                    </ul>
                    <div className='ack'>
                        credits to IEX and Quandl
                    </div>
                </section>
        );
    }
}