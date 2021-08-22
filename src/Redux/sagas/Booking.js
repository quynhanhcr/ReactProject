import { call, put, takeLatest, fork} from "@redux-saga/core/effects";
import booking from '../../Service/Booking';
import { actionMovie, actionSeat } from "../actions";


export function* getOrderedSeat(dispatchData){
    const {payload} = dispatchData;
   
    try {
        const resp = yield call(booking.getOrderedSeat, payload);
        yield put({type: actionSeat.GET_UNAVAILABLE_SEAT, payload: resp.seat_codes})
    } catch (error) {
        yield put({type: actionSeat.GET_UNAVAILABLE_SEAT_FAIL, payload: error})
    }
}

export function* watchGetOrderedSeat(){
    yield takeLatest(actionMovie.GET_ORDERED_MOVIE, getOrderedSeat)
}


export default function* reward(){
    yield fork(watchGetOrderedSeat);
}