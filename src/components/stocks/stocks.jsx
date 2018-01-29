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
        let data = this.props.stocks['dataset'] ? this.props.stocks['dataset'] : null;
        data = data ? 
            Object.keys(data).map((key, id) => <h1 key={key}>{key+id}:{data[key]}</h1>)
        :
            null;
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
                <div>
                    APPlE DATA
                    <div>
                        {data}
                    </div>
                </div>
            </div>
        );
    }
}
export default Stocks;