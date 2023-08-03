import axios from 'axios';
import * as React from 'react';
import { Box, Modal, Button } from '@mui/material';
import CurrencyModal from './CurrencyModal';
import IconModal from './IconModal';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  borderRadius: 1,
  boxShadow: 24,
};

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const [iconData, setIconData] = React.useState({ id: 1, icon: 'https://static.moneylover.me/img/icon/icon.png' });
  const [currencyData, setCurrencyData] = React.useState();
  const [dataInput, setDataInput] = React.useState({ name: '', amountOfMoney: 0 });
  const [isValid, setIsValid] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFocus = () => {
    document.getElementById("note").focus();
  };
  const handleIconFromChild = (dataIcon) => {
    setIconData(dataIcon);
  };
  const handleCurrencyFromChild = (dataCurrency) => {
    setCurrencyData(dataCurrency)
  };
  const handleChange = (e) => {
    let data = { ...dataInput, [e.target.name]: e.target.value };
    setDataInput(data);
    handleCheckValid(e);
  }
  const handleCheckValid = (e) => {
    let data = { ...dataInput, [e.target.name]: e.target.value };
    if (iconData && currencyData && data.name && data.amountOfMoney > 0) setIsValid(true)
    else setIsValid(false);
  }

  const handleSubmit = () => {
    let name = dataInput.name;
    let iconID = iconData.id;
    let currencyID = currencyData.id;
    let amountOfMoney = dataInput.amountOfMoney;
    axios.post('http://localhost:4000/api/wallets', { name, iconID, currencyID, amountOfMoney }).then((res) => {
    let walletID = res.data.newWallet.id;
    axios.post('http://localhost:4000/api/walletRoles', {userID:1, walletID}).then((res)=> {
      console.log(res.data);
    }).catch(err => console.log(err.message));
    }).catch(err => console.log(err.message));
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 496 }}>
          <div className='px-6 py-5 border-b-[1px] border-gray-300'>
            <p className='text-xl font-semibold'>Add a wallet first!</p>
          </div>
          <div className='p-6'>
            <div className='flex item-center justify-center'>
              <div className='w-1/3'>
                <IconModal iconDataReceived={handleIconFromChild} />
              </div>
              <div onClick={handleFocus} className='mb-4 py-[5px] px-[15px] border w-full border-gray-300 rounded-lg hover:border-gray-500 hover: cursor-pointer'>
                <p className='text-[12px] pb-[3px] text-slate-400'>Wallet name</p>
                <div className='pb-1'>
                  <input onChange={handleChange} className='inputAdd w-full h-[27px] text-[17px] focus:outline-none' tabIndex="-1" type="text" name="name" value={dataInput.name} placeholder="Your wallet name?" id="note" />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center mb-6'>
              <div className='w-64 mr-4 py-1 pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500 hover:cursor-pointer'>
                <CurrencyModal currencyDataReceived={handleCurrencyFromChild} />
              </div>
              <div className='w-44 py-[7.25px] pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500'>
                <p className='text-[12px] pb-[3px] text-slate-400'>Initial Balance</p>
                <div className='pb-1'>
                  <input onChange={handleChange} className='inputAdd w-full h-[26px] text-[17px] focus:outline-none' tabIndex="-1" type="number" placeholder='0' name="amountOfMoney" value={dataInput.amountOfMoney} required />
                </div>
              </div>
            </div>
            <div className='pt-[13px] pb-5 flex text-center'>
              <input className='w-4 h-4 hover: cursor-pointer mt-1' type="checkbox" name="vehicle1" value="Bike" required />
              <div className='ml-3'>
                <p>Chấp nhận điều khoản</p>
              </div>
            </div>
          </div>
          <div className='py-[14px] px-6 flex justify-end'>
            <button type='button' onClick={handleSubmit} className='bg-lightgreen text-white text-sm font-medium py-2 px-8 uppercase rounded disabled:bg-slate-400' disabled={!isValid}>Save</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}