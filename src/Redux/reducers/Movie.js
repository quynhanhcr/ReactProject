import {actionMovie} from '../actions';

const initialState = {
    arrHotMovie : [],
    arrReadyMovie: [],
    arrComingSoonMovie: [],
    err: '',
    loading: false,
    orderedMovie:{}
};

const movie = (state =initialState, action)=>{
    const {type, payload} = action;
    switch (type) {
        case actionMovie.GET_MOVIE:
            return {...state, loading: true};
        case actionMovie.GET_MOVIE_SUCCESS:
            if(payload.type === 'hot'){
                return {...state, loading: false, arrHotMovie : payload.movies};
            }
            if(payload.type === 'coming_soon'){
                return {...state, loading: false, arrComingSoonMovie : payload.movies};

            }else{
                return {...state, loading: false, arrReadyMovie : payload.movies};
            }
            
            
        case actionMovie.GET_MOVIE_FAIL:
            return {...state, loading: false, err: payload}

        case actionMovie.GET_ORDERED_MOVIE:
            return {...state, orderedMovie: payload}
            
        default:
            return state
    }
};
export default movie;