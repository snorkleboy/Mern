import React from 'react';
import { Link } from 'react-router-dom';

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render(){
        return(
            <div className='stocks'>
                <main className='graphs'>
                    <div className='primaryGraph'>primaryGraph        </div>
                    <div className='secondaryGraph'>secondaryGraph</div>
                </main>
                <main>
                    <div className='stats'>stats</div>
                    <div className='options'>options</div>     
                </main>            
            </div>
        );
    }
}
export default Stocks;