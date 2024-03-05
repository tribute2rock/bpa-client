import React from 'react';
import { Route } from 'react-router-dom';
import WorkflowList from './WorkflowList';
import WorkflowAdd from './WorkflowAdd';

const WorkflowPage = props => {
  return (
    <>
      <Route path="/workflow" exact component={WorkflowList} />
      <Route path="/workflow/new" exact component={() => <WorkflowAdd {...props} title="Add Workflow" />} />
      <Route path="/workflow/edit" exact component={() => <WorkflowAdd {...props} title="Edit Workflow" />} />
    </>
  );
};

export default WorkflowPage;
