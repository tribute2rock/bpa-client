/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { checkIsActive } from '../../../../_helpers';
import { ControlledComponent } from '../../../../../app/components/ControlledComponent';
import permissions from '../../../../../values/permission';
import { useSelector } from 'react-redux';
import { internalRequest } from '../../../../../app/modules/Requests/pages/requests/api';
import { Button } from 'react-bootstrap';

const HeaderMenu = ({ layoutProps }) => {
  const location = useLocation();
  const getMenuItemActive = url => {
    return checkIsActive(location, url) ? 'menu-item-active' : '';
  };
  const userInfo = useSelector(state => state.user?.data.user);
  const internalRequestURL = process.env.REACT_APP_INTERNAL_REQUEST_URL;
  const newInternalRequest = async () => {
    let customer = internalRequestURL;
    let token = await internalRequest();
    let user = userInfo?.id;
    if (token && user) {
      let url = customer + `#/home/?access=${token?.data}&j=${user}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div
      id="kt_header_menu"
      className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
      {...layoutProps.headerMenuAttributes}
    >
      {/*begin::Header Nav*/}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li className={`menu-item menu-item-rel ${getMenuItemActive('/dashboard')}`}>
          <NavLink className="menu-link" to="/dashboard">
            <span className="menu-text">Dashboard</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
        <ControlledComponent permission={permissions.ViewAllForms}>
          <li className={`menu-item menu-item-rel ${getMenuItemActive('/forms')}`}>
            <NavLink className="menu-link" to="/forms">
              <span className="menu-text">Forms</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
        </ControlledComponent>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
        <ControlledComponent permission={permissions.ViewAllWorkflows}>
          <li className={`menu-item menu-item-rel ${getMenuItemActive('/workflow')}`}>
            <NavLink className="menu-link" to="/workflow">
              <span className="menu-text">WorkFlow</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
        </ControlledComponent>
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        <ControlledComponent canHaveAny={[permissions.ViewRequests, permissions.ViewAllRequests]}>
          <li className={`menu-item menu-item-rel ${getMenuItemActive('/requests')}`}>
            <NavLink className="menu-link" to="/requests?type=customer">
              <span className="menu-text">Requests</span>
              {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
            </NavLink>
          </li>
        </ControlledComponent>
        <ControlledComponent canHaveAny={[permissions.ViewInternalRequests, permissions.ViewAllInternalRequests]}>
          <li
            data-menu-toggle={layoutProps.menuDesktopToggle}
            aria-haspopup="true"
            className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/internal-requests')}`}
          >
            <NavLink className="menu-link menu-toggle" to="/internal-requests">
              <span className="menu-text">Internal Requests</span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu menu-submenu-classic menu-submenu-left">
              <ul className="menu-subnav">
                <ControlledComponent canHaveAny={[permissions.ViewInternalRequests, permissions.ViewAllInternalRequests]}>
                  {/*begin::2 Level*/}
                  <li className={`menu-item  ${getMenuItemActive('/internal-requests')}`}>
                    <Button className="menu-link btn btn-light" onClick={newInternalRequest}>
                      <i className="fa fa-share mr-3" />
                      <span className="menu-text">New Request</span>
                    </Button>
                  </li>
                  {/*end::2 Level*/}
                </ControlledComponent>
                <ControlledComponent canHaveAny={[permissions.ViewInternalRequests, permissions.ViewAllInternalRequests]}>
                  {/*begin::2 Level*/}
                  <li className={`menu-item  ${getMenuItemActive('/internal-requests')}`}>
                    <NavLink className="menu-link" to="/internal-requests?type=internal">
                      <i className="fa fa-list-alt mr-3" />
                      <span className="menu-text">Request List</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ControlledComponent>
              </ul>
            </div>
          </li>
        </ControlledComponent>

        {/*Corporate-List*/}
        {userInfo.roleId !== 1 && (
          <ControlledComponent canHaveAny={[permissions.ViewRequests, permissions.ViewAllRequests]}>
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/corporate-requests')}`}>
              <NavLink className="menu-link" to="/corporate-requests?type=corporate">
                <span className="menu-text">Corporate Registration Requests</span>
                {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
              </NavLink>
            </li>
          </ControlledComponent>
        )}

        {/* BI -BI Ni  */}
        <ControlledComponent canHaveAny={[permissions.CanViewBibiniRequests, permissions.CanFillBibiniRequest]}>
          <li
            data-menu-toggle={layoutProps.menuDesktopToggle}
            aria-haspopup="true"
            className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/bibini-requests')}`}
          >
            <NavLink className="menu-link menu-toggle" to="/bibini-requests">
              <span className="menu-text bold-dark-bg" style={{ fontWeight: 'bold', backgroundColor: 'dark' }}>
                BiBiNi Requests
              </span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu menu-submenu-classic menu-submenu-left">
              <ul className="menu-subnav">
                <ControlledComponent permission={permissions.CanFillBibiniRequest}>
                  {/*begin::2 Level*/}
                  <li className={`menu-item  ${getMenuItemActive('/internal-requests')}`}>
                    <Button className="menu-link btn btn-light" onClick={newInternalRequest}>
                      <i className="fa fa-share mr-3" />
                      <span className="menu-text">New BiBiNi Request</span>
                    </Button>
                  </li>
                  {/*end::2 Level*/}
                </ControlledComponent>
                <ControlledComponent permission={permissions.CanViewBibiniRequests}>
                  {/*begin::2 Level*/}
                  <li className={`menu-item  ${getMenuItemActive('/bibini-requests')}`}>
                    <NavLink className="menu-link" to="/bibini-requests">
                      <i className="fa fa-list-alt mr-3" />
                      <span className="menu-text">BIBINI Request List</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ControlledComponent>
              </ul>
            </div>
          </li>
        </ControlledComponent>
        {/*end::1 Level*/}
        {/*begin::1 Level*/}
        {/* <li className={`menu-item menu-item-rel ${getMenuItemActive('/new-requests')}`}>
          <NavLink className="menu-link" to="/new-requests">
            <span className="menu-text">New Request</span>
            {layoutProps.rootArrowEnabled && <i className="menu-arrow" />}
          </NavLink>
        </li> */}
        {/*end::1 Level*/}
        {/*Classic submenu*/}
        {/*begin::1 Level*/}
        <ControlledComponent
          canHaveAny={[
            permissions.ViewAllUsers,
            permissions.ViewAllRoles,
            permissions.ViewLdapBranches,
            permissions.ViewAllDepartments,
            permissions.ViewAllCategories,
            permissions.ViewAllGroups,
            permissions.ViewAllGroupUser,
            permissions.ViewAllPrintTemplate
          ]}
        >
          <li
            data-menu-toggle={layoutProps.menuDesktopToggle}
            aria-haspopup="true"
            className={`menu-item menu-item-submenu menu-item-rel ${getMenuItemActive('/settings')}`}
          >
            <NavLink className="menu-link menu-toggle" to="/google-material">
              <span className="menu-text">Settings</span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu menu-submenu-classic menu-submenu-left">
              <ul className="menu-subnav">
                <ControlledComponent canHaveAny={[permissions.ViewAllUsers, permissions.ViewAllRoles]}>
                  {/*begin::2 Level*/}
                  <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive('/users')}`}
                    data-menu-toggle="hover"
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link menu-toggle" to="/google-material/inputs">
                      <i className="fas fa-user mr-3" />
                      <span className="menu-text"> User Management</span>
                      <i className="menu-arrow" />
                    </NavLink>
                    <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                      <ul className="menu-subnav">
                        <ControlledComponent permission={permissions.ViewAllRoles}>
                          {/*begin::3 Level*/}
                          <li className={`menu-item ${getMenuItemActive('/roles')}`}>
                            <NavLink className="menu-link" to="/roles">
                              <i className="menu-bullet menu-bullet-dot">
                                <span />
                              </i>
                              <span className="menu-text">Role</span>
                            </NavLink>
                          </li>
                          {/*end::3 Level*/}
                        </ControlledComponent>

                        <ControlledComponent permission={permissions.ViewAllUsers}>
                          {/*begin::3 Level*/}
                          <li className={`menu-item ${getMenuItemActive('/google-material/inputs/autocomplete')}`}>
                            <NavLink className="menu-link" to="/users">
                              <i className="menu-bullet menu-bullet-dot">
                                <span />
                              </i>
                              <span className="menu-text">User</span>
                            </NavLink>
                          </li>
                          {/*end::3 Level*/}
                        </ControlledComponent>

                        <ControlledComponent permission={permissions.ViewAllUsers}>
                          {/*begin::3 Level*/}
                          <li className={`menu-item ${getMenuItemActive('/google-material/inputs/autocomplete')}`}>
                            <NavLink className="menu-link" to="/customers">
                              <i className="menu-bullet menu-bullet-dot">
                                <span />
                              </i>
                              <span className="menu-text">Customer</span>
                            </NavLink>
                          </li>
                          {/*end::3 Level*/}
                        </ControlledComponent>
                      </ul>
                    </div>
                  </li>
                  {/*end::2 Level*/}
                </ControlledComponent>

                {/* <ControlledComponent permission={permissions.ViewLdapBranches}>
                  <li className={`menu-item ${getMenuItemActive('/branches')}`}>
                    <NavLink className="menu-link" to="/branches">
                      <i className="fas fa-layer-group mr-3" />
                      <span className="menu-text">Branches</span>
                    </NavLink>
                  </li>
                </ControlledComponent>

                <ControlledComponent permission={permissions.ViewLdapProvinces}>
                  <li className={`menu-item ${getMenuItemActive('/provinces')}`}>
                    <NavLink className="menu-link" to="/provinces">
                      <i className="fas fa-layer-group mr-3" />
                      <span className="menu-text">Provinces</span>
                    </NavLink>
                  </li>
                </ControlledComponent>

                <ControlledComponent permission={permissions.ViewAllDepartments}>
                  <li className={`menu-item  ${getMenuItemActive('/departments')}`}>
                    <NavLink className="menu-link" to="/departments">
                      <i className="fas fa-briefcase mr-3" />

                      <span className="menu-text">Departments</span>
                    </NavLink>
                  </li>
                </ControlledComponent> */}

                <ControlledComponent permission={permissions.ViewAllCategories}>
                  {/*begin::2 Level*/}
                  <li className={`menu-item  ${getMenuItemActive('/categories')}`}>
                    <NavLink className="menu-link" to="/categories">
                      <i className="fas fa-th-large mr-3" />
                      <span className="menu-text">Categories</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ControlledComponent>

                <ControlledComponent permission={permissions.ViewAllGroups}>
                  {/*begin::2 Level*/}
                  <li className={`menu-item ${getMenuItemActive('/groups')}`}>
                    <NavLink className="menu-link" to="/groups">
                      <i className="fas fa-object-group mr-3" />
                      <span className="menu-text">Groups</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ControlledComponent>

                <ControlledComponent permission={permissions.ViewAllBranches}>
                  {/*begin::2 Level*/}
                  <li className={`menu-item ${getMenuItemActive('/branch')}`}>
                    <NavLink className="menu-link" to="/branch">
                      <i className="fas fa-code-branch mr-3" />
                      <span className="menu-text">Branch</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ControlledComponent>

                <ControlledComponent permission={permissions.ViewAllPrintTemplate}>
                  {/*begin::2 Level*/}
                  <li className={`menu-item ${getMenuItemActive('/print-template')}`}>
                    <NavLink className="menu-link" to="/print-template">
                      <i className="fas fa-print mr-3" />
                      <span className="menu-text">Download Template</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}
                </ControlledComponent>
                <ControlledComponent permission={permissions.ViewAllDepartments}>
                  <li className={`menu-item  ${getMenuItemActive('/assign-forms/add')}`}>
                    <NavLink className="menu-link" to="/assign-forms/add">
                      <i className="fas fa-briefcase mr-3" />

                      <span className="menu-text">Assign Forms</span>
                    </NavLink>
                  </li>
                </ControlledComponent>

                <ControlledComponent permission={permissions.ViewReport}>
                  {/*begin::2 Level*/}
                  <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive('/reports')}`}
                    data-menu-toggle="hover"
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/sis-Reports">
                      <i className="fas fa-print mr-3" />
                      <span className="menu-text">Report</span>
                      <i className="menu-arrow" />
                    </NavLink>
                    <div className={`menu-submenu menu-submenu-classic menu-submenu-right`}>
                      <ul className="menu-subnav">
                        <ControlledComponent permission={permissions.ViewReport}>
                          {/*begin::3 Level*/}
                          <li className={`menu-item ${getMenuItemActive('/LcReports')}`}>
                            <NavLink className="menu-link" to="/LcReports">
                              <i className="menu-bullet menu-bullet-dot">
                                <span />
                              </i>
                              <span className="menu-text">LC Reports</span>
                            </NavLink>
                          </li>
                          {/*end::3 Level*/}
                        </ControlledComponent>

                        <ControlledComponent permission={permissions.ViewReport}>
                          {/*begin::3 Level*/}
                          <li className={`menu-item ${getMenuItemActive('/google-material/inputs/autocomplete')}`}>
                            <NavLink className="menu-link" to="/BgReports">
                              <i className="menu-bullet menu-bullet-dot">
                                <span />
                              </i>
                              <span className="menu-text">BG Reports</span>
                            </NavLink>
                          </li>
                          {/*end::3 Level*/}
                        </ControlledComponent>

                        <ControlledComponent permission={permissions.ViewReport}>
                          {/*begin::3 Level*/}
                          <li className={`menu-item ${getMenuItemActive('/google-material/inputs/autocomplete')}`}>
                            <NavLink className="menu-link" to="/sis-Reports">
                              <i className="menu-bullet menu-bullet-dot">
                                <span />
                              </i>
                              <span className="menu-text">BIBINI Reports</span>
                            </NavLink>
                          </li>
                          {/*end::3 Level*/}
                        </ControlledComponent>
                      </ul>
                    </div>
                  </li>
                  {/*end::2 Level*/}
                </ControlledComponent>
              </ul>
            </div>
          </li>
        </ControlledComponent>
        {/*end::1 Level*/}
      </ul>
      {/*end::Header Nav*/}
    </div>
  );
};

export default HeaderMenu;
