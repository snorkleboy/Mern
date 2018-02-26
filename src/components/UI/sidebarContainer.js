import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import Sidebar from './sidebar';
import * as StockActions from '../../components/stocks/stockActions';

const mapState = (state, Ownprops) => {
    return ({
        stocks: state.stocks
    });
};
const mapDispatch = (dispatch, ownProps) => {

    return ({

    });
};

export default withRouter(connect(mapState, mapDispatch)(Sidebar));