import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { CategoriesList } from './CategoriesList';
import { CategoryAdd } from './CategoryAdd';
import { CategoryEdit } from './CategoryEdit';
import { ControlledRoute } from '../../../../components/ControlledRoute';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
import permissions from '../../../../../values/permission';

export default function CategoryPage(props) {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ControlledRoute path="/categories" exact permission={permissions.ViewAllCategories} component={CategoriesList} />
        <ControlledRoute path="/categories/add" exact permission={permissions.CreateCategory} component={CategoryAdd} />
        <ControlledRoute path="/categories/edit" exact permission={permissions.UpdateCategory} component={CategoryEdit} />
      </Switch>
    </Suspense>
  );
}
