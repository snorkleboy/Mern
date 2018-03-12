import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import Sidebar from './sidebar';
import * as StockActions from '../../stocks/stockActions';
import * as UserActions from '../user/userActions';

const mapState = (state, Ownprops) => {
    return ({
        user: state.user.user
    });
};
const mapDispatch = (dispatch, ownProps) => {

    return ({
    });
};

export default withRouter(connect(mapState, mapDispatch)(Sidebar));