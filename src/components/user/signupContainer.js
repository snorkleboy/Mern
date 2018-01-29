import { connect } from 'react-redux';

import Signup from './signup'


const mapState = (state, Ownprops) => {
    return ({
        stocks: { stuff: "howdy" }

    });
};
const mapDispatch = (dispatch, ownProps) => {

    return ({

    });
};

export default connect(mapState, mapDispatch)(Signup);