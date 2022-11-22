import './Login.scss';
import React, { useState, useEffect } from 'react'
import Head from '../Head/Head';
import { useContext } from 'react';
import { IDContext } from '../../App';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { IIDContext, IOwner } from '../../lib/Interface';


function Login() {

    const navigate:NavigateFunction = useNavigate();
    const value:IIDContext = useContext(IDContext)
    const setLoginStatus = value.setLoginStatus
    const [inputs, setInputs] = useState<{ID: string, PW: string}>({ ID: "", PW: "" });
    const changeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    const token:string = res.data.access_token;
                    const Login:IOwner = res.data.owner
                    setLoginStatus({ IsLogin: true, LoginUser: res.data.owner.username, UserID: res.data.owner.id, Token: token});
                    localStorage.setItem('login', JSON.stringify(Login))
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
    }, [navigate])

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
                            <p><span>ID</span>
                                <input name='ID' placeholder='아이디를 입력하세요.' onChange={changeInputs} ></input></p>
                            <p ><span>PASSWORD</span>
                                <input name='PW' placeholder='비밀번호를 입력하세요.' onChange={changeInputs}></input></p>
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