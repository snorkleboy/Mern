import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className='Signup'>
                <section className='form'>
                    <div className='username'>username</div>
                    <div className='password'>password</div>
                    <Link to='/stocks'>signin</Link>
                </section>
            </div>
        );
    }
}
export default Signup;