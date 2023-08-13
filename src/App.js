import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import LoginOrRegister from './pages/LoginOrRegister';
import MyWallet from './pages/wallets/MyWallet';
import HomePage from "./pages/homePage";
import {useSelector} from "react-redux";
import Chart from "./components/chart/chartDemo";
import Reports from './pages/reports/Reports';

function App() {
    const auth = useSelector(state => state.auth.login.success);
    return (
        <Routes>
            <Route path={"/"} element={auth ? <HomePage/>: <Navigate to='/login'/>}/>
            <Route path={"/login"} element={!auth ? <LoginOrRegister props={true}/> : <Navigate to='/'/>}/>
            <Route path={"/register"} element={!auth ? <LoginOrRegister props={false}/> : <Navigate to='/'/>}/>
            <Route path={"/my-wallets"} element={auth ? <MyWallet/>: <Navigate to='/login'/>}></Route>
            <Route path={"/chart"} element={<Chart/>}></Route>
            <Route path={"/reports"} element={auth ? <Reports/> : <Navigate to='/login'/>}></Route>
            <Route path={"*"} element={auth ? <Navigate to='/login'/>: <Navigate to='/'/>}/>

        </Routes>
    );
}

export default App;
