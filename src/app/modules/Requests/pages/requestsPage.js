import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LayoutSplashScreen, ContentRoute } from '../../../../_metronic/layout';
import { RequestsPage } from './requests/RequestPage';
import { RequestsList } from './requests/RequestList';
import { RequestView } from './requests/RequestView';
import { ControlledRoute } from '../../../components/ControlledRoute';
import { DraftRequestEdit } from './requests/DraftRequestEdit';
import permissions from '../../../../values/permission';

export default function requestPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute
          path="/requests"
          canHaveAny={[permissions.ViewAllRequests, permissions.ViewRequests]}
          exact
          component={RequestsList}
        />
        <ControlledRoute
          path="/internal-requests"
          canHaveAny={[permissions.ViewAllRequests, permissions.ViewRequests]}
          exact
          component={RequestsList}
        />
        <ControlledRoute
          path="/corporate-requests"
          canHaveAny={[permissions.ViewAllRequests, permissions.ViewRequests]}
          exact
          component={RequestsList}
        />
        <ControlledRoute path="/requests/view" permission={permissions.ViewRequest} exact component={RequestView} />
        <ControlledRoute path="/requests/view/:id" permission={permissions.ViewRequest} exact component={RequestView} />
        <Route path="/requests/edit" exact component={DraftRequestEdit} />
      </Switch>
    </Suspense>
  );
}
