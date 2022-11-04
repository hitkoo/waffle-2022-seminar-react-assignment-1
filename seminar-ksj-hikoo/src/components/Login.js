import '../css/Login.css';
import React, { useState, useEffect } from 'react'
import Head from './Head';
import { useContext } from 'react';
import { IDContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';


function Login() {

    const navigate = useNavigate();
    const value = useContext(IDContext)
    const setLoginStatus = value.setLoginStatus
    const [inputs, setInputs] = useState({ ID: "", PW: "" });
    const changeInputs = (e) => {
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value });
    }

    const Login = () => {
        if (inputs.ID !== "" && inputs.PW !== "") {
            axios
                .post("https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/auth/login", {
                    username: inputs.ID,
                    password: inputs.PW
                }, {
                    withCredentials: true
                })
                .then((res) => {
                    const token = res.data.access_token;
                    setLoginStatus({ isLogin: true, LoginUser: res.data.owner.username, UserID:Number(res.data.owner.id), Token: token});
                    localStorage.setItem('login', JSON.stringify(res.data))
                    console.log('로그인');
                    navigate(-1);
                })
                .catch((error)=>{
                    toast.warn('아이디 혹은 비밀번호가 잘못됐습니다');
                });               
        }
        else {
            toast.warn('아이디와 비밀번호를 입력해주세요');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('login') !=  null) {
            toast.warn('이미 로그인 되어있습니다');
            navigate(`/`)
        }
    }, [])

    return (
        <div className='LoginWrap'>
            <Head />
            <div className='LoginContainer'>
                <div className='LoginBox'>
                    <div className='LoginTitle'>
                        <b>로그인</b>
                    </div>
                    <div className='LoginSubtitle'>
                        <div className='LoginLeft'>
                            <p className='Loginline'><span className='LoginIDPW'>ID</span>
                                <input className='LoginInput' name='ID' placeholder='아이디를 입력하세요.' onChange={changeInputs} ></input></p>
                            <p className='Loginline'><span className='LoginIDPW'>PASSWORD</span>
                                <input className='LoginInput' name='PW' placeholder='비밀번호를 입력하세요.' onChange={changeInputs}></input></p>
                        </div>
                        <div className='LoginRight'>
                            <button id='LoginButton' onClick={() => Login()}>로그인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;