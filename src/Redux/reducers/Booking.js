import produce from "immer";
import { actionSeat } from "../actions";


const initialState ={
    unavailableSeat:[]
};

const booking = (state = initialState, action) =>produce(state, (draft) =>{
    const {type, payload} = action;
    switch (type) {
        case actionSeat.GET_UNAVAILABLE_SEAT:
            draft.unavailableSeat = payload;
            break;
    
        default:
            break;
    }
});

export default booking;