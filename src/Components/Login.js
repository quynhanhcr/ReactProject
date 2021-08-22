import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import users from '../Redux/actions';
import fb from '../Service/Fb';
import Swal from 'sweetalert2';

const schemaLogIn = yup.object().shape({
    
    userEmail: yup.string().required('Bắt buộc nhập thông tin!'),
    userPassword: yup.string().required('Bắt buộc nhập thông tin!')
});

const LogIn = () => {
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schemaLogIn)
    });

    const {err} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const submit = (data) => {
        dispatch(users.logIn(data));
    }

    const handleFbLogin = () => {
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
                    title: 'Đăng nhập Facebook',
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
            <form className="login" onSubmit={handleSubmit(submit)}>
                <p className="login__title">ĐĂNG NHẬP <br /><span className="login-edition">chào mừng bạn đến với A.Cinema</span></p>
                <div className="social social--colored">
                    <a href="#" className="social__variant fa fa-facebook" onClick={handleFbLogin}></a>
                    {/* <a href="#" className="social__variant fa fa-google"></a> */}
                </div>
                <p className="login__anotheroption"><i>hoặc</i></p>
                
                <div className="input-wrap">
                    {err !== '' && <div className="err-notice">Thông tin đăng nhập không đúng.</div>}
                    <Form.Control type='email' placeholder='Email' name='userEmail'
                        {...register('userEmail')}
                        isInvalid={!!errors?.userEmail}
                        className={"login__input"} />
                    <Form.Control.Feedback type="invalid">
                        {errors?.userEmail?.message}
                    </Form.Control.Feedback>

                    <Form.Control type='password' placeholder='Mật khẩu' name='userPassword'
                        {...register('userPassword')}
                        isInvalid={!!errors?.userPassword}
                        autoComplete="off" className="login__input" />
                    <Form.Control.Feedback type="invalid">
                        {errors?.userPassword?.message}
                    </Form.Control.Feedback>

                    <div className="login__check">
                        <input type='checkbox' id='#informed' />
                        <label className="login--checknote">Nhớ mật khẩu</label>
                    </div>
                </div>
                <div className="login__control">
                    <button type='submit' className="btn btn-md btn-warning btn-wider">Đăng nhập </button>
                    <div className="login-query">Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></div>
                </div>
            </form>
       </div>
    )
}
export default LogIn;