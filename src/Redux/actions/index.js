export const actionSeat = Object.freeze({
    ADD_SEAT: 'ADD_SEAT',
    DELETE_SEAT: 'DELETE_SEAT',
    GET_UNAVAILABLE_SEAT: 'GET_UNAVAILABLE_SEAT',
    GET_UNAVAILABLE_SEAT_FAIL: 'GET_UNAVAILABLE_SEAT_FAIL',
    RESET_SEAT: 'RESET_SEAT'
});


const addSeat = (params) => ({
    type: actionSeat.ADD_SEAT,
    payload: params
});

const deleteSeat = (params)=>({
    type: actionSeat.DELETE_SEAT,
    payload: params
});

const getAvailableSeat = (params)=>({
    type:actionSeat.UNAVAILABLE_SEAT,
    payload: params
});

const resetSeat =()=>({
    type: actionSeat.RESET_SEAT
})

//action for Movies
export const actionMovie = Object.freeze({
    GET_MOVIE: 'GET_MOVIE',
    GET_MOVIE_SUCCESS: 'GET_MOVIE_SUCCESS',
    GET_MOVIE_FAIL: 'GET_MOVIE_FAIL',
    GET_ORDERED_MOVIE: 'GET_ORDERED_MOVIE'
});
const getMovie = (params)=>({
    type: actionMovie.GET_MOVIE,
    payload: params
});
const getOrderedMovie = (params) =>({
    type: actionMovie.GET_ORDERED_MOVIE,
    payload: params
})

// action for user:
export const actionUser = Object.freeze({
    LOGIN: 'LOGIN',
    LOGIN_FB: 'LOGIN_FB',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    GET_CURRENT_USER: "GET_CURRENT_USER",
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAIL: 'REGISTER_FAIL',
    LOAD_APP: 'LOAD_APP',
    LOAD_APP_SUCCESS: 'LOAD_APP_SUCCESS',
    BACK_URL: 'BACK_URL'
});
const logIn = (params)=>({
    type: actionUser.LOGIN,
    payload: params

});

const logInFb = (params)=>({
    type: actionUser.LOGIN_FB,
    payload: params

});

const register = (params)=>({
    type: actionUser.REGISTER,
    payload: params
});

const logOut = ()=>({
    type: actionUser.LOGOUT
});

const loadApp = ()=>({
    type: actionUser.LOAD_APP
});

const backUrl = (params)=>({
    type: actionUser.BACK_URL,
    payload: params
});



export default {
    addSeat,
    deleteSeat,
    resetSeat,
    getMovie,
    getOrderedMovie,
    logIn,
    logInFb,
    logOut,
    register,
    loadApp,
    getAvailableSeat,
    backUrl
};