import { Suspense } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner'


import routes from "../dataBase/routes";
const loader = <Loader type="Bars" color="lightcoral" height={50} width={50} className="Loader" />;
// import HomePage from "../pages/HomePage";

const Routes = () => {
    return (
        <Suspense fallback={loader}>
            <Switch>
                {routes.map(route => <Route {...route} />)}
            </Switch>
        </Suspense>

    );
}

export default Routes;