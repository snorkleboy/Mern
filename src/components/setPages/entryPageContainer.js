import { connect } from 'react-redux';

import EntryPage from './entryPage';
import * as StockActions from '../stocks/stockActions';

const mapState = (state, Ownprops) => {
    return ({
        stocks: state.stocks

    });
};
const mapDispatch = (dispatch, ownProps) => {

    return ({
        fetchAppl: () => dispatch(StockActions.FetchStocks())
    });
};

export default connect(mapState, mapDispatch)(EntryPage);