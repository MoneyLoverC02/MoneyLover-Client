import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import LoginOrRegister from './pages/LoginOrRegister';
import MyWallet from './pages/wallets/MyWallet';
import HomePage from "./pages/homePage";
import {useSelector} from "react-redux";
import Reports from './pages/reports/Reports';
import PageSearch from "./pages/PageSearch";
import VerifyRegister from "./pages/VerifyRegister";

function App() {
    const auth = useSelector(state => state.auth.login.success);
    return (
        <Routes>
            <Route path={"/"} element={auth ? <HomePage/>: <Navigate to='/login'/>}/>
            <Route path={"/login"} element={!auth ? <LoginOrRegister props={true}/> : <Navigate to='/'/>}/>
            {/*<Route path={"/login"} element={<LoginOrRegister props={true}/>}/>*/}
            <Route path={"/register"} element={!auth ? <LoginOrRegister props={false}/> : <Navigate to='/'/>}/>
            <Route path={"/my-wallets"} element={auth ? <MyWallet/>: <Navigate to='/login'/>}></Route>
            <Route path={"/reports"} element={auth ? <Reports/> : <Navigate to='/login'/>}></Route>
            <Route path={"/verify/:token"} element={<VerifyRegister/>}></Route>
            <Route path={"/search"} element={auth ? <PageSearch/> : <Navigate to='/'/>}></Route>
            <Route path={"*"} element={auth ? <Navigate to='/login'/>: <Navigate to='/'/>}/>
        </Routes>
    );
}

export default App;
