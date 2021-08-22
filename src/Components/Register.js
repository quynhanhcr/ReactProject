import React, {useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import userService from '../Service/User';
import { useDispatch} from 'react-redux';
import users from '../Redux/actions';
import fb from '../Service/Fb';

const schemaRegister = yup.object().shape({
    name: yup.string().required('Bắt buộc nhập thông tin!'),
    userEmail: yup.string().required('Bắt buộc nhập thông tin!'),
    userPassword: yup.string().required('Bắt buộc nhập thông tin!'),
    userRePassword: yup.string().oneOf([yup.ref('userPassword'), null], 'Mật khẩu phải giống nhau.')
});

const Register = () => {

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schemaRegister)
    });
    const [show, setShow]= useState(false);

    const history = useHistory();

    const submit = (data) => {
        userService.registerUser(data)
            .then((resp) => {
               
                if(resp.success) {
                    Swal.fire({
                        title: 'Đăng ký thành công!',
                        icon: 'success',
                        confirmButtonText: 'Đăng nhập ngay'
                    })
                    .then(()=>history.push("/log-in"));
                }else {
                    setShow(true)
                }  
            });
    }; 
    const dispatch = useDispatch();
    
    const handleFbRegister = () => {
        window.FB.login(function(response) {
 
             if (response.authResponse) {
 
                 window.FB.api('/me', function(profile) {
 
                     dispatch(users.logInFb({
                         id: profile.id,
                         name: profile.name,
                         accessToken: response.authResponse.accessToken
                     }));
                 });
 
             } else {
                 Swal.fire({
                     title: 'Đăng ký Facebook',
                     text: 'Không thành công, hãy thử lại',
                     icon: 'error',
                     confirmButtonText: 'OK'
                 });
             }
         });
     };
 
     useEffect(() => {
         fb.initFb();
     }, []);

    return (
        <div>
            <form className="register" onSubmit={handleSubmit(submit)}>
                <p className="register__title">ĐĂNG KÝ <br /><span className="register-edition">chào mừng bạn đến với A.Cinema</span></p>
                <div className="social social--colored">
                    <a href="#" className="social__variant fa fa-facebook" onClick={handleFbRegister}></a>
                </div>
                <p className="register__anotheroption"><i>hoặc</i></p>
                <div className="input-wrap">
                    {show && <div className="err-notice">Email đã tồn tại!</div>}
                    <Form.Control type='text' placeholder='Username' name='name'
                        {...register('name')}
                        isInvalid={!!errors?.name}
                        className={"register__input"} />
                    <Form.Control.Feedback type="invalid">
                        {errors?.name?.message}
                    </Form.Control.Feedback>

                    <Form.Control type='email' placeholder='Email' name='userEmail'
                        {...register('userEmail')}
                        isInvalid={!!errors?.userEmail}
                        className={"register__input"} />
                    <Form.Control.Feedback type="invalid">
                        {errors?.userEmail?.message}
                    </Form.Control.Feedback>

                    <Form.Control type='password' placeholder='Mật khẩu' name='userPassword'
                        {...register('userPassword')}
                        isInvalid={!!errors?.userPassword}
                        autoComplete="off" className="register__input" />
                    <Form.Control.Feedback type="invalid">
                        {errors?.userPassword?.message}
                    </Form.Control.Feedback>
                    <Form.Control type='password' placeholder='Xác nhận lại mật khẩu' name='userRePassword'
                        {...register('userRePassword')}
                        isInvalid={!!errors?.userRePassword}
                        autoComplete="off" className="register__input" />
                    <Form.Control.Feedback type="invalid">
                        {errors?.userRePassword?.message}
                    </Form.Control.Feedback>

                </div>
                <div className="register__control">
                    <button type='submit' className="btn btn-md btn-warning btn-wider">Đăng ký</button>
                    <div className="login-query">Bạn đã có tài khoản? <Link to="/log-in">Đăng nhập</Link></div>
                </div>
            </form>
        </div>
    )
}
export default Register;