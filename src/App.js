import './App.css';
import {Route, Routes} from 'react-router-dom';
import LoginOrRegister from './pages/LoginOrRegister';
import MyWallet from './pages/wallets/MyWallet';
import HomePage from "./pages/homePage";
import MyWallets from './components/layout/MyWallets';

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<HomePage/>}/>
            <Route path={"/login"} element={<LoginOrRegister props={true}/>}/>
            <Route path={"/register"} element={<LoginOrRegister props={false}/>}/>
            <Route path={"/my-wallets"} element={<MyWallet/>}></Route>
        </Routes>
    );
}

export default App;
