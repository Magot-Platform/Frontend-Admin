import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/auth';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem
} from '@material-tailwind/react';
import { FaRegUserCircle } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, logout, admin }) => {

    let navigate = useNavigate();

    const [isShow, toggleModal] = useState(false);

    const onLogout = async () => {
        await logout();

        navigate('/');
    }
    
    return (
        <div className='bg-white py-3 z-20 border-b border-black' >
            <div className='n-container'>
                <div className='flex justify-between items-center'>
                    <Link to={'/'}>
                        <div className='flex items-center gap-2'>
                            <img src='/logo.png' alt='logo' className='h-12 sm:h-16' />
                        </div>
                    </Link>
                    
                    <div className='hidden sm:flex items-center gap-5'>
                        <Menu>
                            <MenuHandler>
                                <button 
                                    className='flex justfy-between py-2 px-5 rounded text-black font-bold hover:text-slate-500'>Users
                                </button>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem><Link 
                                    to={`/admin`}
                                    className='flex justfy-between text-slate-800 hover:text-slate-400 px-5 py-2 rounded font-bold'
                                >
                                    <p>Admins</p>
                                </Link></MenuItem>
                                <MenuItem><Link 
                                    to={`/user`}
                                    className='flex justfy-between text-slate-800 hover:text-slate-400 px-5 py-2 rounded font-bold'
                                >
                                    <p>Users</p>
                                </Link></MenuItem>
                            </MenuList>
                        </Menu>
                        
                        <Link to='/token' className='font-bold text-slate-800 hover:text-slate-400'><p>Tokens</p></Link>
                        { isAuthenticated && isAuthenticated === true ? 
                        (<Menu>
                            <MenuHandler>
                                <button 
                                    className='flex justfy-between bg-white text-[#D6800C] rounded py-2 px-5 font-bold hover:border-white'><span className='mt-1 mr-2'><FaRegUserCircle /></span>{admin && admin.name}</button>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem className='mt-2 mb-2'><button 
                                    className='bg-yellow-700 hover:bg-yellow-500 py-2 px-5 rounded text-white font-bold'
                                    onClick={onLogout}
                                >
                                    <p>LOG OUT</p>
                                </button></MenuItem>
                            </MenuList>
                        </Menu>) :
                        (<Link 
                            to='/login' 
                            className='border border-[#D6800C] bg-white text-[#D6800C] rounded py-2 px-5 font-bold hover:bg-yellow-500 hover:border-white'
                        >
                            <p>Login</p>
                        </Link>)}
                    </div>
                    
                </div>
            </div>
                
            <div className={`${ isShow ? '' : 'hidden' } bg-white absolute left-0 top-0 h-screen w-full`}>
                <p className='none sm:hidden text-black text-right pointer m-5 mt-6' onClick={() => toggleModal(false)} >&#9776;</p>

                <div className='text-black text-lg text-center mt-12'>
                    <Link className='mt-5' to='/stakingReward' ><p>User</p></Link>
                    <Link className='mt-5' to='/providers' ><p>Token</p></Link>
                    <Link className='mt-5' to='/calculator' ><p>Login</p></Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    admin: state.auth.admin
});

export default connect(mapStateToProps, { logout })(Navbar);