
import * as React from 'react';
import { useSelector } from 'react-redux';


export default function WalletSelectTransactionUpdateModal() {
    const walletTransactionSelect = useSelector(state => state.wallet.walletSelect);

    return (
        <React.Fragment>
            <div>
                <p className='text-[12px] pb-[3px] text-slate-400 text-start'>Transaction Wallet</p >
                <div className='wrap-text-icon'>
                    <div className='flex justify-center items-center'>
                        {walletTransactionSelect &&
                            <>
                                <img src={walletTransactionSelect?.icon.icon} className="w-6 h-6 object-cover mr-4 rounded-full" alt='icon-flag' />
                                <span className="text-input text-start">{walletTransactionSelect?.name}</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}