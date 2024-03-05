import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { PrintTemplateList } from './printTemplateList';
import { PrintTemplateAdd } from './printTemplateAdd';
import { PrintTemplateEdit } from './printTemplateEdit';
import { ControlledRoute } from '../../../../components/ControlledRoute';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
import permissions from '../../../../../values/permission';

export default function PrintTemplatePage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute
          path="/print-template"
          exact
          permission={permissions.ViewAllPrintTemplate}
          component={PrintTemplateList}
        />
        <ControlledRoute
          path="/print-template/add"
          exact
          permission={permissions.CreatePrintTemplate}
          component={PrintTemplateAdd}
        />
        <ControlledRoute
          path="/print-template/edit"
          exact
          permission={permissions.UpdatePrintTemplate}
          component={PrintTemplateEdit}
        />
      </Switch>
    </Suspense>
  );
}
