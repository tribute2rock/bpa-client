import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import permissions from '../../../../../values/permission';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
import { ControlledRoute } from '../../../../components/ControlledRoute';
import ProvinceList from './ProvinceList';

export default function ProvincePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/provinces" exact permission={permissions.ViewLdapProvinces} component={ProvinceList} />
      </Switch>
    </Suspense>
  );
}
