import { connect } from 'react-redux';
import React from 'react';

import Stocks from './stocks';

const mapState = (state, Ownprops) =>{
    return({
        stocks: {stuff:"that"}

    });
};
const mapDispatch = (dispatch, ownProps)=>{
    
    return({

    });
};

export default connect(mapState, mapDispatch)(Stocks);