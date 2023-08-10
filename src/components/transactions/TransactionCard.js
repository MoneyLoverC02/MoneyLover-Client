import * as React from 'react';
import { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    AppBar, Box, Card, Container, Grid, IconButton, Slide, Stack, Toolbar, Typography
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ClearIcon from "@mui/icons-material/Clear";
import { WalletService } from '../../services/wallet.service';
import { getAllWallet, setWalletSelect } from '../../redux/walletSlice';
import UpdateModal from '../modals/UpdateModal';
import NestedModal from '../modals/NestedModal';
import { useNavigate } from 'react-router-dom';
import TranferModal from '../modals/TranferModal';
import { TransactionService } from '../../services/transaction.service';
import { getAllCategory, getAllExpense, getAllIncome, getAllTransaction, setTransactionSelect } from '../../redux/transactionSlice';
import ModalDeleteWallets from '../layout/ModalDeleteWallets';
import { convertDate } from '../datePick/datePick';

export default function TransactionCard({ openModal, closeModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const transactionSelect = useSelector(state => state.transaction.transactionSelect);
    const allTransaction = useSelector(state => state.transaction.allTransaction);
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    const allWallet = useSelector(state => state.wallet.allWallet);
    const allCategory = useSelector(state => state.transaction.allCategory)
    const [calculate, setCalculate] = useState({ totalInflow: 1000, totalOutflow: 10 });

    React.useEffect(() => {
        TransactionService.getAllCategory().then(res => {
            let categoryList = res.data.categoryList;
            dispatch(getAllCategory(categoryList));
        })

    }, [])
    React.useEffect(() => {
        if (walletSelect) {
            TransactionService.getAllTransactionOfWallet(walletSelect?.id).then(res => {
                let transactionList = res.data.transactionList;
                dispatch(getAllTransaction(transactionList))
            })
        }
    },[walletSelect])

    const handleOpenSlide = (idTrans) => {
        TransactionService.getInfoTransaction(idTrans).then(res => {
            dispatch(setTransactionSelect(res.data.transaction));
            setChecked(true);
        })
    };
    const handleCloseSlide = () => {
        setChecked(false);
    };
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        closeModal();
    };
    const handleSubmitFormTransaction = () => {
        closeModal();
    }
    const handleSelectTrans = () => {

    }

    return (
        <div>
            <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                <Container>
                    <Box sx={{ margin: " 50px auto" }}>
                        <Grid container spacing={2} justifyContent={'center'}>
                            {allTransaction?.length > 0 ?
                                (
                                    <div className="mt-10 min-w-[350px] md:w-[600px] min-h-[300px] bg-zinc-100 rounded-md bg overflow-hidden">
                                        <div className="pt-4 bg-white">
                                            <div className="sticky top-0 h-[48px] fomt-normal border-b flex justify-center z-10">
                                                <button className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">Last Month</button>
                                                <button className="w-full py-[15px] uppercase leading-4 text-sm font-semibold border-b-4 border-lightgreen text-lightgreen">This Month</button>
                                                <button className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">Future</button>
                                            </div>
                                            <div className="bg-zinc-100 text-center">
                                                <div>
                                                    <div id='all-trans' className='bg-white text-zinc-600 text-sm font-medium text-center mb-8'>
                                                        <div>
                                                            <div className='flex justify-between px-4 py-2 '>
                                                                <span>Inflow</span>
                                                                <span className='text-sky-500'>
                                                                    +AOA {calculate.totalInflow}
                                                                </span>
                                                            </div>
                                                            <div className='flex justify-between px-4 py-2'>
                                                                <span>Outflow</span>
                                                                <span className='text-red-500'>
                                                                    -AOA {calculate.totalOutflow}
                                                                </span>
                                                            </div>
                                                            <div className='flex justify-end px-4 py-2'>
                                                                <span className='border-t-2 pl-4 py-2'>
                                                                    AOA {calculate.totalInflow - calculate.totalOutflow}

                                                                </span>
                                                            </div>
                                                            <div className='px-4 py-3 uppercase text-center text-lightgreen hover:cursor-pointer'>
                                                                view report for this period
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {allCategory?.length > 0 && allCategory.map(category => {
                                                        const transactionsInCategory = allTransaction?.filter(item => item.category.id === category.id);
                                                        if (transactionsInCategory.length === 0) {
                                                            return null;
                                                        }
                                                        const categoryInfo = (
                                                            <div className='flex justify-between px-4 py-3'>
                                                                <div className='flex justify-start'>
                                                                    <img src={transactionsInCategory[0]?.category.icon} alt="" className='w-10 h-10 object-cover mr-4 rounded-full' />
                                                                    <span className='text-start'>
                                                                        <div>{transactionsInCategory[0]?.category.name}</div>
                                                                        <div className='text-xs text-zinc-400 font-normal'>{transactionsInCategory.length} Transactions</div>
                                                                    </span>
                                                                </div>
                                                                <span><p className='mt-3'>{transactionsInCategory[0].category.type === "expense" ? '-' : '+'}AOA {transactionsInCategory[0]?.amount}</p></span>
                                                            </div>
                                                        );
                                                        return (
                                                            <div key={category.id} id='expense-trans' className='bg-white text-zinc-600 text-sm font-medium'>
                                                                <div className='mb-8'>
                                                                    {categoryInfo}
                                                                    {transactionsInCategory.map(item => (
                                                                        <div key={item.id} onClick={handleSelectTrans} className='flex justify-between px-4 py-2 border-t hover:bg-lime-50 cursor-pointer'>
                                                                            <div className='flex justify-start'>
                                                                                <span className='w-10 h-10 mr-4 text-3xl font-light text-black'>{convertDate(item?.date).day}</span>
                                                                                <span className='text-start'>
                                                                                    <div>{convertDate(item?.date).dayOfWeek}, {convertDate(item?.date).month} {convertDate(item?.date).year}</div>
                                                                                    <div className='text-xs text-zinc-400 font-normal'>{item?.amount}</div>
                                                                                </span>
                                                                            </div>
                                                                            <span>
                                                                                {item.category.type === "expense" ?
                                                                                    <p className='mt-3 text-red-500'>-AOA {item?.amount}</p>
                                                                                    :
                                                                                    <p className='mt-3 text-sky-500'>+AOA {item?.amount}</p>
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
                            {/* {transactionSelect && checked && <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                                < Grid item xs={8}>
                                    <Card variant="outlined">
                                        <Box sx={{
                                            position: 'relative',
                                            color: "black",
                                            height: "50px",
                                            borderBottom: "1px solid #ececec"
                                        }}>
                                            <div style={{ padding: "5px 10px", }}><Button sx={{ color: "black" }}
                                                onClick={handleCloseSlide}><ClearIcon
                                                    sx={{ float: "left" }} /></Button>
                                                <b style={{ marginLeft: "30px" }}>Wallet details</b>
                                                <Stack direction="row" sx={{ float: "right" }} spacing={2}>
                                                    <ModalDeleteWallets sx={{ height: "402px" }}
                                                        idWallet={transactionSelect.id}
                                                        onClose={handleCloseSlide} />
                                                    <Button color='success'>EDIT</Button>
                                                </Stack>
                                            </div>
                                        </Box>
                                        <div fullWidth color="success"
                                            sx={{ color: "black", justifyContent: "left", textAlign: "left" }}>
                                            <div>
                                                <img src={transactionSelect.icon.icon}
                                                    style={{
                                                        width: "40px", height: "40px", margin: "15px", float: "left"
                                                    }} alt="" />
                                                <div style={{ textAlign: "left", margin: "15px" }}>
                                                    <span className='lowercase'>{transactionSelect.name}</span><br />
                                                    <span className='lowercase'>{transactionSelect.currency.sign} </span>
                                                    <span>{transactionSelect.amountOfMoney} </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Grid>
                            </Slide>} */}
                        </Grid>
                        <AddTransactionModal isOpen={openModal} onClose={handleCloseModal}
                            onSubmit={handleSubmitFormTransaction} />
                    </Box>
                </Container>
            </Slide>
        </div>
    );
}