import { useEffect, useState } from 'react';
import api from '../utils/api';
import { notify } from '../utils/notify';

import { TbTrashX } from 'react-icons/tb';
import { FiEdit, FiSave } from 'react-icons/fi';
import { MdOutlineCancel } from 'react-icons/md';
import { Bars } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const TokenList = () => {
   const [tokenInfo, setTokenInfo] = useState([]);
   const [isEditable, setEditable] = useState([false]);
   const [tokenAddress, setTokenAddress] = useState('');
   const [tokenName, setTokenName] = useState('');
   const [tokenSymbol, setTokenSymbol] = useState('');
   const [chain, setChain] = useState('');
   const [website, setWebsite] = useState('');
   const [telegram, setTelegram] = useState('');

   const [isLoading, setLoading] = useState(false);

   useEffect(() => {
      const getData = async () => {
         setLoading(true);

         const res = await api.get('/tokens/all');
         const data = await res.data;
         setTokenInfo(data);

         setLoading(false);
      }

      getData();
   }, []);

   const edit = index => {
      setTokenAddress(tokenInfo[index].token?.address);
      setTokenName(tokenInfo[index].token?.name);
      setTokenSymbol(tokenInfo[index].token?.symbol);
      setChain(tokenInfo[index].token?.chain);
      setWebsite(tokenInfo[index].social?.website);
      setTelegram(tokenInfo[index].social?.telegram);
      let _isEditable = [...isEditable];
      _isEditable[index] = true;
      setEditable(_isEditable);
   }

   const cancel = index => {
      let _isEditable = [...isEditable];
      _isEditable[index] = false;
      setEditable(_isEditable);
   }

   const onChangePermission = async (permis, index, address) => {
      if(window.confirm(('Do you change this permission?'))) {
         const body = {
            isShow: permis,
            address: address
         }

         try {
            const res = await api.post('/tokens/updateIsShow', body);

            if (res) {
               let _tokeninfo = [...tokenInfo];

               _tokeninfo[index].isShow = permis;
               setTokenInfo(_tokeninfo);
            }
         } catch(err) {
            notify('error', 'Network Errors');
         }
      } else {
         notify('info', 'Action Cancelled')
      }
   }

   const updateTokenInfo = async (index, address) => {
      if(window.confirm(('Will you update this information?'))) {
         const body = {
            oldAddress: address,
            newAddress: tokenAddress,
            name: tokenName,
            symbol: tokenSymbol,
            chain: chain,
            website: website,
            telegram: telegram,
         }
         try {
            const res = await api.post('/tokens/update', body);

            if (res) {
               let _tokeninfo = [...tokenInfo];
               _tokeninfo[index].token.name = tokenName;
               _tokeninfo[index].token.symbol = tokenSymbol;
               _tokeninfo[index].token.name = tokenName;
               _tokeninfo[index].token.address = tokenAddress;
               _tokeninfo[index].social.website = website;
               _tokeninfo[index].social.telegram = telegram;
               setTokenInfo(_tokeninfo);

               cancel(index);
            }
         } catch(err) {
            notify('error', 'Network Errors');
         }
      } else {
         notify('info', 'Action Cancelled')
      }
   }
   const onChangeFlag = async (paid, index, address) => {
      if(window.confirm(('Will you change this?'))) {
         const body = {
            isPaid: paid,
            address: address
         }

         try {
            const res = await api.post('/tokens/updateIsPaid', body);

            if (res) {
               let _tokeninfo = [...tokenInfo];

               _tokeninfo[index].isPaid = paid;
               setTokenInfo(_tokeninfo);
            }
         } catch(err) {
            notify('error', 'Network Errors');
         }
      } else {
         notify('info', 'Action Cancelled')
      }
   }

   const deleteTokenList = async (index, address) => {
      if(window.confirm(('Do you want to delete this token list?'))) {
         const body = {
            address: address
         }

         try {
            const res = await api.post('/tokenlist/delete', body);

            if (res) {
               let _tokeninfo = [...tokenInfo];

               _tokeninfo.splice(index, 1);
               setTokenInfo(_tokeninfo);
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
            <p className='text-3xl font-bold'>Introduction to <span className='text-orange-500'>Default Cryptos</span></p>
         </div>

         <div className='my-10 shadow-lg '>
            <table className='pricing w-full text-center rounded-3xl '>
                  <thead className='bg-[#F0F0F2]'>
                     <tr>
                        <th>Added</th>
                        <th>Token Name</th>
                        <th>Symbol</th>
                        <th>Address</th>
                        <th>Chain</th>
                        <th>Website</th>
                        <th>Telegram</th>
                        <th>Permission State</th>
                        <th>Paid State</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                  { isLoading && isLoading === true ? (
                     <tr>
                        <td colSpan={7} className='text-center w-full'>
                           <div className='m-auto w-max'>
                              <Bars height={100} width='100' color='orange' ariaLabel='loading-indicator' />
                           </div>
                        </td>
                     </tr>) : ''
                  }
                  { tokenInfo && tokenInfo.map((item, index) =>
                     <tr key={ index } className='border-b font-medium'>
                        <td>{ String(item.date).slice(0, 10) }</td>
                        <td>
                           {/* <img className='mt-2' width={25} src={ 'http://localhost/img/tokens/' + item.token.icon } alt='' /> */}
                           {isEditable[index] !== true ? item.token?.name :
                           <input className='bg-slate-200 p-1 rounded border-none'
                              value={tokenName}
                              onChange={(e) => setTokenName(e.target.value)}
                           /> }
                        </td>
                        <td>
                           {isEditable[index] !== true ? item.token?.symbol :
                           <input className='bg-slate-200 p-1 rounded border-none'
                              value={tokenSymbol}
                              onChange={(e) => setTokenSymbol(e.target.value)}
                           /> }
                        </td>
                        <td>
                           {isEditable[index] !== true ? item.token.address :
                           <input className='bg-slate-200 p-1 rounded border-none'
                              value={tokenAddress}
                              onChange={(e) => setTokenAddress(e.target.value)}
                           /> }
                        </td>
                        <td>{isEditable[index] !== true ? item.token.chain.toUpperCase() :
                           <select
                              className='mt-1 w-full py-1 px-3 bg-transparent/5'
                              onChange={(e)=>setChain(e.target.value)}
                           >
                              <option>Choose Chain</option>
                              <option value='eth'>Ethereum</option>
                              <option value='optimism'>Optimism</option>
                              <option value='bsc'>BSC</option>
                              <option value='polygon'>Polygon</option>
                              <option value='fantom'>Fantom</option>
                              <option value='arbitrum'>Arbitrum</option>
                              <option value='celo'>Celo</option>
                              <option value='avalanche'>Avalanche</option>
                           </select>
                        }</td>
                        <td>
                           {isEditable[index] !== true ? item.social.website :
                           <input className='bg-slate-200 p-1 rounded border-none'
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                           />}
                        </td>
                        <td>
                           {isEditable[index] !== true ? item.social.telegram :
                           <input className='bg-slate-200 p-1 rounded border-none'
                              value={telegram}
                              onChange={(e) => setTelegram(e.target.value)}
                           />}
                        </td>
                        <td>
                        { item.isShow === true ?
                           <button
                              className='bg-green-500 hover:bg-green-700 px-3 py-1 w-20 rounded text-white'
                              onClick={() => onChangePermission(false, index, item.token?.address)}
                           >
                              Passed
                           </button> :
                           <button
                              className='bg-slate-500 hover:bg-slate-700 px-2 py-1 w-20 rounded text-white'
                              onClick={() => onChangePermission(true, index, item.token?.address)}
                           >
                              Pending
                           </button>
                        }
                        </td>
                        <td>
                        { item.isPaid === true ?
                           <button
                              className='bg-green-500 hover:bg-green-700 px-3 py-1 w-20 rounded m-auto text-white'
                              onClick={() => onChangeFlag(false, index, item.token?.address)}
                           >
                              Paid
                           </button> :
                           <button
                              className='bg-slate-500 hover:bg-slate-700 px-2 py-1 w-20 rounded m-auto text-white'
                              onClick={() => onChangeFlag(true, index, item.token?.address)}
                           >
                              No
                           </button>
                        }
                        </td>
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
                              onClick={() => deleteTokenList(index, item.address)}
                           >
                              <span className='mt-1 mr-1'><TbTrashX /></span>
                           </button>
                           </> : <><button
                              className='flex px-2 py-1 rounded m-auto text-slate-800 hover:text-slate-500 items-center text-xl'
                              onClick={() => updateTokenInfo(index, item.token?.address)}
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
                  )}
                  </tbody>
            </table>
         </div>
      </div>
   );
}

export default TokenList;