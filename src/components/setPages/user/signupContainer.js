import { connect } from 'react-redux';
import * as StockActions from '../../stocks/stockActions';

import Signup from './signup'


const mapState = (state, Ownprops) => {
    return ({
        stocks: { stuff: "howdy" }

    });
};
const mapDispatch = (dispatch, ownProps) => {

    return ({
        getMosts: () => dispatch(StockActions.getMosts())
    });
};

export default connect(mapState, mapDispatch)(Signup);