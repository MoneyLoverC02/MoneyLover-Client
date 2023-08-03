import {Route, Routes} from 'react-router-dom';
import './App.css';
import LoginOrRegister from './pages/LoginOrRegister';
import NestedModal from './components/modals/NestedModal';
function App() {
    return (
        <Routes>
            <Route path={"/login"} element={<LoginOrRegister props={true}/>}/>
            <Route path={"/register"} element={<LoginOrRegister props={false}/>}/>
            <Route path={"/create"} element={<NestedModal/>}></Route>
        </Routes>
    );
}

export default App;
