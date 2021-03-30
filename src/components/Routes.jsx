import { Suspense } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from "../dataBase/routes";
// import HomePage from "../pages/HomePage";

const Routes = () => {
    return (
        <Suspense fallback="waiting">
            <Switch>
                {routes.map(route => <Route {...route} />)}
            </Switch>
        </Suspense>

    );
}

export default Routes;