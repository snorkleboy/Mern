import { connect } from 'react-redux';

import Table from './table';
import * as StockActions from './stockActions';

const mapState = (state, Ownprops) => {
    return ({
        stocks: state.stocks
    });
};
const mapDispatch = (dispatch, ownProps) => {

    return ({

    });
};

export default connect(mapState, mapDispatch)(Table);