import { connect } from 'react-redux';

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

export default connect(mapState, mapDispatch)(Sidebar);