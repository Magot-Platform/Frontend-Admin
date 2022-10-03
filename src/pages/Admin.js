import { useEffect, useState } from 'react';
import api from '../utils/api';
import { notify } from '../utils/notify';

import { TbTrashX } from 'react-icons/tb';
import { FiEdit, FiSave } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { Bars } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Admin = () => {
   const [adminInfo, setAdminInfo] = useState([]);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [isEditable, setEditable] = useState([false]);

   const [isLoading, setLoading] = useState(false);

   useEffect(() => {
      const getData = async () => {
         setLoading(true);

         const res = await api.get('/admins/all');
         const data = await res.data;
         setAdminInfo(data);

         setLoading(false);
      }

      getData();
   }, []);

   const deleteAdmin = async (index, email) => {
      if(window.confirm(('Do you want to delete this token list?'))) {
         const body = {
            email: email
         }

         try {
            const res = await api.post('/admins/delete', body);

            if (res) {
               let _adminInfo = [...adminInfo];

               _adminInfo.splice(index, 1);
               setAdminInfo(_adminInfo);
            }
         } catch(err) {
            notify('error', 'Network Errors');
         }
      } else {
         notify('info', 'Action Cancelled')
      }
   }

   const edit = index => {
      setName(adminInfo[index].name);
      setEmail(adminInfo[index].email);
      let _isEditable = [...isEditable];
      _isEditable[index] = true;
      setEditable(_isEditable);
   }

   const cancel = index => {
      let _isEditable = [...isEditable];
      _isEditable[index] = false;
      setEditable(_isEditable);
   }

   const updateAdminInfo = async (index, mail) => {

      if(window.confirm(('Will you update this information?'))) {
         const body = {
            oldemail: mail,
            email: email,
            name: name,
         }

         try {
            const res = await api.post('/admins/update', body);

            if (res) {
               let _adminInfo = [...adminInfo];
               _adminInfo[index].name = name;
               _adminInfo[index].email = email;
               setAdminInfo(_adminInfo)

               cancel(index);
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
            <p className='text-3xl font-bold'><span className='text-orange-500'>ADMINS</span></p>
         </div>

         <div className='my-10 shadow-lg '>
            <table className='pricing w-full text-center rounded-3xl '>
               <thead className='bg-[#F0F0F2]'>
                  <tr>
                     <th>ADDED</th>
                     <th>NAME</th>
                     <th>EMAIL</th>
                     {/* <th>PASSWORD</th> */}
                     <th>OPERATION</th>
                  </tr>
               </thead>
               <tbody>
               { isLoading && isLoading === true ? (
                  <tr>
                     <td colSpan={4} className='text-center w-full'>
                        <div className='m-auto w-max'>
                           <Bars height='100' width='100' color='orange' ariaLabel='loading-indicator' />
                        </div>
                     </td>
                  </tr>) : ''
               }
               { adminInfo && adminInfo.length > 0 ?
                  adminInfo.map((item, index) =>
                  <tr key={ index } className='border-b font-medium items-center'>
                     <td>{ String(item.date).slice(0, 10) }</td>
                     <td>
                        {isEditable[index] !== true ? item.name :
                        <input className='bg-slate-200 p-1 rounded border-none'
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        /> }
                     </td>
                     <td>
                        {isEditable[index] !== true ? item.email :
                        <input className='bg-slate-200 p-1 rounded border-none'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        /> }
                     </td>
                     {/* <td>{ item.password }</td> */}
                     <td className='flex'>
                        {isEditable[index] !== true ? <>
                           <button
                           className='flex px-2 py-1 rounded m-auto text-slate-800 hover:text-slate-500 items-center text-xl'
                           onClick={() => edit(index)}
                        >
                           <span className='mt-1 mr-1'><FiEdit /></span>
                        </button>
                        <button
                           className='flex px-2 py-1 rounded m-auto text-slate-800 hover:text-slate-500 items-center text-xl'
                           onClick={() => deleteAdmin(index, item.email)}
                        >
                           <span className='mt-1 mr-1'><TbTrashX /></span>
                        </button>
                        </> : <><button
                           className='flex px-2 py-1 rounded m-auto text-slate-800 hover:text-slate-500 items-center text-xl'
                           onClick={() => updateAdminInfo(index, item.email)}
                        >
                           <span className='mt-1 mr-1'><FiSave /></span>
                        </button>
                        <button
                           className='flex px-2 py-1 rounded m-auto text-slate-800 hover:text-slate-500 items-center text-xl'
                           onClick={() => cancel(index)}
                        >
                           <span className='mt-1 mr-1'><MdOutlineCancel /></span>
                        </button></>}
                     </td>
                  </tr>
                  ) : ( !isLoading && (
                  <tr>
                     <td colSpan={4} className='text-center w-full'>
                        <span className='font-bold text-xl'>There are no results</span>
                     </td>
                  </tr>)
               )}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default Admin;