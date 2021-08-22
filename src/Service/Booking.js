import axios from 'axios';


const API_URL = "https://quynhanh.tudomuaban.com/booking.php";

const getOrderedSeat = (params)=>{
    return axios.get(API_URL, {
        params: {
            movie_id: params.movie.id,
            date: params.orderedDate + " " + params.orderedTime +":00"
        },
        headers:{
            "X-Authorization": "Bearer " + params.access_token
        }
    }).then(res =>{
        if (res.status === 200){
            return res.data;
        }
    })
};

const createBooking = (params, params2)=>{
    const postParams = {
        movie_id: params.movie.id,
        date: params.orderedDate + " " + params.orderedTime +":00",
        seat_codes: params2
    };
    const postConfig = {
        headers:{
            "X-Authorization": "Bearer " + params.access_token
        }
    };
    return axios.post(API_URL, postParams, postConfig).then(res => {
        if (res.status === 200){
            return res.data
        }
    })
}

export default {
    getOrderedSeat,
    createBooking
}
