import {AppBar, IconButton, Slide, Toolbar, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import * as React from "react";
import {Link} from "react-router-dom";
import WalletSelectModal from "../modals/WalletSelectModal";
import {setWalletSelect} from "../../redux/walletSlice";
import WalletSelectTransactionModal from "../transactions/WalletSelectTransaction";
import {useDispatch, useSelector} from "react-redux";
import CategorySelectModal from "../transactions/CategorySelectModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {useState} from "react";
import SelectTimeRangeModal from "../modals/SelectTimeRangeModal";
import FilterMoney from "../layout/search/FilterMoney";
import Slider from "../layout/search/DemoSlider";

export default function NavbarSearch() {
    const dispatch = useDispatch();
    const [categorySelect, setCategorySelect] = React.useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dateSelect = useSelector(state => state.report.dateSelect);
    const [dataInput, setDataInput] = React.useState({note: ''});


    const handleSelectWallet = (wallet) => {
        dispatch(setWalletSelect(wallet));
    }
    const handleSelectCategory = (category) => {
        setCategorySelect(category)
    }
    const handleOpenTimeRangeModal = () => {
        setIsOpenModal(true);
    }
    const handleCloseTimeRangeModal = () => {
        setIsOpenModal(false)
    }
    const handleChangeAdd = (e) => {
        let data = {...dataInput, [e.target.name]: e.target.value};
        setDataInput(data);
        // handleCheckValid(e);
    }

    return (<div className="navbarSearch">
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <AppBar sx={{position: 'relative', backgroundColor: "white", color: "black"}}>
                <Toolbar>
                    <Link to="/">
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="close"
                        >
                            <ArrowBackIcon/>
                        </IconButton>
                    </Link>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Search for transaction
                    </Typography>
                </Toolbar>
                <div>
                    <div className=" mx-20 my-5 grid grid-cols-4 gap-2">
                        <div
                            className='w-[300px] mr-4 py-1 pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500 hover:cursor-pointer'>
                            <WalletSelectTransactionModal walletTransSelect={handleSelectWallet}/>
                        </div>
                        <div
                            className='w-[300px] mr-4 py-1 pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500 hover:cursor-pointer'>
                            <CategorySelectModal selectCategory={handleSelectCategory}/>
                        </div>
                        <div
                            className='w-[300px] py-[7.25px] pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500'>
                            <button onClick={handleOpenTimeRangeModal}>
                                <p className='text-[12px] pb-[3px] text-slate-400 text-start'>Date</p>
                                <div className='wrap-text-icon'>
                                    <div className='flex justify-center items-center'>
                                        <span
                                            className="text-input text-start">{dateSelect?.firstDay} - {dateSelect?.lastDay}</span>

                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div
                            className='w-[300px] py-[7.25px] pl-4 pr-3 border border-gray-300 rounded-lg hover:border-gray-500'>
                            <p className='text-[12px] pb-[3px] text-slate-400'>Note</p>
                            <div className='pb-1'>
                                <input onChange={handleChangeAdd}
                                       className='inputAdd w-full h-[26px] text-[17px] focus:outline-none' tabIndex="-1"
                                       type="text" placeholder='Note' name="note" value={dataInput.note}/>
                            </div>
                        </div>
                    </div>
                    <div className=" mx-20 my-5 grid grid-cols-2 gap-2">
                        {/*<FilterMoney/>*/}
                        <Slider/>
                    </div>

                </div>

                <SelectTimeRangeModal onOpen={isOpenModal} onClose={handleCloseTimeRangeModal}/>
            </AppBar>
        </Slide>
    </div>)
}