import { useEffect, useState } from 'react';
import api from '../utils/api';
import { notify } from '../utils/notify';
import {
   Menu,
   MenuHandler,
   MenuList,
   MenuItem
} from '@material-tailwind/react';

import { AiOutlineDelete } from 'react-icons/ai';
import { Bars } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const User = () => {
   const [userinfo, setUserInfo] = useState([]);

   const [isLoading, setLoading] = useState(false);

   const [date, setDate] = useState(new Date());

   const updateExpired = async (index, email) => {
      if(window.confirm(('Do you want to update expired day?'))) {
         const body = {
            expired: date,
            email: email
         }

         try {
            const res = await api.post('/users/update_expired', body);

            if (res) {
               let _userinfo = [...userinfo];

               _userinfo[index].expired = date;
               setUserInfo(_userinfo);
            }
         } catch(err) {
            notify('error', 'Network Errors');
         }
      } else {
         notify('info', 'Action Cancelled')
      }
   };
   const handleCalendarOpen = () => console.log("Calendar opened");

   useEffect(() => {
      const getData = async () => {
         setLoading(true);

         const res = await api.get('/users/all');
         const data = await res.data;
         setUserInfo(data);

         setLoading(false);
      }

      getData();
   }, []);

   const upgradeMembership = async (index, membership, email) => {
      if(window.confirm(('Do you want to upgrade this membership?'))) {
         const body = {
            membership : membership,
            email: email
         }

         try {
            const res = await api.post('/users/upgrade_membership', body);

            if (res) {
               let _userinfo = [...userinfo];

               _userinfo[index].membership = membership;
               setUserInfo(_userinfo);
            }
         } catch(err) {
            notify('error', 'Network Errors');
         }
      } else {
         notify('info', 'Action Cancelled')
      }
   }

   const deleteUser = async (index, email) => {
      if(window.confirm(('Do you want to delete this token list?'))) {
         const body = {
            email: email
         }

         try {
            const res = await api.post('/users/delete', body);

            if (res) {
               let _userinfo = [...userinfo];

               _userinfo.splice(index, 1);
               setUserInfo(_userinfo);
            }
         } catch(err) {
            notify('error', 'Network Errors');
         }
      } else {
         notify('info', 'Action Cancelled')
      }
   }

   return (
      <div className='max-w-[1600px] m-auto pt-20'>
         <div className='flex justify-center'>
            <p className='text-3xl font-bold'><span className='text-orange-500'>USERS</span></p>
         </div>

         <div className='my-10 shadow-lg '>
            <table className='pricing w-full text-center rounded-3xl '>
                  <thead className='bg-[#F0F0F2]'>
                     <tr>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>COUNTRY</th>
                        {/* <th>PASSWORD</th> */}
                        <th>ADDED</th>
                        <th>MEMBERSHIP EXPIRED</th>
                        <th>NEW MEMBERSHIP</th>
                        <th>MEMBERSHIP</th>
                        <th>OPERATION</th>
                     </tr>
                  </thead>
                  <tbody>
                  { isLoading && isLoading === true ? (
                     <tr>
                        <td colSpan={8} className='text-center w-full'>
                           <div className='m-auto w-max'>
                              <Bars heigth='100' width='100' color='orange' ariaLabel='loading-indicator' />
                           </div>
                        </td>
                     </tr>) : ''
                  }
                  { userinfo && userinfo.map((item, index) =>
                     <tr key={ index } className='border-b font-medium items-center'>
                        <td>{ item.name }</td>
                        <td><p>{ item.email }</p></td>
                        <td>{ item.country }</td>
                        {/* <td>{ item.password }</td> */}
                        <td>{ String(item.date).slice(0, 10) }</td>
                        <td>{ String(item.expired).slice(0, 10) }</td>
                        <td>
                           <DatePicker
                              selected={date}
                              onChange={(date) => setDate(date)}
                              onCalendarClose={() => updateExpired(index, item.email)}
                              onCalendarOpen={handleCalendarOpen}
                              dateFormat='yyyy-MM-dd'
                           />
                        </td>
                        <td>
                        { item.membership === 0 ?
                           <Menu>
                              <MenuHandler>
                                 <button
                                    className='bg-slate-500 hover:bg-slate-700 px-1 py-1 w-max rounded text-white'
                                 >
                                    No Membership
                                 </button>
                              </MenuHandler>
                              <MenuList>
                                 <MenuItem className='mt-2 mb-2'>
                                    <button
                                       className='bg-green-500 hover:bg-green-700 px-10 py-1 w-max rounded m-auto text-white'
                                       onClick={() => upgradeMembership(index, 1, item.email)}
                                    >
                                       Stater
                                    </button>
                                 </MenuItem>
                                 <MenuItem className='mt-2 mb-2'>
                                    <button
                                       className='bg-yellow-500 hover:bg-yellow-700 px-7 py-1 w-max rounded m-auto text-white'
                                       onClick={() => upgradeMembership(index, 2, item.email)}
                                    >
                                       Premium
                                    </button>
                                 </MenuItem>
                              </MenuList>
                           </Menu> :
                        item.membership === 1 ?
                           <Menu>
                              <MenuHandler>
                                 <button
                                       className='bg-green-500 hover:bg-green-700 px-10 py-1 w-max rounded m-auto text-white'
                                    >
                                       Stater
                                 </button>
                              </MenuHandler>
                              <MenuList>
                                 <MenuItem className='mt-2 mb-2'>
                                    <button
                                       className='bg-slate-500 hover:bg-slate-700 px-1 py-1 w-max rounded text-white'
                                       onClick={() => upgradeMembership(index, 0, item.email)}
                                    >
                                       No Membership
                                    </button>
                                 </MenuItem>
                                 <MenuItem className='mt-2 mb-2'>
                                    <button
                                       className='bg-yellow-500 hover:bg-yellow-700 px-7 py-1 w-max rounded m-auto text-white'
                                       onClick={() => upgradeMembership(index, 2, item.email)}
                                    >
                                       Premium
                                    </button>
                                 </MenuItem>
                              </MenuList>
                           </Menu> :
                           <Menu>
                              <MenuHandler>
                                 <button
                                    className='bg-yellow-500 hover:bg-yellow-700 px-7 py-1 w-max rounded m-auto text-white'
                                 >
                                    Premium
                                 </button>
                              </MenuHandler>
                              <MenuList>
                                 <MenuItem className='mt-2 mb-2'>
                                    <button
                                       className='bg-slate-500 hover:bg-slate-700 px-1 py-1 w-max rounded text-white'
                                       onClick={() => upgradeMembership(index, 0, item.email)}
                                    >
                                       No Membership
                                    </button>
                                 </MenuItem>
                                 <MenuItem className='mt-2 mb-2'>
                                    <button
                                          className='bg-green-500 hover:bg-green-700 px-10 py-1 w-max rounded m-auto text-white'
                                          onClick={() => upgradeMembership(index, 1, item.email)}
                                       >
                                          Stater
                                    </button>
                                 </MenuItem>
                              </MenuList>
                           </Menu>
                        }
                        </td>
                        <td>
                           <button
                              className='flex bg-red-500 hover:bg-red-700 px-2 py-1 w-25 rounded m-auto text-white'
                              onClick={() => deleteUser(index, item.email)}
                           >
                              <span className='text-md mt-1 mr-1'><AiOutlineDelete /></span>Delete
                           </button>
                        </td>
                     </tr>
                  )}
                  </tbody>
            </table>
         </div>
      </div>
   );
}

export default User;