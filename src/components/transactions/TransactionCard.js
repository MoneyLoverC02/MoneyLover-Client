import * as React from 'react';
import { useEffect, useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import {
    Card, Slide, Stack
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from 'react-router-dom';
import { TransactionService } from '../../services/transaction.service';
import { getAllCategory, getAllTransaction, setTransactionSelect } from '../../redux/transactionSlice';
import { convertDate } from '../datePick/datePick';
import ModalDeleteTrans from './ModalDeleteTrans';
import UpdateTransactionModal from './UpdateTransactionModal';
import { calculatorAmountByCategory } from '../card/ReportsCard';
import numeral from 'numeral';

export default function TransactionCard({ openModal, closeModal }) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const [openFormUpdate, setOpenFormUpdate] = useState(false);
    const transactionSelect = useSelector(state => state.transaction.transactionSelect);
    const allTransaction = useSelector(state => state.transaction.allTransaction);
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    const allCategory = useSelector(state => state.transaction.allCategory)
    const [calculate, setCalculate] = useState({ totalInflow: 0, totalOutflow: 0 });
    const navigate = useNavigate();

    // useEffect(() => {
    //     const scrollStopper = document.querySelector('.scroll-stopper');
    //     const navbarHeight = 111;
    //     const stopPosition = navbarHeight;

    //     const handleScroll = () => {
    //         const scrollTop = window.scrollY;
    //         if (scrollTop <= stopPosition) {
    //             scrollStopper.style.top = `${stopPosition  - scrollTop}px `;
    //         } else {
    //             scrollStopper.style.top = '65px';
    //         }

    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    useEffect(() => {
        let totalInflow = 0;
        let  totalOutflow = 0
        allTransaction?.forEach(item => {
            if (item.category.type === 'expense') {
                totalOutflow += item.amount
            } else {
                totalInflow += item.amount
            }
        })
        setCalculate({totalInflow, totalOutflow});
    }, [allTransaction])

    useEffect(() => {
        TransactionService.getAllCategory().then(res => {
            let categoryList = res.data.categoryList;
            dispatch(getAllCategory(categoryList));
        })

    }, [])
    useEffect(() => {
        if (walletSelect) {
            TransactionService.getAllTransactionOfWallet(walletSelect?.id).then(res => {
                let transactionList = res.data.transactionList;
                dispatch(getAllTransaction(transactionList))
            })
        }
    }, [walletSelect])

    const handleOpenSlide = (walletId, idTrans) => {
        TransactionService.getInfoTransaction(walletId, idTrans).then(res => {
            dispatch(setTransactionSelect(res.data.transaction));
            setChecked(true);
        })
    };
    const handleCloseSlide = () => {
        setChecked(false);
    };
    const handleCloseModal = () => {
        closeModal();
    };
    const handleSubmitFormTransaction = () => {
        closeModal();
        setChecked(true);
    }

    const handleOpenFormUpdate = () => {
        setOpenFormUpdate(true);
    }
    const handleCloseFormUpdate = () => {
        setOpenFormUpdate(false);
    }
    const handleSubmitFormUpdate = () => {
        handleCloseFormUpdate();
        setChecked(true);
    }
    const handleViewReport = () => {
        navigate('/reports')
    }
    return (
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <div className='ml-[92px] px-4 mt-10'>
                <div className='flex justify-center gap-4'>
                    <div className={`component`}>
                        {allTransaction?.length > 0 ?
                            (
                                <>
                                    <div className="min-w-[350px] md:w-[600px] min-h-[300px] bg-zinc-100 rounded-md bg overflow-hidden">
                                        <div className="pt-4 bg-white">
                                            <div className="h-[48px] w-[600px] fomt-normal border-b flex justify-center "  >
                                                <button className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">Last Month</button>
                                                <button className="w-full py-[15px] uppercase leading-4 text-sm font-semibold border-b-4 border-lightgreen text-lightgreen">This Month</button>
                                                <button className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">Future</button>
                                            </div>
                                            <div className="bg-zinc-100 mt-[48px] text-center">
                                                <div>
                                                    <div id='all-trans' className='bg-white text-zinc-600 text-sm font-medium text-center mb-8'>
                                                        <div>
                                                            <div className='flex justify-between px-4 py-2 '>
                                                                <span>Inflow</span>
                                                                <span className='text-sky-500'>
                                                                    +{walletSelect?.currency.sign} {numeral(calculate.totalInflow).format(0,0)}
                                                                </span>
                                                            </div>
                                                            <div className='flex justify-between px-4 py-2'>
                                                                <span>Outflow</span>
                                                                <span className='text-red-500'>
                                                                    -{walletSelect?.currency.sign} {numeral(calculate.totalOutflow).format(0,0)}
                                                                </span>
                                                            </div>
                                                            <div className='flex justify-end px-4 py-2'>
                                                                <span className='border-t-2 pl-4 py-2'>
                                                                    {walletSelect?.currency.sign} {numeral(calculate.totalInflow - calculate.totalOutflow).format(0,0)}

                                                                </span>
                                                            </div>
                                                            <button onClick={handleViewReport} className='px-4 py-3 uppercase text-center text-lightgreen hover:cursor-pointer'>
                                                                view report for this period
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {allCategory?.length > 0 && allCategory.map(category => {
                                                        let totalAmount = 0;
                                                        let allDataCalculated = calculatorAmountByCategory(allTransaction);
                                                        const transactionsInCategory = allTransaction?.filter(item => item.category.id === category.id);
                                                        if (category.type === 'income') {
                                                            allDataCalculated.listIncome.forEach(item => {
                                                                if (category.name === item.categoryName) totalAmount = item.totalAmount
                                                            }) 
                                                        } else {
                                                            allDataCalculated.listExpense.forEach(item => {
                                                                if (category.name === item.categoryName) totalAmount = item.totalAmount
                                                            })
                                                        }
                                                        if (transactionsInCategory.length === 0) {
                                                            return null;
                                                        }
                                                        const categoryInfo = (
                                                            <div className='flex justify-between px-4 py-3'>
                                                                <div className='flex justify-start'>
                                                                    <img src={transactionsInCategory[0]?.category.icon} alt="" className='w-10 h-10 object-cover mr-4 rounded-full ' />
                                                                    <span className='text-start'>
                                                                        <div>{transactionsInCategory[0]?.category.name}</div>
                                                                        <div className='text-xs text-zinc-400 font-normal'>{transactionsInCategory.length} Transactions</div>
                                                                    </span>
                                                                </div>
                                                                <span><p className='mt-3'>{transactionsInCategory[0].category.type === "expense" ? '-' : '+'}{walletSelect?.currency.sign} {numeral(totalAmount).format(0,0)}</p></span>
                                                            </div>
                                                        );
                                                        return (
                                                            <div key={category.id} id='expense-trans' className='bg-white text-zinc-600 text-sm font-medium' >
                                                                <div className='mb-8'>
                                                                    {categoryInfo}
                                                                    {transactionsInCategory.map(item => (
                                                                        <div key={item.id} onClick={() => handleOpenSlide(walletSelect?.id, item.id)} className='flex justify-between px-4 py-2 border-t hover:bg-lime-50 cursor-pointer'>
                                                                            <div className='flex justify-start'>
                                                                                <span className='w-10 h-10 mr-4 text-3xl font-light text-black'>{convertDate(item?.date).day}</span>
                                                                                <span className='text-start'>
                                                                                    <div>{convertDate(item?.date).dayOfWeek}, {convertDate(item?.date).month} {convertDate(item?.date).year}</div>
                                                                                    <div className='text-xs text-zinc-400 font-normal'>{item?.amount}</div>
                                                                                </span>
                                                                            </div>
                                                                            <span>
                                                                                {item.category.type === "expense" ?
                                                                                    <p className='mt-3 text-red-500'>-{walletSelect?.currency.sign} {numeral(item?.amount).format(0,0)}</p>
                                                                                    :
                                                                                    <p className='mt-3 text-sky-500'>+{walletSelect?.currency.sign} {numeral(item?.amount).format(0,0)}</p>
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                            :
                            (
                                <div className="mt-10 w-[600px] h-[300px] bg-zinc-100 rounded-md bg overflow-hidden">
                                    <div className="pt-4 bg-white">
                                        <div className=" h-[48px] fomt-normal border-b flex justify-center ">
                                            <button className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">Last Month</button>
                                            <button className="w-full py-[15px] uppercase leading-4 text-sm font-semibold border-b-4 border-lightgreen text-lightgreen">This Month</button>
                                            <button className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">Future</button>
                                        </div>
                                        <div className="bg-zinc-100 text-center">
                                            <div>
                                                <span id="iconRotage" className="font-semibold text-[112px] pb-5 text-center inline-block text-zinc-500">{':-)'}</span>
                                            </div>
                                            <span className="text-2xl inline-block text-zinc-400"> No transactions</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    {(transactionSelect && checked && allTransaction?.length > 0) ?
                        <div className=''>
                            <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                                <Card variant="outlined" className='md:w-[750px] h-[250px]'>
                                    <div className='flex text-center justify-between mx-3 my-4'>
                                        <div className='text-center'>
                                            <Button sx={{ color: "black" }}
                                                onClick={handleCloseSlide}><ClearIcon
                                                    sx={{ float: "left" }} /></Button>
                                            <span className='ml-4 font-semibold text-xl h-[37px] '>Transaction details</span>
                                        </div>
                                        <Stack direction="row" sx={{ float: "right" }} spacing={2}>
                                            <ModalDeleteTrans sx={{ height: "402px" }}
                                                idWallet={walletSelect?.id}
                                                onClose={() => handleCloseSlide} />
                                            <Button onClick={handleOpenFormUpdate} color='success'>EDIT</Button>
                                        </Stack>
                                    </div>
                                    <div className='text-center flex pb-4'>
                                        <div className='pl-2 mt-3'>
                                            <img src={transactionSelect?.category.icon}
                                                style={{
                                                    width: "60px", height: "60px", margin: "15px", float: "left"
                                                }} alt="" />
                                        </div>
                                        <div style={{ textAlign: "left", margin: "15px" }}>
                                            <div className='font-normal text-2xl'>{transactionSelect?.category.name}</div>
                                            <div className='text-sm font-medium min-h-[20px]'>{transactionSelect?.note ? transactionSelect?.note : 'note'} </div>
                                            <div className='text-xs py-2 border-b min-w-[200px]'>{transactionSelect?.date} </div>
                                            <div className='pt-2'>{transactionSelect?.category.type === "expense" ? <span className='text-4xl text-red-500 font-medium'>-{walletSelect?.currency.sign} {numeral(transactionSelect?.amount).format(0,0)}</span> : <span className='text-4xl text-sky-500 font-medium'>+{walletSelect?.currency.sign} {transactionSelect?.amount}</span>}  </div>
                                        </div>
                                    </div>
                                </Card>
                            </Slide>
                        </div>
                        :
                        null
                    }
                </div>
                <AddTransactionModal isOpen={openModal} onClose={handleCloseModal}
                    onSubmit={handleSubmitFormTransaction} />
                <UpdateTransactionModal isOpen={openFormUpdate} onClose={handleCloseFormUpdate}
                    onSubmit={handleSubmitFormUpdate} />
            </div >
        </Slide >
    );
}