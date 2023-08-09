import AddTransactionModal from "./AddTransactionModal";

export default function TransactionCard({openModal, closeModal}) {
    return (
        <div className=" container mt-[66px] flex justify-center">
            <div className="mt-10 w-[600px] h-[300px] bg-zinc-100 rounded-md bg overflow-hidden">
                <div className="pt-4 bg-white">
                    <div className=" h-[48px] fomt-normal border-b flex justify-center mx">
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
                    <AddTransactionModal isOpen={openModal} onClose={closeModal}
                         />
            </div>
        </div>
    );
}