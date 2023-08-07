import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import LoginOrRegister from './pages/LoginOrRegister';
import MyWallet from './pages/wallets/MyWallet';
import HomePage from "./pages/homePage";
import {useSelector} from "react-redux";

function App() {
    const user = useSelector(state => state.auth.login.currentUser)
    return (
        <Routes>
            <Route path={"/"} element={user ? <HomePage/>: <Navigate to='/login'/>}/>
            <Route path={"/login"} element={<LoginOrRegister props={true}/>}/>
            <Route path={"/register"} element={<LoginOrRegister props={false}/>}/>
            <Route path={"/my-wallets"} element={user ? <MyWallet/>: <Navigate to='/login'/>}></Route>
        </Routes>
    );
}

export default App;
