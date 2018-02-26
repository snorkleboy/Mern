import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/sidebar.css';


export default class Stocks extends React.Component {
    constructor(props) {
        super(props);
        console.log('sidebar',props);
    }

    render(){
        return(
            <div className='sidebarHolder'>
                <section className='sidebar'>
                <div className='logo'>
                    Tfin
                    
                </div>
                    <ul className='categories'>

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