import React, { Suspense } from 'react';
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import { Switch } from 'react-router-dom';
import { ControlledRoute } from '../../../../../components/ControlledRoute';
import permissions from '../../../../../../values/permission';
import { RolesList } from './RolesList';
import { RolesAdd } from './RolesAdd';

export default function RolePage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/roles" exact permission={permissions.ViewAllRoles} component={RolesList} />
        <ControlledRoute
          path="/roles/new"
          exact
          permission={permissions.CreateRole}
          component={() => <RolesAdd {...props} title="Add Role" />}
        />
        <ControlledRoute
          path="/roles/edit"
          exact
          permission={permissions.UpdateRole}
          component={() => <RolesAdd {...props} title="Edit Role" />}
        />
      </Switch>
    </Suspense>
  );
}
