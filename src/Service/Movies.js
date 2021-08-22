import axios from 'axios';

const API_URL="https://quynhanh.tudomuaban.com/";

const getFoundMovie = (search)=>{
    return axios.get(`${API_URL}movies.php?search=${search}`).then(res => {
        if (res.status === 200){
          return res.data
        }
    })
};

const getMovie = (type)=>{
    return axios.get(`${API_URL}movies.php?type=${type}`).then(res => {
        if (res.status === 200){
          return res.data
        }
    })
};

const getMovieDetail = (id)=>{
    return axios.get(`${API_URL}movie-detail.php?id=${id}`).then(res => {
        if (res.status === 200){
          return res.data
        }
    })
};


export default {
    getMovie,
    getMovieDetail,
    getFoundMovie
};