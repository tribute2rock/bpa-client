import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import permissions from '../../../../../values/permission';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
import { ControlledRoute } from '../../../../components/ControlledRoute';
import { BranchCreate } from './BranchCreate';
import { BranchList } from './BranchList';

export default function BranchPage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/branch" exact permission={permissions.ViewAllBranches} component={BranchList} />
        <ControlledRoute
          path="/branch/add"
          exact
          permission={permissions.CreateBranch}
          component={() => <BranchCreate {...props} title="Add New Branch" />}
        />
        <ControlledRoute
          path="/branch/edit"
          exact
          permission={permissions.UpdateBranch}
          component={() => <BranchCreate {...props} title="Update Branch" />}
        />
      </Switch>
    </Suspense>
  );
}
