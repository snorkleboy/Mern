import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/sidebar.css';
import SessionForm from '../user/signupContainer'
import UserTab from '../user/usertab'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            "openTab":null
        }
        this.openTab = this.openTab.bind(this);
        this.closeTab = this.closeTab.bind(this);
    }
    handleSearch(e){
        const val = document.getElementById('searchInput').value
        if (val.length > 0){
            this.props.history.push("/stocks/" + val.toString())
        }
    }


    closeTab() {
        this.setState({"openTab": null})
    }
    openTab(ref) {
        const that = this;
        return function (e) {
            that.setState({"openTab": ref})
        }
    }
    render(){

        return(
                <section className='sidebar'>
                    <Link to='/' className='logo'>
                    <img src='http://res.cloudinary.com/flyakite/image/upload/v1521700984/logo_kyeatu.png' />
                    </Link>
                    
                    <ul className='buttons'>
                        <li onMouseOver={this.openTab("userBar")} onMouseLeave={this.closeTab} className="user-bar">
                            <label>My Stuff

                                <ReactCSSTransitionGroup
                                    transitionName="sideBarTabsTransition"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={100}
                                >        
                                {
                                    this.state.openTab == 'userBar' ? 
                                        <div id='userbar' className='tab'>
                                            {this.props.user? <UserTab/> :<SessionForm/> }
                                        </div>
                                    :
                                        null
                                }
                            </ReactCSSTransitionGroup>
                                
                            </label>
                        </li>
                    <li onMouseOver={this.openTab("searchBar")} onMouseLeave={this.closeTab} className='searchBar inputForm'>
                            <label> Search a Ticker
                                <ReactCSSTransitionGroup
                                    transitionName="sideBarTabsTransition"
                                    transitionEnterTimeout={500}
                                    transitionLeaveTimeout={100}
                                > 
                                {
                                    this.state.openTab == "searchBar" ? 
                                    <div className='tab inputForm'>
                                        <input type='submit' onClick={this.handleSearch.bind(this)} value="search" className='submitButton searchSubmit ' />
                                        <input id='searchInput' placeholder="search Ticker" />
                                    </div>
                                :
                                    null
                                }
                                </ReactCSSTransitionGroup>                                
                            </label>
                        </li>
                    </ul>

                </section>
        );
    }
}
