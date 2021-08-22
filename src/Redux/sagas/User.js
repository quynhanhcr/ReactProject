import { call, put, fork, takeLatest } from "@redux-saga/core/effects";
import users from '../../Service/User';
import { actionUser } from "../actions";

export function* fetchUserFb(dispatchData) {

    try {
        const resp = yield call(users.logInFb, dispatchData.payload);

        if (resp.success) {

            const resp2 = yield call(users.currentUser, resp.access_token);
            yield put({ type: actionUser.GET_CURRENT_USER, payload: resp2 })

            yield put({ type: actionUser.LOGIN_SUCCESS, payload: resp });


        } else {
            yield put({ type: actionUser.LOGIN_FAIL, payload: resp })
        }

    } catch (error) {
        yield put({ type: actionUser.LOGIN_FAIL, payload: error })
    }
}

export function* fetchUser(dispatchData) {
    const { userEmail, userPassword } = dispatchData.payload;

    try {
        const resp = yield call(users.logIn, userEmail, userPassword);

        if (resp.success) {

            const resp2 = yield call(users.currentUser, resp.access_token);
            yield put({ type: actionUser.GET_CURRENT_USER, payload: resp2 })

            yield put({ type: actionUser.LOGIN_SUCCESS, payload: resp });


        } else {
            yield put({ type: actionUser.LOGIN_FAIL, payload: resp })
        }

    } catch (error) {
        yield put({ type: actionUser.LOGIN_FAIL, payload: error })
    }
}

export function* watchFetchUser() {
    yield takeLatest(actionUser.LOGIN, fetchUser)
}

export function* watchFetchUserFb() {
    yield takeLatest(actionUser.LOGIN_FB, fetchUserFb);
}

export function* fetchApp(){
    try {
        const accessToken = localStorage.getItem('access_token');
           
        if(accessToken){
            const resp = yield call(users.currentUser, accessToken);

            yield put({ type: actionUser.LOAD_APP_SUCCESS, payload: {
                user: resp.user,
                access_token: accessToken
            } });
        }

    } catch (error) {
        
    }
}

export function* watchFetchApp() {
    yield takeLatest(actionUser.LOAD_APP, fetchApp)
}

export default function* reward() {
    yield fork(watchFetchUser);
    yield fork(watchFetchUserFb);
    yield fork(watchFetchApp);
}

