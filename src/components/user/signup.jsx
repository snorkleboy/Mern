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
                    <div className='username'>username        </div>
                    <div className='password'>password</div>
                </main>
            </div>
        );
    }
}
export default Signup;