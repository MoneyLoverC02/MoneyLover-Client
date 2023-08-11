import * as React from 'react';
import { Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setWalletSelect } from '../../redux/walletSlice';
import WalletSelectTransactionModal from './WalletSelectTransaction';
import CategorySelectModal from './CategorySelectModal';
import DatePickerComponent, { formatDate } from '../datePick/datePick';
import { TransactionService } from '../../services/transaction.service';
import { getAllTransaction, setTransactionSelect } from '../../redux/transactionSlice';


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

export default function AddTransactionModal({ isOpen, onClose, onSubmit }) {
    const [isValid, setIsValid] = React.useState(true);
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    const [categorySelect, setCategorySelect] = React.useState(null);
    const [dataInput, setDataInput] = React.useState({money: 0, note: ''});
    const [dateInput, setDateInput] = React.useState(formatDate(new Date()));
    const [checkMoney, setCheckMoney] = React.useState(true);
    const allTransaction = useSelector(state => state.transaction.allTransaction);
    const transactionSelect = useSelector(state => state.transaction.transactionSelect);
    const dispatch = useDispatch();

    

    const handleSelectWallet = (wallet) => {
        dispatch(setWalletSelect(wallet));
    }
    const handleSelectCategory = (category) => {
        setCategorySelect(category)
    }
    const handleGetDate = (date) => {
        setDateInput(date);
    }

    const handleChange = (e) => {
        let data = { ...dataInput, [e.target.name]: e.target.value };
        data.money > walletSelect.amountOfMoney ? setCheckMoney(false) : setCheckMoney(true);
        setDataInput(data);
        handleCheckValid(e);
    }
    const handleCheckValid = () => {
        if (walletSelect && categorySelect) setIsValid(true)
        else setIsValid(false);
    }

    const handleSubmit = () => {
        let { money, note } = dataInput;
        let amount = +money;
        let date = dateInput;
        let categoryID = categorySelect.id;
        TransactionService.createTransaction(walletSelect.id, { amount, date, note, categoryID }).then((res) => {
            if (res.data.message === 'Creat transaction success!') {
                let newTransaction = res.data.newTransaction;
                let newMoney;
                if (newTransaction.category.type === "expense") {
                    newMoney = walletSelect.amountOfMoney - newTransaction.amount;
                } else newMoney = walletSelect.amountOfMoney + newTransaction.amount
                dispatch(setWalletSelect({...walletSelect, amountOfMoney: newMoney}))
                dispatch(setTransactionSelect(newTransaction));
                TransactionService.getAllTransactionOfWallet(walletSelect.id).then(res => {
                    let transactionList = res.data.transactionList; 
                    dispatch(getAllTransaction(transactionList));
                    setDataInput({money: 0, note: ''});
                    setDateInput(formatDate(new Date()));
                    setIsValid(false);
                    setCheckMoney(true);
                    onSubmit();
                })
            } else {
                alert("Không có quyền thêm giao dịch");
            }
        }).catch(err => console.log(err.message));
    }
    const handleCancel = () => {
        setCategorySelect(null);
        setCheckMoney(true);
        setDataInput({money:0, note: ''});
        onClose();
    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 800 }}>
                    <div className='px-6 py-5 border-b-[1px] border-gray-300'>
                        <p className='text-xl font-semibold'>Add transaction</p>
                    </div>
                    <div className='p-6'>
                        <div className='flex items-center justify-center mb-6'>
                            <div className='w-64 mr-4 py-1 pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500 hover:cursor-pointer'>
                                <WalletSelectTransactionModal walletTransSelect={handleSelectWallet} />
                            </div>
                            <div className='w-64 mr-4 py-1 pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500 hover:cursor-pointer'>
                                <CategorySelectModal selectCategory={handleSelectCategory} />
                            </div>
                            <div className='w-44 py-[7.25px] pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500'>
                                <p className='text-[12px] pb-[3px] text-slate-400'>Amount Of Money</p>
                                <div className='pb-1'>
                                    <input onChange={handleChange} className='inputAdd w-full h-[26px] text-[17px] focus:outline-none' tabIndex="-1" type="number" placeholder='0' name="money" value={dataInput.money} required />
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-center mb-6'>
                            <div className='w-64 mr-4 py-1 pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500 hover:cursor-pointer'>
                                <DatePickerComponent getDate={handleGetDate}/>
                            </div>
                            <div className='w-[450px] py-[7.25px] pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500'>
                                <p className='text-[12px] pb-[3px] text-slate-400'>Note</p>
                                <div className='pb-1'>
                                    <input onChange={handleChange} className='inputAdd w-full h-[26px] text-[17px] focus:outline-none' tabIndex="-1" type="text" placeholder='Note' name="note" value={dataInput.note}/>
                                </div>
                            </div>
                        </div>
                        <div className=' text-center'>{!checkMoney ? (<p className="text-red-500 text-sm mt-3">Số tiền giao dịch phải nhỏ hơn số dư!</p>) : null}</div>
                        <div className='pt-[13px] pb-5 flex text-center ml-2 text-'>
                            <div className='ml-3 text-lightgreen underline underline-offset-2 hover:cursor-pointer'>
                                <p>Add more details</p>
                            </div>
                        </div>
                    </div>
                    <div className='py-[14px] px-6 flex justify-end'>
                        <button type='button' onClick={handleCancel} className='bg-slate-400 text-white text-sm font-medium py-2 px-8 uppercase rounded mr-3'>Cancel</button>
                        <button type='button' onClick={handleSubmit} className='bg-lightgreen text-white text-sm font-medium py-2 px-8 uppercase rounded disabled:bg-slate-400' disabled={!isValid || !checkMoney}>Save</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
