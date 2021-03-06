import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/sidebar.css';
import SessionForm from '../user/signupContainer'
import UserTab from '../user/usertab'
import { CSSTransition, transit } from "react-css-transition";
import { opacityAppear, slideInTop} from '../../../util/transitionStyles'
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
                <span className='sidebar-top'>
                    <Link to='/' className='logo'>
                        <img src='http://res.cloudinary.com/flyakite/image/upload/v1524109286/logo_qmkf7l.png' />
                    </Link>

                    <div>
                        <h1> Tfin</h1>
                        <div className='searchBar inputForm'>
                            <div className='tab inputForm searchBar'>
                                <input type='submit' onClick={this.handleSearch.bind(this)} value="search" className='submitButton searchSubmit ' />
                                <input id='searchInput' placeholder="search Ticker" />
                            </div>
                        </div>
                    </div>
                </span>

                <span className='sidebar-bottom'>
                    <ul className='buttons'>
                        <li onMouseOver={this.openTab("userBar")} onMouseLeave={this.closeTab} className="user-bar">
                            <label>My Stuff</label>
                            <CSSTransition
                                {...slideInTop}
                                active={this.state.openTab == 'userBar'}
                            >
                                <div id='userbar' className='tab userbar'>
                                    {this.props.user ? <UserTab /> : <SessionForm />}
                                </div>
                            </CSSTransition>
                        </li>
                    </ul>
                </span>
            </section>
        );
    }
}
/*
<section className='sidebar'>
    <Link to='/' className='logo'>
        <img src='http://res.cloudinary.com/flyakite/image/upload/v1524109286/logo_qmkf7l.png' />
    </Link>

    <ul className='buttons'>
        <li onMouseOver={this.openTab("userBar")} onMouseLeave={this.closeTab} className="user-bar">
            <label>My Stuff
                                <CSSTransition
                    {...opacityAppear}
                    active={this.state.openTab == 'userBar'}
                >
                    <div id='userbar' className='tab'>
                        {this.props.user ? <UserTab /> : <SessionForm />}
                    </div>
                </CSSTransition>
            </label>
        </li>
        <li onMouseOver={this.openTab("searchBar")} onMouseLeave={this.closeTab} className='searchBar inputForm'>
            <label> Search a Ticker
                                <CSSTransition
                    {...opacityAppear}
                    active={this.state.openTab == "searchBar"}
                >
                    <div className='tab inputForm searchBar'>
                        <input type='submit' onClick={this.handleSearch.bind(this)} value="search" className='submitButton searchSubmit ' />
                        <input id='searchInput' placeholder="search Ticker" />
                    </div>
                </CSSTransition>
            </label>
        </li>
    </ul>

</section>

*/
