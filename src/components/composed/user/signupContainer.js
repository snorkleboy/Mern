import { connect } from 'react-redux';
import * as StockActions from '../../stocks/stockActions';
import * as UserActions from './userActions';
import Signup from './signup'


const mapState = (state, Ownprops) => {
    return ({
        errors: state.user.errors,
        signedIn: state.user.user
    });
};
const mapDispatch = (dispatch, ownProps) => {

    return ({
        getMosts: () => dispatch(StockActions.getMosts()),
        createUser: (username, password) => dispatch(UserActions.createUser(username,password)),
        login:(username,password)=> dispatch(UserActions.login(username,password)),
        checkUserName: UserActions.checkUserName
    });
};

export default connect(mapState, mapDispatch)(Signup);