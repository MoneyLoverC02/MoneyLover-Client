import * as React from 'react';
import { Box, Modal } from '@mui/material';
import CurrencyModal from './CurrencyModal';
import IconModal from './IconModal';
import { useDispatch, useSelector } from 'react-redux';
import { WalletService } from '../../services/wallet.service';
import { getAllWallet, setWalletSelect } from '../../redux/walletSlice';
import FreeSoloCreateOption from '../inputs/AutoCompateInput';

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
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    const allWallet = useSelector(state => state.wallet.allWallet);
    const [currencySelect, setCurrencySelect] = React.useState(walletSelect?.currency);
    const [iconSelect, setIconSelect] = React.useState(walletSelect?.icon);
    const user = useSelector(state => state.auth.login.currentUser);
    const [dataInput, setDataInput] = React.useState({ name: walletSelect?.name, amountOfMoney: walletSelect?.amountOfMoney });
    const dispatch = useDispatch();
    const [checkName, setCheckName] = React.useState(true);

    React.useEffect(() => {
        setIconSelect(walletSelect?.icon);
        setCurrencySelect(walletSelect?.currency);
        setDataInput({ name: walletSelect?.name, amountOfMoney: walletSelect?.amountOfMoney })
    }, [walletSelect]);
    React.useEffect(() => {
        let token = localStorage.getItem('token')
        WalletService.getAllWallet(user.id, token).then(res => {
            dispatch(getAllWallet(res.data.walletList));
        })
    }, [])
    const handleSelectIcon = (icon) => {
        setIconSelect(icon);
    }
    const handleSelectCurrency = (currency) => {
        setCurrencySelect(currency);
    }
    const handleFocus = () => {
        document.getElementById("note").focus();
    };
    const handleChange = (e) => {
        let name = '';
        let data = { ...dataInput, [e.target.name]: e.target.value };
        setDataInput(data);
        if (e.target.name === 'name') {
            name = e.target.value;
            let walletListCheck = allWallet.filter(item => item.name !== walletSelect.name);
            let wallet = walletListCheck.find(item => item.name === name);
            wallet ? setCheckName(false) : setCheckName(true);
        }
        handleCheckValid(e);
    }
    const handleCheckValid = (e) => {
        let data = { ...dataInput, [e.target.name]: e.target.value };
        if (data.name && data.amountOfMoney > 0) setIsValid(true)
        else setIsValid(false);
    }
    const handleSubmit = () => {
        let name = dataInput.name;
        let iconID = iconSelect?.id;
        let currencyID = currencySelect?.id;
        let amountOfMoney = dataInput.amountOfMoney;
        let token = localStorage.getItem('token')
        WalletService.updateWallet(user.id, walletSelect.id, { name, iconID, currencyID, amountOfMoney }).then((res) => {
            let updateWallet = res.data.updateWallet;
            WalletService.getAllWallet(user.id, token).then(res => {
                dispatch(setWalletSelect(updateWallet));
                dispatch(getAllWallet(res.data.walletList));
                onSubmit();
            })
        }).catch(err => console.log(err.message));
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
                    <FreeSoloCreateOption/>
                    {/* <div className='p-6'>
                        <div className='flex item-center justify-center'>
                            <div onClick={handleFocus} className='mb-4 py-[5px] px-[15px] border w-full border-gray-300 rounded-lg hover:border-gray-500 hover: cursor-pointer'>
                                <p className='text-[12px] pb-[3px] text-slate-400'>Wallet name</p>
                                <div className='pb-1'>
                                    <input onChange={handleChange} className='inputAdd w-full h-[27px] text-[17px] focus:outline-none' tabIndex="-1" type="text" name="name" value={dataInput.name} placeholder="Your wallet name?" id="note" />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center mb-6'>
                            <div className='w-64 mr-4 py-1 pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500 hover:cursor-pointer'>
                                <CurrencyModal selectCurrency={handleSelectCurrency} currencyBeforeUpdate={walletSelect?.currency} />
                            </div>
                            <div className='w-44 py-[7.25px] pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500'>
                                <p className='text-[12px] pb-[3px] text-slate-400'>Initial Balance</p>
                                <div className='pb-1'>
                                    <input onChange={handleChange} className='inputAdd w-full h-[26px] text-[17px] focus:outline-none' tabIndex="-1" type="number" placeholder='0' name="amountOfMoney" value={dataInput.amountOfMoney} required />
                                </div>
                            </div>
                        </div>
                        <div className=' text-center'>{!checkName ? (<p className="text-red-500 text-sm mt-3">Tên ví đã trùng!</p>) : null}</div>
                        <div className='pt-[13px] pb-5 flex text-center'>
                            <input className='w-4 h-4 hover: cursor-pointer mt-1' type="checkbox" name="vehicle1" value="Bike" required />
                            <div className='ml-3'>
                                <p>Chấp nhận điều khoản</p>
                            </div>
                        </div>
                    </div> */}
                    <div className='py-[14px] px-6 flex justify-end'>
                        <button type='button' onClick={handleSubmit} className='bg-lightgreen text-white text-sm font-medium py-2 px-8 uppercase rounded disabled:bg-slate-400' disabled={!isValid || !checkName}>Save</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
