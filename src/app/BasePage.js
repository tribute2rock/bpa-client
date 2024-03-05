import React, { Suspense, lazy } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { LayoutSplashScreen, ContentRoute } from '../_metronic/layout';
import { DashboardPage } from './pages/DashboardPage';
import ErrorsPage from './modules/ErrorsExamples/ErrorsPage';
import metaRoutes from '../home/meta_routes';

const FormsPage = lazy(() => import('./modules/Forms/pages/formsPage'));
const SubFormPage = lazy(() => import('./modules/SubForm/subform/SubFormsPage'));
const ProvincePage = lazy(() => import('./modules/Settings/pages/provinces/ProvincePage'));
const WorkflowPage = lazy(() => import('./modules/Workflow/pages/workflowPage'));
const RequestsPage = lazy(() => import('./modules/Requests/pages/requestsPage'));
const IssuranceRegister = lazy(() => import('./modules/Requests/pages/requests/IssuranceRegister'));
const BranchPage = lazy(() => import('./modules/Settings/pages/branches/BranchPage'));
const Branch_Page = lazy(() => import('./modules/Settings/pages/branch/BranchPage'));
const UserPage = lazy(() => import('./modules/Settings/pages/userManagement/users/UserPage'));
const CustomerPage = lazy(() => import('./modules/Settings/pages/userManagement/customers/CustomerPage'));
const RolePage = lazy(() => import('./modules/Settings/pages/userManagement/roles/RolePage'));
const DepartmentPage = lazy(() => import('./modules/Settings/pages/departments/DepartmentPage'));
const CategoryPage = lazy(() => import('./modules/Settings/pages/category/CategoryPage'));
const PrintTemplatePage = lazy(() => import('./modules/Settings/pages/printTemplate/printTemplatePage'));
const GroupPage = lazy(() => import('./modules/Settings/pages/groups/GroupPage'));
const NewRequests = lazy(() => import('./modules/NewRequests/NewRequests'));
const SubNewRequest = lazy(() => import('./modules/NewRequests/SubNewRequest'));
const FormList = lazy(() => import('./modules/NewRequests/FormList'));
const Form = lazy(() => import('./modules/NewRequests/Form'));
const AssignFormsPage = lazy(() => import('./modules/Settings/pages/AssignForm/AssignFormsPage'));
const Report = lazy(() => import('./modules/Settings/pages/reporting/dashboard'));
const LcReports = lazy(() => import('./modules/Settings/pages/reporting/LcReports/dashboard'));
const BgReports = lazy(() => import('./modules/Settings/pages/reporting/BgReport/dashboard'));
const SisReports = lazy(() => import('./modules/Settings/pages/reporting/SISReport/dashboard'));
const BibiniPage = lazy(() => import('./modules/BiBINi/pages/BibiniPage'));

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <Route path="/forms" component={FormsPage} />
        <Route path="/sub-form" component={SubFormPage} />
        <Route path="/workflow" component={WorkflowPage} />
        <Route path="/requests" component={RequestsPage} />
        <Route path="/issuance-register" component={IssuranceRegister} />
        <Route path="/internal-requests" component={RequestsPage} />
        <Route path="/corporate-requests" component={RequestsPage} />
        <Route path="/bibini-requests" component={BibiniPage} />
        <Route path="/users" component={UserPage} />
        <Route path="/customers" component={CustomerPage} />
        <Route path="/roles" component={RolePage} />
        <Route path="/branches" component={BranchPage} />
        <Route path="/provinces" component={ProvincePage} />
        <Route path="/departments" component={DepartmentPage} />
        <Route path="/categories" component={CategoryPage} />
        <Route path="/print-template" component={PrintTemplatePage} />
        <Route path="/groups" component={GroupPage} />
        <Route path="/branch" component={Branch_Page} />
        <Route path="/new-requests" component={NewRequests} />
        <Route path={metaRoutes.subrequest} component={SubNewRequest} />
        <Route path={metaRoutes.formLists} component={FormList} />
        <Route path={metaRoutes.form} component={Form} />
        <Route path="/assign-forms" component={AssignFormsPage} />
        <Route path="/reports" component={Report} />
        <Route path="/LcReports" component={LcReports} />
        <Route path="/BgReports" component={BgReports} />
        <Route path="/sis-Reports" component={SisReports} />
        <Redirect to="error/403" component={ErrorsPage} />
      </Switch>
    </Suspense>
  );
}
