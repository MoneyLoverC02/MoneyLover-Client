import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = () => {
    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
        datasets: [
            {
                label: 'Doanh thu',
                data: [500, 800, 1200, 700, 1500],
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Biểu đồ doanh thu</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Chart;
