import * as React from 'react';
import { Box, Modal } from '@mui/material';
import CurrencyModal from './CurrencyModal';
import { useDispatch, useSelector } from 'react-redux';
import { WalletService } from '../../services/wallet.service';
import { getAllWallet, setWalletSelect } from '../../redux/walletSlice';
import WalletSelectModal from './WalletSelectModal';

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

export default function TranferModal({ isOpen, onClose, onSubmit }) {
    const [isValid, setIsValid] = React.useState(true);
    const [walletReceived, setWalletReceived] = React.useState(null);
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    // const allWallet = useSelector(state => state.wallet.allWallet);
    // const user = useSelector(state => state.auth.login.currentUser);
    const [moneyInput, setMoneyInput] = React.useState(0);
    const [checkMoney, setCheckMoney] = React.useState(true);
    const dispatch = useDispatch();
    let token = localStorage.getItem('token')

    React.useEffect(() => {
        WalletService.getAllWallet(token).then(res => {
            dispatch(getAllWallet(res.data.walletList));
        })
    }, [])

    const handleSelectWallet = (wallet) => {
        setWalletReceived(wallet);
    }

    const handleChange = (e) => {
        let data = e.target.value;
        data > walletSelect.amountOfMoney ? setCheckMoney(false) : setCheckMoney(true);
        setMoneyInput(data);
        handleCheckValid(e);
    }
    const handleCheckValid = (e) => {
        let money = e.target.value;
        if (money > 0) setIsValid(true)
        else setIsValid(false);
    }
    const handleSubmit = () => {
        let walletIDReceived = walletReceived.id;
        let money = +moneyInput;
        WalletService.tranferMoney(walletSelect.id, { walletIDReceived, money }).then((res) => {
            if (res.data.message === 'Money transfer success!') {
                setMoneyInput(0);
                let walletTranfer = res.data.walletTransfer;
                WalletService.getAllWallet().then(res => {
                    dispatch(setWalletSelect(walletTranfer));
                    dispatch(getAllWallet(res.data.walletList));
                    onSubmit();
                })
            } else if (res.data.message === "Money transfer failed!") {
                alert('Ví chuyển đến không có quyền owner!'); //sau thay thông báo
            }
            setWalletReceived(null);
        }).catch(err => console.log(err.message));
    }
    const handleCancel = () => {
        setCheckMoney(true);
        setWalletReceived(null)
        setMoneyInput(0);
        onSubmit()
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 496 }}>
                    <div className='px-6 py-5 border-b-[1px] border-gray-300'>
                        <p className='text-xl font-semibold'>Transfer money to another wallet</p>
                    </div>
                    <div className='p-6'>
                        <div className='flex items-center justify-center mb-6'>
                            <div className='w-64 mr-4 py-1 pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500 hover:cursor-pointer'>
                                <WalletSelectModal walletDesSelect={handleSelectWallet} />
                            </div>
                            <div className='w-44 py-[7.25px] pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500'>
                                <p className='text-[12px] pb-[3px] text-slate-400'>Amount Of Money</p>
                                <div className='pb-1'>
                                    <input onChange={handleChange} className='inputAdd w-full h-[26px] text-[17px] focus:outline-none' tabIndex="-1" type="number" placeholder='0' name="money" value={moneyInput} required />
                                </div>
                            </div>
                        </div>
                        <div className=' text-center'>{!checkMoney ? (<p className="text-red-500 text-sm mt-3">Số tiền chuyển phải nhỏ hơn số dư!</p>) : null}</div>
                        <div className='pt-[13px] pb-5 flex text-center'>
                            <input className='w-4 h-4 hover: cursor-pointer mt-1' type="checkbox" name="vehicle1" value="Bike" required />
                            <div className='ml-3'>
                                <p>Chấp nhận điều khoản</p>
                            </div>
                        </div>
                    </div>
                    <div className='py-[14px] px-6 flex justify-end'>
                        <button type='button' onClick={handleCancel} className='bg-slate-400 text-white text-sm font-medium py-2 px-8 uppercase rounded mr-3'>Cancel</button>
                        <button type='button' onClick={handleSubmit} className='bg-lightgreen text-white text-sm font-medium py-2 px-8 uppercase rounded disabled:bg-slate-400' disabled={!isValid || !checkMoney || !walletReceived}>Save</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}