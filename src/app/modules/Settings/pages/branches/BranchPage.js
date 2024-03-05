import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import BranchesList from './BranchesList';
import permissions from '../../../../../values/permission';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
import { ControlledRoute } from '../../../../components/ControlledRoute';

export default function BranchPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/branches" exact permission={permissions.ViewLdapBranches} component={BranchesList} />
      </Switch>
    </Suspense>
  );
}
