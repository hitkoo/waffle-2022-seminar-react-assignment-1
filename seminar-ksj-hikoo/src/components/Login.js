import '../css/Login.css';
import React from 'react'




function Login() {

    return (
        <div className='LoginContainer'>
            <div className='LoginTitle'>
                <b>로그인</b>
            </div>
            <div>
                <div>
                    <p className='Loginline'><b className='LoginSubtitle'>ID</b>
                        <input className='LoginInput'></input></p>
                    <p className='Loginline'><b className='LoginSubtitle'>PASSWORD</b>
                        <input className='LoginInput'></input></p>
                </div>
                <div className='LoginRight'>
                    <button ID='LoginButton'>로그인</button>
                </div>
            </div>
        </div>
    );
}

export default Login;