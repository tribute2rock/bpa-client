import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LayoutSplashScreen } from '../../../../_metronic/layout';
import { ControlledRoute } from '../../../components/ControlledRoute';
import permissions from '../../../../values/permission';
import { SubFormList } from './subform/SubFormList';

export default function subFormsPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/sub-form" exact component={SubFormList} />
        <ControlledRoute path="/sub-form/edit" exact component={EditForm} />
      </Switch>
    </Suspense>
  );
}
