import { connect } from 'react-redux';

import Stocks from './stocks';
import * as StockActions from './stockActions';

const mapState = (state, Ownprops) =>{
    return({
        stocks: state.stocks

    });
};
const mapDispatch = (dispatch, ownProps)=>{
    
    return({
        fetchAppl: () => dispatch(StockActions.FetchStocks())
    });
};

export default connect(mapState, mapDispatch)(Stocks);