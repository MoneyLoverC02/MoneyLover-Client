import {  Card } from "@mui/material";

export default function AcceptCard() {

    return (
        <div className="">
            <Card variant="outlined" className='md:w-[650px] mx-auto mt-10 pb-4'>
                <div className='flex text-center justify-between mx-3 my-4 px-4'>
                    <div className='text-center flex items-center'>
                        <div>
                            <img src="https://static.moneylover.me/img/icon/icon.png" className='w-12 h-12' alt="" />
                        </div>
                        <div className="flex-col justify-items-center text-start ml-4">
                            <div className=' font-semibold text-lg'>tranthekhiem</div>
                            <div className=' font-semibold text-xs text-graynew'>tranthekhiem@gmail.com</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-8 py-2 bg-slate-200 rounded text-lightgreen font-semibold">REJECT</button>
                        <button className="px-8 py-2 bg-lightgreen rounded text-white font-semibold">ACCEPT</button>
                    </div>
                </div>
                <div className="border rounded ml-28 mr-10 mt-4 p-2 px-4">
                    <div className="mb-4">abc</div>
                    <div className='text-center flex items-center pb-2'>
                        <div>
                            <img src="https://static.moneylover.me/img/icon/icon.png" className='w-10 h-10' alt="" />
                        </div>
                        <div className="flex-col justify-items-center text-start ml-4">
                            <p className=' font-semibold text-base'>tranthekhiem</p>
                            <p className=' font-semibold text-xs text-graynew'>111,111,111 đ</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}