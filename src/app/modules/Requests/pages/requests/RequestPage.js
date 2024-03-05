import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RequestsList } from './RequestList';
import { RequestView } from './RequestView';
import { DraftRequestEdit } from './DraftRequestEdit';

export function RequestsPage() {
  return (
    <>
      <Route path="/requests" exact component={RequestsList} />
      <Route path="/requests/view" exact component={RequestView} />
      <Route path="/requests/view/:id" exact component={RequestView} />
    </>
  );
}
