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
                <main className='form'>
                    <div className='username'>username</div>
                    <div className='password'>password</div>
                    <Link to='/stocks'>signin</Link>
                </main>
            </div>
        );
    }
}
export default Signup;