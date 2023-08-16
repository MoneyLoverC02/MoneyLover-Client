import React, {useEffect, useState} from 'react';
import {Range} from 'react-range';
import {useSelector} from "react-redux";

const Slider = () => {
    const allTransaction = useSelector(state => state.transaction.allTransaction);
    const walletSelect = useSelector(state => state.wallet.walletSelect);
    const [minObject,setMinObject] = useState(allTransaction[0]?.amount||0)
    const [maxObject,setMaxObject] = useState(allTransaction[0]?.amount||100)
    const [values, setValues] = useState([minObject, maxObject]);
    useEffect(() => {
        setMaxObject(allTransaction[0].amount)
        allTransaction?.forEach((item) =>{
            if (item.amount<minObject){
                setMinObject(item.amount)
            }
            if (item.amount>maxObject){
                setMaxObject(item.amount)
            }
        })
        setValues([minObject , maxObject])

    }, [walletSelect, allTransaction]);
    if (minObject === maxObject){
        let max =minObject+100
        setMaxObject(max)
    }

    const handleChange = (newValues) => {
        setValues(newValues);
    };

    return (
        <div style={{margin: '20px'}}>
            <h2>Slider Example</h2>
            <Range
                values={values}
                step={1}
                min={minObject}
                max={maxObject}
                onChange={handleChange}
                renderTrack={({props, children}) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '4px',
                            width: '100%',
                            backgroundColor: '#666666'
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({props}) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '20px',
                            width: '20px',
                            backgroundColor: '#e4e4e4',
                            borderRadius: '50%'
                        }}
                    />
                )}
            />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span>{values[0]}</span>
                <span>{values[1]}</span>
            </div>
        </div>
    );
};

export default Slider;