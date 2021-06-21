import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import SubscriptionPlans from "./pages/SubscriptionPlans";
import Payment from "./pages/Payment";
import PurchaseConfirmation from "./pages/PurchaseConfirmation";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/subscription-plans" component={SubscriptionPlans} />
        <Route exact path="/payment" component={Payment} />
        <Route
          exact
          path="/purchase-confirmation"
          component={PurchaseConfirmation}
        />
        <Route exact path="/">
          <Redirect to="/subscription-plans" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
