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
        getGainers: () => dispatch(StockActions.getGainers()),
        getLosers: () => dispatch(StockActions.getLosers()),
        getVolumes: () => dispatch(StockActions.getVolumes()),
        getMostActives: () => dispatch(StockActions.getMostActives()),
    });
};
export default connect(mapState, mapDispatch)(EntryPage);