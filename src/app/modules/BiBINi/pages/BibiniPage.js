import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { LayoutSplashScreen } from '../../../../_metronic/layout';
import { ControlledRoute } from '../../../components/ControlledRoute';
import permissions from '../../../../values/permission';
import { BibiniList } from './bibini/BibiniList';

export default function BibiniPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute
          path="/bibini-requests"
          exact
          permission={permissions.CanViewBibiniRequests}
          component={BibiniList}
        />
      </Switch>
    </Suspense>
  );
}
