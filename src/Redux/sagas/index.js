import { fork} from 'redux-saga/effects';
import movies from './Movie';
import users from './User';
import booking from './Booking'

export default function* rootSaga(){
    yield fork(movies)
    yield fork(users)
    yield fork (booking)
}
