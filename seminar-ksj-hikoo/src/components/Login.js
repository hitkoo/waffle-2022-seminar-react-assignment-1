import '../css/Login.css';
import React from 'react'
import Head from './Head';





function Login() {

    return (
        <div className='LoginWrap'>
            <Head/>
            <div className='LoginContainer'>
                <div className='LoginBox'>
                    <div className='LoginTitle'>
                        <b>로그인</b>
                    </div>
                    <div className='LoginSubtitle'>
                        <div className='LoginLeft'>
                            <p className='Loginline'><span className='LoginIDPW'>ID</span>
                                <input className='LoginInput' placeholder='아이디를 입력하세요.'></input></p>
                            <p className='Loginline'><span className='LoginIDPW'>PASSWORD</span>
                                <input className='LoginInput' placeholder='비밀번호를 입력하세요.'></input></p>
                        </div>
                        <div className='LoginRight'>
                            <button ID='LoginButton'>로그인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;