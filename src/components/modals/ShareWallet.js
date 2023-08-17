import {Box} from "@mui/material";
import * as React from "react";
import Modal from "@mui/material/Modal";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import { getMessage } from "../../redux/walletSlice";

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

export default function ShareWallet({isOpen, onClose}) {

    const [permission, setPermission] = React.useState('');
    const socket = useSelector(state => state.wallet.socket);
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    const user = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();

    const [dataInput, setDataInput] = useState()

    const handleChange = (event) => {
        setPermission(event.target.value);
    };

    const handleChangeInput = (e) => {
        let data = {...dataInput, [e.target.name]: e.target.value};
        setDataInput(data)
    }
    const handleShare = () => {
        let senderEmail = user.email;
        let walletInfo = walletSelect;
        let receiverEmail = dataInput?.email;
        let message = dataInput?.note;
        // localStorage.setItem(`sendMessage_${user.id}`, {senderEmail, receiverEmail, message, walletInfo, permission})
        onClose();
        socket?.emit('sendMessage', {senderEmail, receiverEmail, message, walletInfo, permission});

        const newSendMessage = {id: Date.now(), senderEmail, receiverEmail, message, walletInfo, permission};
    }

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 496}}>
                    <div className='px-6 py-5 border-b-[1px] border-gray-300'>
                        <p className='text-xl font-semibold'>Share wallet </p>
                    </div>
                    <div className='p-6'>
                        <div className="grid grid-cols-2 gap-2">
                            <Box sx={{minWidth: 120}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Permission</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={permission}
                                        label="Age"
                                        sx={{height: "63px", borderRadius: "8px"}}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="using">using</MenuItem>
                                        <MenuItem value="viewer">viewer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <div className='flex item-center justify-center'>
                                <div
                                    className='mb-4 py-[5px] px-[15px] border w-full border-gray-300 rounded-lg hover:border-gray-500 hover: cursor-pointer'>
                                    <p className='text-[12px] pb-[3px] text-slate-400'>email </p>
                                    <div className='pb-1'>
                                        <input onChange={handleChangeInput}
                                               className='inputAdd w-full h-[27px] text-[17px] focus:outline-none'
                                               tabIndex="-1" type="email" name="email" value={dataInput?.email}
                                               placeholder="Reciever email" id="note"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex item-center justify-center'>
                            <div
                                className='mb-4 py-[5px] px-[15px] border w-full border-gray-300 rounded-lg hover:border-gray-500 hover: cursor-pointer'>
                                <p className='text-[12px] pb-[3px] text-slate-400'>Note</p>
                                <div className='pb-1'>
                                    <input onChange={handleChangeInput}
                                           className='inputAdd w-full h-[27px] text-[17px] focus:outline-none'
                                           tabIndex="-1" type="text" name="note" value={dataInput?.note}
                                           placeholder="node" id="note"/>
                                </div>
                            </div>
                        </div>

                        <div className='pt-[13px] pb-5 flex text-center'>
                            <input className='w-4 h-4 hover: cursor-pointer mt-1' type="checkbox" name="vehicle1"
                                   value="Bike" required/>
                            <div className='ml-3'>
                                <p>Chấp nhận điều khoản</p>
                            </div>
                        </div>
                    </div>
                    <div className='py-[14px] px-6 flex justify-end'>
                        <button onClick={handleShare} type='button'
                                className='bg-lightgreen text-white text-sm font-medium py-2 px-8 uppercase rounded disabled:bg-slate-400'>Save
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}