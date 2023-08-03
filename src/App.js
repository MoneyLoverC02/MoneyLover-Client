import {Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from "./pages/Register";
import NestedModal from './components/NestedModal';

function App() {
    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/create"} element={<NestedModal/>}></Route>
        </Routes>
    );

}

export default App;
