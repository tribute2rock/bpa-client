/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import objectPath from 'object-path';
import { useHtmlClassService } from '../../../_core/MetronicLayout';
import { toAbsoluteUrl } from '../../../../_helpers';
import { DropdownTopbarItemToggler } from '../../../../_partials/dropdowns';
import { upperCase } from 'lodash';
import A from '../../../../../config/url';
import themeData from '../../../../../config/theme';
import { getNotifications } from '../../../../../app/modules/Requests/pages/requests/api';

const UserProfileDropdown = () => {
  const userData = useSelector(state => state.user.data.user);
  const uiService = useHtmlClassService();
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    // getNotificationList();
  }, []);

  const layoutProps = useMemo(() => {
    return {
      light: objectPath.get(uiService.config, 'extras.user.dropdown.style') === 'light'
    };
  }, [uiService]);

  const getNotificationList = () => {
    getNotifications((err, data) => {
      if (!err) {
        setNotification(data.data);
      }
    });
  };

  return (
    <>
      {/* <img src="https://www.sunrisebank.com.np/assets/backend/uploads/sunrise%20logo.jpg" className="bank-logo" alt="logo" /> */}
      <img src={themeData.logo} className="bank-logo" alt="logo" />
      <Dropdown drop="down" alignRight>
        <Dropdown.Toggle as={DropdownTopbarItemToggler} id="dropdown-toggle-user-profile">
          <div className={'btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2'}>
            {/* <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Hi,</span>{' '} */}
            {/* <span className="text-dark-50 text-uppercase font-weight-bolder font-size-base d-none d-md-inline mr-3">
              <upperCase>{userData.name}</upperCase>
            </span> */}
            <span className="symbol symbol-35 symbol-light-success">
              <span className="symbol-label font-size-h5 font-weight-bold">{userData.name ? userData.name[0] : null}</span>
              <small
                class="badge badge-danger font-weight-light"
                style={{ position: 'absolute', right: '-18px', top: '-13px' }}
              >
                {notification && notification.length > 0 ? notification.length : 0}
              </small>
            </span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
          <>
            {/** ClassName should be 'dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
            {layoutProps.light && (
              <>
                <div className="d-flex align-items-center p-8 rounded-top">
                  <div className="symbol symbol-md bg-light-primary mr-3 flex-shrink-0">
                    <img src={toAbsoluteUrl('/media/users/300_21.jpg')} alt="" />
                  </div>
                  <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">{userData.name}</div>
                  <span className="label label-light-success label-lg font-weight-bold label-inline">3 messages</span>
                </div>
                <div className="separator separator-solid" />
              </>
            )}

            {!layoutProps.light && (
              <div
                className="d-flex align-items-center justify-content-between flex-wrap p-8 bgi-size-cover bgi-no-repeat rounded-top"
                style={{
                  backgroundImage: `url(${toAbsoluteUrl('/media/misc/bg-1.jpg')})`
                }}
              >
                <div className="symbol bg-white-o-15 mr-3">
                  <span className="symbol-label text-success font-weight-bold font-size-h4">
                    {userData.name ? userData.name[0] : null}
                  </span>
                  {/*<img alt="Pic" className="hidden" src={user.pic} />*/}
                </div>
                <div className="text-white text-uppercase m-0 flex-grow-1 mr-3 font-size-h5">{userData.name}</div>
              </div>
            )}
          </>

          <div className="navi navi-spacer-x-0 pt-5">
            <div style={{ height: '232px', overflowY: 'scroll', scrollbarWidth: 'thin' }}>
              {notification &&
                notification.map((data, index) => {
                  return (
                    <>
                      <Link
                        to={'/requests/view/' + data.id + '?i=' + A.getHash(data.id) + '&&?s=Bucket'}
                        key={index}
                        className="navi-item px-8 cursor-pointer"
                      >
                        <div className="navi-link">
                          <div className="navi-icon mr-2">
                            <i className="flaticon2-hourglass text-primary" />
                          </div>
                          <div className="navi-text">
                            <div className="font-weight-bold">{data.requestedDate}</div>
                            {data.requestSenderType === 'customer' ? (
                              <div className="text-muted">
                                Request on {data.request} has been received from {data.customer}.
                              </div>
                            ) : (
                              <div className="text-muted">Internal request on {data.request} has been received.</div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
            </div>
            <div className="navi-separator mt-3" />

            <div className="navi-footer  px-8 py-5">
              <Link to="/logout" className="btn btn-light-primary font-weight-bold">
                Sign Out
              </Link>
              {/* <Link to="/" className="btn btn-light-primary font-weight-bold">
                View all Notifications
              </Link> */}
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default UserProfileDropdown;
