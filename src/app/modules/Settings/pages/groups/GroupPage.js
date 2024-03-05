import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import permissions from '../../../../../values/permission';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
import { ControlledRoute } from '../../../../components/ControlledRoute';
import { GroupList } from './GroupList';
import { GroupAdd } from './GroupAdd';
import { GroupEdit } from './GroupEdit';

export default function GroupPage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/groups" exact permission={permissions.ViewAllGroups} component={GroupList} />
        <ControlledRoute path="/groups/add" exact permission={permissions.CreateGroup} component={GroupAdd} />
        <ControlledRoute path="/groups/edit" exact permission={permissions.UpdateGroup} component={GroupEdit} />
      </Switch>
    </Suspense>
  );
}
