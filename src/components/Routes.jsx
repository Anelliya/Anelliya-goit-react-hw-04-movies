import { Suspense } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from "../dataBase/routes";

const Routes = () => {
    return (
        <Suspense fallback="waiting">
            <Switch>
                {routes.map(route => <Route {...route} />)}
                < Redirect to='/' />
            </Switch>
        </Suspense>

    );
}

export default Routes;