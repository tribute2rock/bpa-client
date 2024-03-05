import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
import {AssignFormAdd} from './AssignFormAdd';
import { ControlledRoute } from '../../../../components/ControlledRoute';
import permissions from '../../../../../values/permission';

export default function AssignFormsPage(props){
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/assign-forms/add" permission={permissions.ViewAllWorkflows} exact component={AssignFormAdd} />
      </Switch>
    </Suspense>
  );
};