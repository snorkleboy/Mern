import React from 'react';
import { Link } from 'react-router-dom';

class Stocks extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.clickAppl = this.clickAppl.bind(this);
    }
    clickAppl(e){
        console.log('here');
        console.log(this.props);
        e.preventDefault();
        this.props.fetchAppl();
    }
    componentDidUpdate(newProps,oldProps){
        console.log(newProps);
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
                    <button onClick={this.clickAppl} className='appl'>APPLE</button>     
                </main>            
            </div>
        );
    }
}
export default Stocks;