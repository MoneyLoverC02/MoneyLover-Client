import {Route, Routes} from 'react-router-dom';
import './App.css';
import LoginOrRegister from './pages/LoginOrRegister';
import MyWallet from './pages/wallets/MyWallet';

function App() {
    return (
        <Routes>
            <Route path={"/login"} element={<LoginOrRegister props={true}/>}/>
            <Route path={"/register"} element={<LoginOrRegister props={false}/>}/>
            <Route path={"/my-wallets"} element={<MyWallet/>}></Route>
        </Routes>
    );
}

export default App;
