import axios from "axios";

const API_URL = "https://quynhanh.tudomuaban.com/";

const logInFb = (data)=>{
  return axios.post(`${API_URL}login-fb.php`, data).then(res =>{
    if (res.status === 200){
      return res.data
    }
  })
};

const logIn = (dispatchData, dispatchData2)=>{
  return axios.post(`${API_URL}login.php`, {
    email: dispatchData,
    password: dispatchData2
  }).then(res =>{
    if (res.status === 200){
      return res.data
    }
  })
};

const registerUser = (params)=>{
  return axios.post(`${API_URL}register.php`, {
    email: params.userEmail,
    password:params.userPassword,
    name: params.name
  }).then(res =>{
    if (res.status === 200){
      return res.data
    }
  })
}

//current User
const API_URL2 = "https://quynhanh.tudomuaban.com/current-user.php";
const currentUser = (params)=>{
  
    return axios.get(API_URL2, {  
      headers: {
        "X-Authorization": "Bearer " + params
      }
    }).then(res =>{
      if (res.status === 200){
        return res.data
      }
    })
};


export default {
  logIn,
  logInFb,
  currentUser,
  registerUser 
}