import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ isAuthenticated, admin }) => {
   let navigate = useNavigate();

   useEffect(() => {
      if ( isAuthenticated ) {

      } else {
         navigate('/login');
      }
   }, []);

   return (
      <>
         <div className='search_bg h-screen'>
            <div className='bg-black/50'>
            </div>
         </div>
      </>
   );
}

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   admin: state.auth.admin
});

export default connect(mapStateToProps)(Home);
