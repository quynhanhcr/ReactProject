import { call, put, takeEvery, fork} from "@redux-saga/core/effects";
import { actionMovie } from "../actions";
import movies from "../../Service/Movies";

export function* fetchMovie(dispatchData){
    const { type } = dispatchData.payload;
    
    try {
        const resp = yield call(movies.getMovie, type);
        yield put ({type: actionMovie.GET_MOVIE_SUCCESS, payload:{
            type: type,
            movies: resp
        }})
    } catch (error) {
        yield put ({type: actionMovie.GET_MOVIE_FAIL, payload:error})
    }
}

export function* watchFetchMovie(){
    yield takeEvery(actionMovie.GET_MOVIE, fetchMovie)
}

export default function* reward(){
    yield fork(watchFetchMovie);
}