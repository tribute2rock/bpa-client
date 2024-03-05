import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { DepartmentsList } from './DepartmentsList';
import { DepartmentAdd } from './DepartmentAdd';
import { DepartmentEdit } from './DepartmentEdit';
import { ControlledRoute } from '../../../../components/ControlledRoute';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
import permissions from '../../../../../values/permission';

export default function DepartmentPage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/departments" exact permission={permissions.ViewAllDepartments} component={DepartmentsList} />
        <ControlledRoute path="/departments/add" exact permission={permissions.CreateDepartment} component={DepartmentAdd} />
        <ControlledRoute
          path="/departments/edit"
          exact
          permission={permissions.UpdateDepartment}
          component={DepartmentEdit}
        />
      </Switch>
    </Suspense>
  );
}
