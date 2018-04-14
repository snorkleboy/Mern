import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/sidebar.css';
import SessionForm from '../user/signupContainer'
import UserTab from '../user/usertab'

let userBar;
let searchBar;
export default class Stocks extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    handleSearch(e){
        const val = document.getElementById('searchInput').value
        if (val.length > 0){
            this.props.history.push("/stocks/" + val.toString())
        }
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
        function userBarFun() { return this.userBar };
        userBarFun = userBarFun.bind(this);
        function searchBarFun() { return this.searchBar };
        searchBarFun = searchBarFun.bind(this);
        return(
                <section className='sidebar'>
                    <Link to='/' className='logo'>
                    <img src='http://res.cloudinary.com/flyakite/image/upload/v1521700984/logo_kyeatu.png' />
                    </Link>
                    
                    <ul className='buttons'>
                    <li onMouseEnter={openTab(userBarFun)} onMouseLeave={closeTab(userBarFun)} className="user-bar">
                            <label>My Stuff
                                <div  ref={(userBarr)=>{console.log(userBarr);this.userBar = userBarr}} className='tab display-off'>
                                    {this.props.user? <UserTab/> :<SessionForm/> }
                                </div>
                            </label>
                        </li>
                    <li onMouseEnter={openTab(searchBarFun)} onMouseLeave={closeTab(searchBarFun)} className='searchBar inputForm'>
                            <label> Search a Ticker
                                <div ref={(searchBarr)=>{this.searchBar=searchBarr}} className='tab inputForm display-off'>
                                    <input type='submit' onClick={this.handleSearch.bind(this)} value="search" className='submitButton searchSubmit ' />
                                    <input id='searchInput' placeholder="search Ticker" />
                                </div>
                                
                            </label>
                        </li>
                    </ul>

                </section>
        );
    }
}
function closeTab(ref){

    return function (e){
        // const els = e.currentTarget.querySelector('div');
        ref().classList.add('display-off')
    }
}
function openTab(ref){
    return function(e){
        // const els = e.currentTarget.querySelector('div');
        ref().classList.remove('display-off')
    }
}