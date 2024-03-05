import React, { Suspense } from 'react';
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import { Switch } from 'react-router-dom';
import { ControlledRoute } from '../../../../../components/ControlledRoute';
import permissions from '../../../../../../values/permission';
import UsersList from './UsersList';
import UsersAdd from './UsersAdd';
import UserEdit from './UsersEdit';

export default function CustomerPage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute
          path="/users"
          exact
          permission={permissions.ViewAllUsers}
          component={() => <UsersList {...props} title="List User" />}
        />
        <ControlledRoute
          path="/users/new"
          exact
          permission={permissions.CreateUser}
          component={() => <UsersAdd {...props} title="Add User" />}
        />
        <ControlledRoute
          path="/users/edit"
          exact
          permission={permissions.UpdateUser}
          component={() => <UserEdit {...props} title="Edit User" />}
        />
      </Switch>
    </Suspense>
  );
}
