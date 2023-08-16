import React, { useState } from 'react';
import { Range } from 'react-range';

const Slider = () => {
    const [values, setValues] = useState([0, 100]);

    const handleChange = (newValues) => {
        setValues(newValues);
    };

    return (
        <div style={{ margin: '20px' }}>
            <h2>Slider Example</h2>
            <Range
                values={values}
                step={1}
                min={0}
                max={100}
                onChange={handleChange}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            backgroundColor: '#666666'
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{values[0]}</span>
                <span>{values[1]}</span>
            </div>
        </div>
    );
};

export default Slider;