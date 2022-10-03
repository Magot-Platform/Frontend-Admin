import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../actions/auth';
import { notify } from '../utils/notify';

function Login({ login }) {

    let navigate = useNavigate();

    const [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const onLogin = async (e) => {
        const res = await login(email, password);

        notify(res.type, res.msg);

        if(res.type === 'success') {
            navigate('/');
        }
    };

    return (
        <div className='login_bg'>
            <div className='bg-white/5 w-full h-full flex justify-center pt-32'>
                <div>
                    <img src='/img/logo.png' className='w-16 h-20 m-auto' alt='' />

                    <div className='bg-white rounded-3xl p-10 mt-10 w-[500px]'>
                        <p className='text-2xl font-medium text-center'>Admin Magot</p>
                        <div className='mt-4'>
                            <p className='font-medium text-gray-400'>Email</p>
                            <input
                                type={'text'}
                                placeholder='Your email'
                                className='w-full p-2 outline-0 border border-gray-200'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mt-4'>
                            <p className='font-medium text-gray-400'>Password</p>
                            <input
                                type={'password'}
                                placeholder='****'
                                className='w-full p-2 outline-0 border border-gray-200'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='mt-5'>
                            <button
                                className='w-full py-2 bg-yellow-500 hover:bg-yellow-700 font-medium text-white'
                                onClick={onLogin}
                            >
                                Login
                            </button>
                            <Link to='/signup'><p className='text-[#DC9217] text-center mt-5 cursor-pointer'>Don't Have Account? <b>Register</b></p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);