import '../css/Login.css';
import React, { useState, useEffect } from 'react'
import Head from './Head';
import { useContext } from 'react';
import { IDContext } from '../App';
import { useNavigate } from 'react-router-dom';



function Login() {

    const navigate = useNavigate();
    const value = useContext(IDContext)
    const LoginStatus = value.LoginStatus
    const setLoginStatus = value.setLoginStatus
    const [inputs, setInputs] = useState({ ID: "", PW: "" });
    const changeInputs = (e) => {
        const {name, value} = e.target
        setInputs({ ...inputs, [name]: value });
    }

    const Login = () => {
        if (inputs.ID !== "" && inputs.PW !== "") {
            setLoginStatus({isLogin : true, LoginID : inputs.ID, LoginPW: inputs.PW});
            navigate(-1);
        }
        else {
            alert("아이디와 비밀번호를 입력하세요")
        }
    }

    useEffect(() => {
        if (LoginStatus.LoginID) {
            alert("로그인 되어있습니다.")
            navigate(-1)
        }
    },[])

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
                            <button ID='LoginButton' onClick={() => Login()}>로그인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;