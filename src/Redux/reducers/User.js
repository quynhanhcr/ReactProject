import produce from "immer";
import { actionUser } from "../actions";



const initalSate = {
    loading: false,
    err: '',
    access_token: '',
    currentUser: {},
    backUrl: '/'
};

const user = (state = initalSate, action) => produce(state, (draft)=>{
    const {type, payload} = action;

    switch (type) {
        case actionUser.LOGIN:
            draft.loading = true;
            break;
        case actionUser.GET_CURRENT_USER:
            draft.currentUser = payload.user;
            
        case actionUser.LOGIN_SUCCESS:
            draft.access_token = payload.access_token;
            draft.loading = false;
            draft.err = '';
            localStorage.setItem('access_token', payload.access_token);
            break;

        case actionUser.LOGIN_FAIL:
            draft.err = payload;
            draft.loading = false;
            
            break;
        case actionUser.LOGOUT:
            draft.access_token = '';
            draft.currentUser = {};
            draft.backUrl = '/';
            localStorage.removeItem('access_token');

        case actionUser.LOAD_APP:
            break;

        case actionUser.LOAD_APP_SUCCESS:
            draft.access_token = payload.access_token;
            draft.currentUser = payload.user;
            break;

         case actionUser.BACK_URL:
            draft.backUrl = payload.url;
            
            break;

        default:
            break;
    }

});

export default user;

