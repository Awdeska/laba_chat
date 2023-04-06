import {Route, Routes} from 'react-router-dom'
import RegistrationPage from "../pages/RegistrationPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/">
                <RegistrationPage />
            </Route>
        </Routes>
    );
};

export default AppRoutes