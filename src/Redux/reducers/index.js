import { combineReducers } from "redux";
import seat from './Seat';
import movie from './Movie';
import user from './User';
import booking from './Booking';

const rootReducer = combineReducers({
    seat,
    movie,
    user,
    booking
});

export default rootReducer;