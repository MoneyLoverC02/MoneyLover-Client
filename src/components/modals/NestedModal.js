import * as React from 'react';
import { Box, Modal, Button, TextField } from '@mui/material';

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

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={handleOpen}>
        <div className='flex justify-center items-center mr-4 py-[11px] pl-4 pr-3 border-[1px] border-gray-300 rounded-lg hover:border-gray-500'>
          <img src="https://static.moneylover.me/img/icon/icon.png" className='object-cover w-10 h-10 mr-[10px]' alt="" />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 496, minHeight: 500}}>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFocus = () => {
    document.getElementById("note").focus();
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 496 }}>
          <div className='px-6 py-5 border-b-[1px] border-gray-300'>
            <p className='text-xl font-semibold'>Add a wallet first!</p>
          </div>
          <div className='p-6'>
            <div className='flex item-center justify-center'>
              <div className='w-1/3'>
                <ChildModal />
              </div>
              <div onClick={handleFocus} className='mb-4 py-[5px] px-[15px] border w-full border-gray-300 rounded-lg hover:border-gray-500 hover: cursor-pointer'>
                <p className='text-[12px] pb-[3px] text-slate-400'>Wallet name</p>
                <div className='pb-1'>
                  <input className='inputAdd w-full h-[27px] text-[17px]' tabindex="-1" type="text" name="walletName" placeholder="Your wallet name?" id="note" />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center mb-6'>
              <div className='w-64 mr-4 py-2 pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500 hover:cursor-pointer'>
                  <p className='text-[12px] pb-[3px] text-slate-400'>Currency</p  >
                <div className='wrap-text-icon'>
                  <div className='flex justify-center items-center'>
                    <img src="https://static.moneylover.me/img/flag/ic_currency_vnd.png" className="w-6 h-6 object-cover mr-4 rounded-full" alt='icon-flag' />
                    <span className="text-input">Việt Nam Đồng</span>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-44 py-[7.25px] pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500'>
                <p className='text-[12px] pb-[3px] text-slate-400'>Initial Balance</p>
                <div className='pb-1'>
                  <input className='inputAdd w-full h-[27px] text-[17px]' tabindex="-1" type="number" defaultValue='0' name="quantity" />
                </div>
              </div>
            </div>
            <div className='pt-[13px] pb-5 flex text-center'>
                <input className='w-4 h-4 hover: cursor-pointer mt-1' type="checkbox" name="vehicle1" value="Bike"/>
                <div className='ml-3'>
                    <p>Chấp nhận điều khoản</p>
                </div>
            </div>
          </div>
          <div className='py-[14px] px-6 flex justify-end'>
              <button className='bg-lightgreen text-white text-sm font-medium py-2 px-8 uppercase rounded'>Save</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
