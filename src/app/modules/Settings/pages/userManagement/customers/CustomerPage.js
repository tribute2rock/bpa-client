import React, { Suspense } from 'react';
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import { Switch } from 'react-router-dom';
import { ControlledRoute } from '../../../../../components/ControlledRoute';
import permissions from '../../../../../../values/permission';
import CustomersList from './CustomersList';
import CustomerAdd from './CustomerAdd';
import UserEdit from './UsersEdit';

export default function UserPage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute
          path="/customers"
          exact
          permission={permissions.ViewAllUsers}
          component={() => <CustomersList {...props} title="List Custoers" />}
        />
        <ControlledRoute
          path="/customers/new"
          exact
          permission={permissions.CreateUser}
          component={() => <CustomerAdd {...props} title="Add Customer" />}
        />
        <ControlledRoute
          path="/customers/edit"
          exact
          permission={permissions.UpdateUser}
          component={() => <UserEdit {...props} title="Edit Customer" />}
        />
      </Switch>
    </Suspense>
  );
}
