import { Slide } from "@mui/material";
import StackedBarChart from "../chart/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TransactionService } from "../../services/transaction.service";
import { getDataBarChart } from "../../redux/reportSlice";
import { parseDate } from "../datePick/datePick";
import numeral from 'numeral';
import DoughnutChart from "../chart/DoughnutChart";

function convertFormatDate(dateString) {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}

function convertDateFormat(inputDate) {
    const parts = inputDate.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    const newDate = `${year}-${month}-${day}`;
    return newDate;
}

function getAllDayOrMonth(firstDay, lastDay) {
    const startDate = convertFormatDate(firstDay);
    const endDate = convertFormatDate(lastDay);
    const allDates = [];
    const startMonth = startDate.getMonth() + 1;
    const endMonth = endDate.getMonth() + 1;
    if (startMonth !== endMonth) {
        for (let i = startMonth; i <= endMonth; i++) {
            allDates.push(i)
        }
        return { tag: 'month', data: allDates };
    }
    while (startDate <= endDate) {
        allDates.push(startDate.getDate());
        startDate.setDate(startDate.getDate() + 1);
    }
    return { tag: 'day', data: allDates }
}

function getDataBar(dayArr, data) {
    let dataInCome = [];
    let dataExpense = [];
    dayArr.data.forEach(day => {
        let date;
        let income = 0;
        let expense = 0;
        data.forEach(trans => {
            if (dayArr.tag === 'day') {
                date = parseDate(trans.date).getDate();
            } else {
                date = parseDate(trans.date).getMonth() + 1;
            }
            if (day === date) {
                if (trans.category.type === 'income') {
                    income += trans.amount
                } else {
                    expense -= trans.amount
                }
            }
        })
        dataInCome.push(income);
        dataExpense.push(expense);
    })
    return { dataInCome, dataExpense }
}

function viewBalance(dataIntime, dataBefore) {
    let totalIncome = 0;
    let totalExpense = 0;
    let openingBalance = 0;
    let endingBalance = 0;
    if (dataBefore.length === 0) openingBalance = 0
    else {
        dataBefore.forEach(trans => {
            if (trans.category.type === 'income') {
                openingBalance += trans.amount
            } else {
                openingBalance -= trans.amount
            }
        });
    }
    dataIntime.forEach(trans => {
        if (trans.category.type === 'income') {
            totalIncome += trans.amount
        } else {
            totalExpense -= trans.amount
        }
    })
    endingBalance = openingBalance + totalIncome + totalExpense;
    return { totalIncome, totalExpense, openingBalance, endingBalance };
}

export default function ReportsCard() {
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    const dateSelect = useSelector(state => state.report.dateSelect);
    const [dayArr, setDayArr] = useState(getAllDayOrMonth(dateSelect?.firstDay, dateSelect?.lastDay));
    const [balance, setBalance] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        let firstDay = convertDateFormat(dateSelect?.firstDay);
        let lastDay = convertDateFormat(dateSelect?.lastDay);
        TransactionService.getTransactionsByTimeRange(walletSelect?.id, firstDay, lastDay).then(res => {
            let transactionList = res.data.transactionList;
            let transactionListBefore = res.data.transactionListBefore;
            let days = getAllDayOrMonth(dateSelect?.firstDay, dateSelect?.lastDay);
            let data = getDataBar(days, transactionList);
            let balance = viewBalance(transactionList, transactionListBefore);
            setBalance(balance);
            setDayArr(days);
            dispatch(getDataBarChart(data))
        })
    }, [dateSelect, walletSelect]);

    return (
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <div className='ml-[92px] px-4 mt-8'>
                <div className='flex justify-center gap-4'>
                    <div className={`component`}>
                        <div className="min-w-[350px] md:w-[665px] min-h-[800px] bg-white rounded shadow-lg overflow-hidden">
                            <div className="p-6">
                                <div className="grid grid-cols-2">
                                    <div className="text-center">
                                        <p className=" text-graynew">Opening balance</p>
                                        <p className="font-medium">{numeral(balance?.openingBalance).format('0,0')} {walletSelect?.currency.sign}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className=" text-graynew">Ending balance</p>
                                        <p className="font-medium">{numeral(balance?.endingBalance).format('0,0')} {walletSelect?.currency.sign}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border-y">
                                <button className="hover:bg-lightlime w-full">
                                    <div className="py-2">
                                        <p className="text-graynew">Net Income</p>
                                        <p className="text-2xl">
                                            {(balance?.totalIncome + balance?.totalExpense) > 0 ? '+' : ''}
                                            {numeral(balance?.totalIncome + balance?.totalExpense).format('0,0')}
                                            {walletSelect?.currency.sign}
                                        </p>
                                    </div>
                                    <div className='w-full h-[250px] flex justify-center'>
                                        <StackedBarChart label={dayArr.data} />
                                    </div>
                                </button>
                            </div>
                            <div className="grid grid-cols-2">
                                <button className="hover:bg-lightlime w-full">
                                    <div className="py-4">
                                        <p className="text-graynew">Income</p>
                                        <p className="text-md text-sky-500">+{numeral(balance?.totalIncome).format('0,0')} {walletSelect?.currency.sign}</p>
                                        <div className="">
                                            <div className="h-[200px]">
                                                <DoughnutChart />
                                            </div>
                                        </div>
                                    </div>
                                </button>
                                <button className="hover:bg-lightlime w-full">
                                    <div className="py-2">
                                        <p className="text-graynew">Expense</p>
                                        <p className="text-md text-red-500">{numeral(balance?.totalExpense).format('0,0')} {walletSelect?.currency.sign}</p>
                                        <div className="">
                                            <div className="h-[200px]">
                                                <DoughnutChart />
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    );
}