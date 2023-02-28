import './App.css';
import Header from './components/Header/Header';
import LogInForm from './components/LogInForm/LogInForm';
import {useEffect} from "react";
import {store} from "./index";


function App() {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <div className='body'>
            <Header/>
            <LogInForm/>
        </div>
    );
}

export default App;
