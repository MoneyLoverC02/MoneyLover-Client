import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar, PieChart, Pie, Cell
} from 'recharts';

function Chart() {

    const data =
    [
        { name: 'Jan', sales: 100, color: '#FF5733' },
        { name: 'Feb', sales: 150, color: '#FFC300' },
        { name: 'Mar', sales: 200, color: '#36A2EB' },
        { name: 'Apr', sales: -250, color: '#4CAF50' },
        { name: 'May', sales: 300, color: '#9C27B0' },
        { name: 'Jun', sales: -350, color: '#FF9800' },
    ];
    const data1 = [
        { name: 'Jan', value: 100, color: '#FF5733' },
        { name: 'Feb', value: 150, color: '#FFC300' },
        { name: 'Mar', value: 200, color: '#36A2EB' },
        { name: 'Apr', value: 250, color: '#4CAF50' },
        { name: 'May', value: 300, color: '#9C27B0' },
        { name: 'Jun', value: 350, color: '#FF9800' },
    ];

    const COLORS = ['#FF5733', '#C70039', '#900C3F', '#581845', '#3498DB'];

    return (
        <div className="justify-center mx-60 my-60">
            <div>
                <h2>Monthly Sales</h2>
                <BarChart width={500} height={300} data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="sales">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
            <div>
                <h2>Monthly Sales Distribution</h2>
                <PieChart width={500} height={300}>
                    <Pie
                        data={data1}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                    >
                        {data1.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </div>

        </div>
    );
}

export default Chart;
