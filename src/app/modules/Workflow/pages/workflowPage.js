import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LayoutSplashScreen, ContentRoute } from '../../../../_metronic/layout';
import WorkflowPage from './workflow/WorkflowPage';
import WorkflowList from './workflow/WorkflowList';
import WorkflowAdd from './workflow/WorkflowAdd';
import { ControlledRoute } from '../../../components/ControlledRoute';
import permissions from '../../../../values/permission';

const Workflow = props => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/workflow" permission={permissions.ViewAllWorkflows} exact component={WorkflowList} />
        <ControlledRoute
          path="/workflow/new"
          permission={permissions.CreateWorkflow}
          exact
          component={() => <WorkflowAdd {...props} title="Add Workflow" />}
        />
        <ControlledRoute
          path="/workflow/edit"
          permission={permissions.UpdateWorkflow}
          exact
          component={() => <WorkflowAdd {...props} title="Edit Workflow" />}
        />
      </Switch>
    </Suspense>
  );
};

export default Workflow;
