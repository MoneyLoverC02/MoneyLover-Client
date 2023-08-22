import * as React from 'react';
import { useEffect, useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import {
    Card, CircularProgress, Slide, Stack
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useNavigate } from 'react-router-dom';
import { TransactionService } from '../../services/transaction.service';
import { getAllCategory, getAllTransaction, getAllTransactionsAndType, setMonthSelect, setTransactionSelect } from '../../redux/transactionSlice';
import { changeDate, convertDate, formatDate } from '../datePick/datePick';
import ModalDeleteTrans from './ModalDeleteTrans';
import UpdateTransactionModal from './UpdateTransactionModal';
import { calculatorAmountByCategory } from '../card/ReportsCard';
import numeral from 'numeral';
import { useTranslation } from "react-i18next";

export function getTimeByMonth(month, year) {
    // const currentYear = new Date().getFullYear();
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    return { firstDay, lastDay }
}
export function getMonthNow(date) {
    return date.getMonth() + 1;
}
export function getYearNow(date) {
    return date.getFullYear();
}

export default function TransactionCard({ openModal, closeModal }) {
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const [checked, setChecked] = useState(false);
    const [openFormUpdate, setOpenFormUpdate] = useState(false);
    const transactionSelect = useSelector(state => state.transaction.transactionSelect);
    const allTransaction = useSelector(state => state.transaction.allTransaction);
    const allTransactionsAndType = useSelector(state => state.transaction.allTransactionsAndType)
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    const monthSelect = useSelector(state => state.transaction.monthSelect);
    const [monthDisplay, setMonthDisplay] = useState({ last: 'Last Month', this: 'This Month', next: 'Next Month' });
    const allCategory = useSelector(state => state.transaction.allCategory)
    const [calculate, setCalculate] = useState({ totalInflow: 0, totalOutflow: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        if (!monthSelect) {
            let currentDate = new Date();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear()
            dispatch(setMonthSelect({ month, year }));
        }
    }, []);

    useEffect(() => {
        let totalInflow = 0;
        let totalOutflow = 0
        let timeNow = getTimeByMonth(monthSelect?.month, monthSelect?.year);
        let startDate = formatDate(timeNow.firstDay);
        let endDate = formatDate(timeNow.lastDay);
        if (walletSelect) {
            TransactionService.getAllTransactionOfWalletAndType(walletSelect?.id, startDate, endDate).then(res => {
                let transactionListAndType = res.data.transactionList;
                dispatch(getAllTransactionsAndType(transactionListAndType))
                transactionListAndType.forEach(trans => {
                    trans.forEach(item => {
                        if (item.category.type === 'expense') {
                            totalOutflow += item.amount
                        } else {
                            totalInflow += item.amount
                        }
                    })
                })
                setCalculate({ totalInflow, totalOutflow });
            }).catch(err => console.log(err.message))
        }
    }, [allTransaction, monthSelect])

    useEffect(() => {
        TransactionService.getAllCategory().then(res => {
            let categoryList = res.data.categoryList;
            dispatch(getAllCategory(categoryList));
        })
    }, [])
    useEffect(() => {
        if (walletSelect) {
            let currentDate = new Date();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear()
            dispatch(setMonthSelect({ month, year }));
            TransactionService.getAllTransactionOfWallet(walletSelect?.id).then(res => {
                let transactionList = res.data.transactionList;
                dispatch(getAllTransaction(transactionList))
            })
        }
    }, [walletSelect])

    const handleSelectMonth = (option) => {
        if (option === "this") {
            dispatch(setMonthSelect({ month: monthSelect.month, year: monthSelect.year }));
        }
        else if (option === 'last') {
            if (monthSelect.month > 1) dispatch(setMonthSelect({ month: monthSelect.month - 1, year: monthSelect.year }))
            else dispatch(setMonthSelect({ month: 12, year: monthSelect.year - 1 }))
        }
        else if (option === 'next') {
            if (monthSelect.month < 12) dispatch(setMonthSelect({ month: monthSelect.month + 1, year: monthSelect.year }))
            else dispatch(setMonthSelect({ month: 1, year: monthSelect.year + 1 }))
        }
    }
    useEffect(() => {
        let currentDate = new Date();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear()
        let timeSelect = getTimeByMonth(monthSelect.month, monthSelect.year);
        let startDate = changeDate(timeSelect.firstDay);
        let endDate = changeDate(timeSelect.lastDay);
        let timeSelectNext = getTimeByMonth(monthSelect.month + 1, monthSelect.year);
        let startDateNext = changeDate(timeSelectNext.firstDay);
        let endDateNext = changeDate(timeSelectNext.lastDay);
        let timeSelectLast = getTimeByMonth(monthSelect.month - 1, monthSelect.year);
        let startDateLast = changeDate(timeSelectLast.firstDay);
        let endDateLast = changeDate(timeSelectLast.lastDay);
        if (monthSelect.month === month && monthSelect.year === year) {
            setMonthDisplay({ last: t('Last Month'), this: t('This Month'), next: t('Next Month') })
        } else if (monthSelect.month === month + 1 && monthSelect.year === year) {
            setMonthDisplay({ last: t('This Month'), this: t('Next Month'), next: `${startDateNext} - ${endDateNext}` })
        } else if (monthSelect.month === month + 2 && monthSelect.year === year) {
            setMonthDisplay({ last: t('Next Month'), this: `${startDate} - ${endDate}`, next: `${startDateNext} - ${endDateNext}` })
        } else if (monthSelect.month === month - 1 && monthSelect.year === year) {
            setMonthDisplay({ last: `${startDateLast} - ${endDateLast}`, this: t('Last Month'), next: t('This Month') })
        } else if (monthSelect.month === month - 2 && monthSelect.year === year) {
            setMonthDisplay({ last: `${startDateLast} - ${endDateLast}`, this: `${startDate} - ${endDate}`, next: t('Last Month') })
        } else setMonthDisplay({ last: `${startDateLast} - ${endDateLast}`, this: `${startDate} - ${endDate}`, next: `${startDateNext} - ${endDateNext}` })
    }, [monthSelect])

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
    const [more, setMore] = useState(5)
    const [loadMore, setLoadMore] = useState(false)

    const load = () => {
        setMore((prevState) => prevState + 2)
    }

    useEffect(() => {
        setMore(5)
        setLoadMore(false)
    }, [walletSelect])

    useEffect(() => {
        const handleScroll = () => {
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight + 1 >= scrollHeight) {
                setTimeout(() => {
                    setLoadMore(true)
                    load()
                }, 500)

            } else {
                setLoadMore(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <div className='ml-[92px] px-4 mt-10'>
                <div className='flex justify-center gap-4'>
                    <div className={`component`}>
                        {allTransactionsAndType?.length > 0 ?
                            (
                                <>
                                    <div className="min-w-[350px] md:w-[600px] min-h-[300px] bg-zinc-100 rounded-md bg overflow-hidden">
                                        <div className="pt-4 bg-white">
                                            <div className="h-[48px] w-[600px] fomt-normal border-b flex justify-center "  >
                                                <button onClick={() => handleSelectMonth('last')} className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">{monthDisplay.last}</button>
                                                <button onClick={() => handleSelectMonth('this')} className="w-full py-[15px] uppercase leading-4 text-sm font-semibold border-b-4 border-lightgreen text-lightgreen">{monthDisplay.this}</button>
                                                <button onClick={() => handleSelectMonth('next')} className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">{monthDisplay.next}</button>
                                            </div>
                                            <div className="bg-zinc-100 mt-[48px] text-center">
                                                <div>
                                                    <div id='all-trans' className='bg-white text-zinc-600 text-sm font-medium text-center mb-8'>
                                                        <div>
                                                            <div className='flex justify-between px-4 py-2 '>
                                                                <span>{t("Inflow")}</span>
                                                                <span className='text-sky-500'>
                                                                    +{numeral(calculate.totalInflow).format(0, 0)} {walletSelect?.currency.sign}
                                                                </span>
                                                            </div>
                                                            <div className='flex justify-between px-4 py-2'>
                                                                <span>{t("Outflow")}</span>
                                                                <span className='text-red-500'>
                                                                    -{numeral(calculate.totalOutflow).format(0, 0)} {walletSelect?.currency.sign}
                                                                </span>
                                                            </div>
                                                            <div className='flex justify-end px-4 py-2'>
                                                                <span className='border-t-2 pl-4 py-2'>
                                                                    {numeral(calculate.totalInflow - calculate.totalOutflow).format(0, 0)} {walletSelect?.currency.sign}

                                                                </span>
                                                            </div>
                                                            <button onClick={handleViewReport} className='px-4 py-3 uppercase text-center text-lightgreen hover:cursor-pointer'>
                                                                {t("z")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* {allCategory?.length > 0 && allCategory.slice(0, more).map(category => {
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
                                                                        <div>{t(`${transactionsInCategory[0]?.category.name}`)}</div>
                                                                        <div className='text-xs text-zinc-400 font-normal'>{transactionsInCategory.length} {t("Trasactions")}</div>
                                                                    </span>
                                                                </div>
                                                                <span><p className='mt-3'>{transactionsInCategory[0].category.type === "expense" ? '-' : '+'}{numeral(totalAmount).format(0, 0)} {walletSelect?.currency.sign}</p></span>
                                                            </div>
                                                        );
                                                        return (
                                                            <div key={category.id} id='expense-trans' className='bg-white text-zinc-600 text-sm font-medium' >
                                                                <div className='mb-8'>
                                                                    {categoryInfo}
                                                                    {transactionsInCategory.map(item => (
                                                                        <a href="#">
                                                                            <div key={item.id} onClick={() => handleOpenSlide(walletSelect?.id, item.id)} className='flex justify-between px-4 py-2 border-t hover:bg-lime-50 cursor-pointer'>
                                                                                <div className='flex justify-start'>
                                                                                    <span className='w-10 h-10 mr-4 text-3xl font-light text-black'>{convertDate(item?.date).day}</span>
                                                                                    <span className='text-start'>
                                                                                        <div>{t(`${convertDate(item?.date).dayOfWeek}`)}, {convertDate(item?.date).month} {convertDate(item?.date).year}</div>
                                                                                        <div className='text-xs text-zinc-400 font-normal mt-1'>{item?.walletRole.user.email}</div>
                                                                                    </span>
                                                                                </div>
                                                                                <span>
                                                                                    {item.category.type === "expense" ?
                                                                                        <p className='mt-3 text-red-500'>-{numeral(item?.amount).format(0, 0)} {walletSelect?.currency.sign}</p>
                                                                                        :
                                                                                        <p className='mt-3 text-sky-500'>+{numeral(item?.amount).format(0, 0)} {walletSelect?.currency.sign}</p>
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        );
                                                    })} */}

                                                    {allTransactionsAndType?.length && allTransactionsAndType.slice(0, more).map(trans => {
                                                        let totalAmount = 0;
                                                        trans.forEach(tran => {
                                                            totalAmount += tran.amount
                                                        })
                                                        if (trans.length === 0) {
                                                            return null;
                                                        }
                                                        return (
                                                            <div key={trans.id} id='expense-trans' className='bg-white text-zinc-600 text-sm font-medium' >
                                                                <div className='mb-8'>
                                                                    <div className='flex justify-between px-4 py-3'>
                                                                        <div className='flex justify-start'>
                                                                            <img src={trans[0]?.category.icon} alt="" className='w-10 h-10 object-cover mr-4 rounded-full ' />
                                                                            <span className='text-start'>
                                                                                <div>{t(`${trans[0]?.category.name}`)}</div>
                                                                                <div className='text-xs text-zinc-400 font-normal'>{trans.length} {t("Trasactions")}</div>
                                                                            </span>
                                                                        </div>
                                                                        <span><p className='mt-3'>{trans[0].category.type === "expense" ? '-' : '+'}{numeral(totalAmount).format(0, 0)} {walletSelect?.currency.sign}</p></span>
                                                                    </div>
                                                                    {trans.map(item => (
                                                                        <a href="#">
                                                                            <div key={item.id} onClick={() => handleOpenSlide(walletSelect?.id, item.id)} className='flex justify-between px-4 py-2 border-t hover:bg-lime-50 cursor-pointer'>
                                                                                <div className='flex justify-start'>
                                                                                    <span className='w-10 h-10 mr-4 text-3xl font-light text-black'>{convertDate(item?.date).day}</span>
                                                                                    <span className='text-start'>
                                                                                        <div>{t(`${convertDate(item?.date).dayOfWeek}`)}, {convertDate(item?.date).month} {convertDate(item?.date).year}</div>
                                                                                        <div className='text-xs text-zinc-400 font-normal mt-1'>{item?.walletRole.user.email}</div>
                                                                                    </span>
                                                                                </div>
                                                                                <span>
                                                                                    {item.category.type === "expense" ?
                                                                                        <p className='mt-3 text-red-500'>-{numeral(item?.amount).format(0, 0)} {walletSelect?.currency.sign}</p>
                                                                                        :
                                                                                        <p className='mt-3 text-sky-500'>+{numeral(item?.amount).format(0, 0)} {walletSelect?.currency.sign}</p>
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    )
                                                    }

                                                    {!loadMore && allTransactionsAndType?.length > 5 ?
                                                        <CircularProgress />
                                                        : null}
                                                    <div style={{ height: '1vh' }}></div>


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
                                            <button onClick={() => handleSelectMonth('last')} className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">{monthDisplay.last}</button>
                                            <button onClick={() => handleSelectMonth('this')} className="w-full py-[15px] uppercase leading-4 text-sm font-semibold border-b-4 border-lightgreen text-lightgreen">{monthDisplay.this}</button>
                                            <button onClick={() => handleSelectMonth('next')} className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">{monthDisplay.next}</button>
                                        </div>
                                        <div className="bg-zinc-100 text-center">
                                            <div>
                                                <span id="iconRotage" className="font-semibold text-[112px] pb-5 text-center inline-block text-zinc-500">{':-)'}</span>
                                            </div>
                                            <span className="text-2xl inline-block text-zinc-400"> {t("No transactions")}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    {(transactionSelect && checked && allTransactionsAndType?.length > 0) ?
                        <div className=''>
                            <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                                <Card variant="outlined" className='md:w-[750px] min-h-[250px]'>
                                    <div className='flex text-center justify-between mx-3 py-2 border-b'>
                                        <div className='text-center'>
                                            <Button sx={{ color: "black" }}
                                                onClick={handleCloseSlide}><ClearIcon
                                                    sx={{ float: "left" }} /></Button>
                                            <span className='ml-4 font-semibold text-xl h-[37px] '>{t("Transaction details")}</span>
                                        </div>
                                        <Stack direction="row" sx={{ float: "right" }} spacing={2}>
                                            <ModalDeleteTrans sx={{ height: "402px" }}
                                                idWallet={walletSelect?.id}
                                                onClose={() => handleCloseSlide} />
                                            <Button onClick={handleOpenFormUpdate} color='success'>{t("edit")}</Button>
                                        </Stack>
                                    </div>
                                    <div className='text-center flex'>
                                        <div className='pl-4 mt-3'>
                                            <img src={transactionSelect?.category.icon}
                                                style={{
                                                    width: "50px", height: "50px", margin: "15px", float: "left"
                                                }} alt="" />
                                        </div>
                                        <div style={{ textAlign: "left", margin: "15px" }}>
                                            <div className='font-normal text-2xl'>{t(`${transactionSelect?.category.name}`)}</div>
                                            <div className='text-sm font-medium min-h-[20px]'>{transactionSelect?.walletRole.wallet.name} </div>
                                            <div className='text-xs py-2 border-b min-w-[200px]'>{transactionSelect?.date} </div>
                                            <div className='text-xs pt-2'>{transactionSelect?.note} </div>
                                            <div className='pt-2'>{transactionSelect?.category.type === "expense" ? <span className='text-4xl text-red-500 font-medium'>-{numeral(transactionSelect?.amount).format(0, 0)} {walletSelect?.currency.sign}</span> : <span className='text-4xl text-sky-500 font-medium'>+{numeral(transactionSelect?.amount).format(0, 0)}{walletSelect?.currency.sign}</span>}  </div>
                                        </div>
                                    </div>
                                    <div className='px-10'>
                                        <div className='flex text-center gap-8 my-4'>
                                            <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" className='w-10 h-10'
                                                alt="" />
                                            <div className='border-t w-full text-start py-2'>
                                                <span className='font-semibold text-sm'>
                                                    {transactionSelect.walletRole.user.email}
                                                </span>
                                            </div>

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