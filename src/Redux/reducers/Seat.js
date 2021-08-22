import {actionSeat} from '../actions';


const innitialState = {
    arrSeat: [],
    arrType: [],
    arrPrice: []
};

const seat = (state = innitialState, action)=>{
    const {type, payload} = action;
    
    switch (type) {
        case actionSeat.ADD_SEAT:
        {
            let draft = {...state};
            draft.arrSeat.push(payload.selectedSeat);
            draft.arrPrice.push(payload.seatPrice);
            return draft;
        }
    
        case actionSeat.DELETE_SEAT:
        {
            let draft = {...state};
            const index = draft.arrSeat.indexOf(payload.deletedSeat);
            if (index > -1){
                draft.arrSeat.splice(index,1);
                draft.arrPrice.splice(index,1);
            }
            return draft;
        }
        case actionSeat.RESET_SEAT:
            {
                let draft = {...state};
                draft.arrSeat=[];
                draft.arrPrice=[];
                draft.arrType=[];
                return draft;
            }
        default:
            return state;
            
    }
};

export default seat;

