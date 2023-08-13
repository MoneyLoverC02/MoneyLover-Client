import React from 'react';
import { Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';

import PieChartOutlabelsPlugin from '@energiency/chartjs-plugin-piechart-outlabels';
Chart.register(PieChartOutlabelsPlugin);

let dataChart = [
    { value: 30, icon: 'https://static.moneylover.me/img/icon/ic_category_foodndrink.png' },
    { value: 20, icon: 'https://static.moneylover.me/img/icon/ic_category_foodndrink.png' },
    { value: 40, icon: 'https://static.moneylover.me/img/icon/ic_category_foodndrink.png' },
    { value: 10, icon: 'https://static.moneylover.me/img/icon/ic_category_foodndrink.png' },
];

const DoughnutChart = () => {
    const backgroundColors = ['#335C5C', '#45D6AB', '#2CC6EA', '#1A2728', '#E06D50', '#EFF9F1', '#9AB89A', '#2F8D85', '#BD8452', '#2CC6D5'];
    const data = {
        labels: dataChart.map(item => item.label),
        datasets: [
            {
                // labels: dataChart.map(item => item.icon),
                data: dataChart.map(item => item.value),
                backgroundColor: backgroundColors,
                borderColor: backgroundColors,
                borderWidth: 0
            },
        ],
    };




    const options = {
        layout: {
            padding: 55
        },
        cutout: '50%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false,
            },
            outlabels: {
                text: '%l ',
                display: true,
                color: 'black',
                stretch: 20,
                backgroundColor: (context) => backgroundColors[context.dataIndex]
            },
        },
    };

    return (
        <>
            <Doughnut data={data} options={options} />
        </>
    );
};

export default DoughnutChart;