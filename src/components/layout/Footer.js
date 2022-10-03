import { FaYoutube, FaTwitter, FaTelegram } from 'react-icons/fa';
import './footer.css';

const Footer = () => {

    return (
        <div className='footer' style={{background: 'linear-gradient(180deg, #010101 0%, #2F2B27 100%)'}}>

            <div className='n-container'>
                {/*<div className='py-20 sm:flex justify-between gap-5'>
                    <div>
                        <img src='/img/logo.png' alt='' />
                        <p className='footer_text max-w-[300px] mt-5'>Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry.</p>
                    </div>

                    <div className='mt-3'>
                        <h1 className='footer_title '>Quick Links</h1>

                        <div className='mt-5'>
                            <p className='footer_text'>- Home</p>
                            <p className='footer_text'>- Swap</p>
                            <p className='footer_text'>- Liquidity</p>
                            <p className='footer_text'>- Farms</p>
                            <p className='footer_text'>- Pools</p>
                        </div>
                    </div>

                    <div className='mt-3'>
                        <h1 className='footer_title'>Help</h1>

                        <div className='mt-5'>
                            <p className='footer_text'>- Support</p>
                            <p className='footer_text'>- Teams & Conditions</p>
                            <p className='footer_text'>- Privacy Policy</p>
                        </div>
                    </div>

                    <div className='mt-3'>
                        <h1 className='footer_title'>Newsletter</h1>

                        <div className='mt-5'>
                            <p className='footer_text'>Duis aute irure dolor in reprehen derit in velit.</p>
                        </div>

                        <div className='flex items-center mt-5'>
                            <input
                                type='text'
                                className='bg-[#263240] border border-[#CACACA] rounded-3xl px-3 py-1 text-white w-full'
                                placeholder='Enter email address'
                            />

                            <img src='/img/mail.png' style={{marginLeft: '-40px'}} alt='' />
                        </div>
                    </div>

                    <div className='mt-3'>
                        <h1 className='footer_title '>Social</h1>

                        <div className='mt-5 font-[Poppins]'>
                            <a href='https://www.youtube.com/channel/UCiwByY5g0G-Qj_ENgJdEfUQ' className='footer_text flex hover:text-slate-400'>
                                <FaYoutube className='mt-1'/>&nbsp;Youtube
                            </a>
                            <a href='https://twitter.com/CryptoMagot' className='footer_text flex hover:text-slate-400'><FaTwitter className='mt-1'/>&nbsp;Twitter</a>
                            <a href='https://t.me/MagotEnglish' className='footer_text flex hover:text-slate-400'><FaTelegram className='mt-1'/>&nbsp;Telegram</a>
                        </div>
                    </div>
                </div>*/}

                <div className='py-4 sm:flex justify-center items-center'>
                    <p className='mt-2 text-white'>
                        Designed & Developed by{' '}
                        <a
                            href='https://raylancer.co'
                            className='text-decoration-none'
                            target='_blank'
                            rel='noreferrer'
                            style={{ color: '#CA9E67' }}
                        >
                            raylancer.co
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
