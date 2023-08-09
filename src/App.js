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
            <Route path={"/login"} element={!user ? <LoginOrRegister props={true}/> : <Navigate to='/'/>}/>
            <Route path={"/register"} element={!user ? <LoginOrRegister props={false}/> : <Navigate to='/'/>}/>
            <Route path={"/my-wallets"} element={user ? <MyWallet/>: <Navigate to='/login'/>}></Route>
            <Route path={"*"} element={user ? <Navigate to='/login'/>: <Navigate to='/'/>}/>

        </Routes>
    );
}

export default App;
