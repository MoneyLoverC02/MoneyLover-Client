import * as React from 'react';
import { Box, Modal } from '@mui/material';
import { changeDate, formatDate } from '../datePick/datePick';
import { useDispatch } from 'react-redux';
import { setDateSelect } from '../../redux/reportSlice';


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

export function getTime(option) {
    let currentDate = new Date();
    let time = {};
    if (option === 'This month') {
        time.firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        time.lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    } else if (option === 'Last month') {
        time.firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        time.lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() , 0);
    } else {
        time.firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
        time.lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    }

  return time;
}

let dataRangeThisMonth = `${changeDate(getTime('This month').firstDay)} - ${changeDate(getTime('This month').lastDay)}`;
let dataRangeLastMonth = `${changeDate(getTime('Last month').firstDay)} - ${changeDate(getTime('Last month').lastDay)}`;
let dataRangeLast3Month = `${changeDate(getTime('Last 3 months').firstDay)} - ${changeDate(getTime('Last 3 months').lastDay)}`;

export default function SelectTimeRangeModal({ onOpen, onClose }) {
    const dispatch = useDispatch()

    const handleClose = () => {
        onClose();
    };
    const handleSelectTime = (option) => {
        let time = getTime(option);
        let firstDay = changeDate(time.firstDay);
        let lastDay = changeDate(time.lastDay);
        dispatch(setDateSelect({firstDay, lastDay, name: option}));
        handleClose();
    }

    return (
        <div>
            <Modal
                open={onOpen}
                onClose={onClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 496, minHeight: 500 }}>
                    <div className='flex justify-start items-center'>
                        <span onClick={handleClose} className='mt-1 w-12 h-12 flex justify-center items-center cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                        <span className='tracking-wide font-medium text-[20px] ml-4'>Select time range</span>
                    </div>
                    <div className='flex justify-center items-center'>
                    </div>
                    <div className='scroll-smooth'>
                        <button onClick={() => handleSelectTime('This month')} className='w-full text-start px-8 py-4 border-y hover:bg-lightlime'>
                            <p>This month</p>
                            <p>{dataRangeThisMonth}</p>
                        </button>
                        <button onClick={() => handleSelectTime('Last month')} className='w-full text-start px-8 py-4 border-y hover:bg-lightlime'>
                            <p>Last month</p>
                            <p>{dataRangeLastMonth}</p>
                        </button>
                        <button onClick={() => handleSelectTime('Last 3 months')} className='w-full text-start px-8 py-4 border-y hover:bg-lightlime'>
                            <p>Last 3 months</p>
                            <p>{dataRangeLast3Month}</p>
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}