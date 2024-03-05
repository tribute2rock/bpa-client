import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import permissions from '../../../../../values/permission';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
import { ControlledRoute } from '../../../../components/ControlledRoute';
import { GroupList } from './GroupUserList';
// import { GroupAdd } from './GroupAdd';
// import { GroupEdit } from './GroupEdit';

export default function GroupPage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/groups-users" exact permission={permissions.ViewAllGroupUser} component={GroupList} />
      </Switch>
    </Suspense>
  );
}
