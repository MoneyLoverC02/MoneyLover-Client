import './App.css';
import {Route, Routes} from 'react-router-dom';
import NavBar from "./components/layout/NavBar";
import Sidebar from "./components/layout/Sidebar";
import LoginOrRegister from './pages/LoginOrRegister';
import NestedModal from './components/NestedModal';
import HomePage from "./pages/homePage";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<HomePage/>}/>
            <Route path={"/login"} element={<LoginOrRegister props={true}/>}/>
            <Route path={"/register"} element={<LoginOrRegister props={false}/>}/>
            <Route path={"/create"} element={<NestedModal/>}></Route>
        </Routes>
    );



}

export default App;
