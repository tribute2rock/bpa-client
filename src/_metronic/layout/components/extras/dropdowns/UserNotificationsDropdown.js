/* eslint-disable no-unused-vars */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useMemo } from 'react';
import { Nav, Tab, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SVG from 'react-inlinesvg';
import objectPath, { set } from 'object-path';
import { useHtmlClassService } from '../../../_core/MetronicLayout';
import { toAbsoluteUrl } from '../../../../_helpers';
import { DropdownTopbarItemToggler } from '../../../../_partials/dropdowns';

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

export function UserNotificationsDropdown() {
  const [key, setKey] = useState('Unread');
  const [read, setRead] = useState('Unread');
  const bgImage = toAbsoluteUrl('/media/misc/bg-1.jpg');

  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      offcanvas: objectPath.get(uiService.config, 'extras.notifications.layout') === 'offcanvas'
    };
  }, [uiService]);

  const markAsRead = () => {
    setRead('Read');
  };

  const navLink = [{ title: 'Unread' }, { title: 'Read' }, { title: 'All' }];
  const data = [
    {
      title: 'Loan Request',
      name: 'Ram',
      svg: '/media/svg/icons/Navigation/Right 3.svg',
      css: 'success',
      status: `${read}`
    },
    {
      title: 'Atm Card Request',
      name: 'shyam',
      svg: '/media/svg/icons/Communication/Reply-all.svg',
      css: 'danger',
      status: `${read}`
    },
    {
      title: 'Mobile Banking',
      name: 'hari',
      svg: '/media/svg/icons/Navigation/Right 3.svg',
      css: 'success',
      status: 'Read'
    },
    {
      title: 'Mobile Banking',
      name: 'hari',
      svg: '/media/svg/icons/Navigation/Right 3.svg',
      css: 'success',
      status: `${read}`
    }
  ];
  return (
    <>
      {layoutProps.offcanvas && (
        <div className="topbar-item">
          <div className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-primary" id="kt_quick_notifications_toggle">
            <span className="svg-icon svg-icon-xl svg-icon-primary">
              <SVG src={toAbsoluteUrl('/media/svg/icons/Code/Compiling.svg')} />
            </span>
            <span className="pulse-ring"></span>
          </div>
        </div>
      )}
      {!layoutProps.offcanvas && (
        <Dropdown drop="down" alignRight>
          <Dropdown.Toggle as={DropdownTopbarItemToggler} id="kt_quick_notifications_toggle">
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="user-notification-tooltip">User Notifications</Tooltip>}
            >
              <div className="btn btn-icon btn-clean btn-lg mr-1 pulse pulse-primary" id="kt_quick_notifications_toggle">
                <span className="svg-icon svg-icon-xl svg-icon-primary">
                  <SVG src={toAbsoluteUrl('/media/svg/icons/General/Notifications1.svg')} />
                </span>
                <span className="pulse-ring"></span>
                <span className="pulse-ring" />
              </div>
            </OverlayTrigger>
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
            <form>
              {/** Head */}
              <div
                className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <h4 className="d-flex flex-center rounded-top">
                  <span className="text-white">User Notifications</span>
                  <span className="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">2 new</span>
                </h4>

                <Tab.Container defaultActiveKey={key}>
                  <Nav
                    as="ul"
                    className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                    onSelect={_key => setKey(_key)}
                  >
                    {navLink.map((output, index) => {
                      return (
                        <Nav.Item className="nav-item" as="li">
                          <Nav.Link
                            eventKey={output.title}
                            className={`nav-link show ${key === output.title ? 'active' : ''}`}
                          >
                            {output.title}
                          </Nav.Link>
                        </Nav.Item>
                      );
                    })}
                    <Nav.Item className="nav-item" as="li">
                      <label className="checkbox h-100 ml-6">
                        <input type="checkbox" onChange={markAsRead} name="Checkboxes13_1" />
                        <span className="mr-2" /> <b className="text-white">Mark All Read</b>
                      </label>
                    </Nav.Item>
                  </Nav>
                  {navLink.map((output, index) => {
                    return (
                      <Tab.Content className="tab-content">
                        <Tab.Pane eventKey={output.title} id="topbar_notifications_events">
                          <PerfectScrollbar
                            options={perfectScrollbarOptions}
                            className="navi navi-hover scroll my-4"
                            style={{
                              maxHeight: '300px',
                              position: 'relative'
                            }}
                          >
                            {/* {
                              output.title === 'Read'? (
                                data.map((item,idx)=> {
                                  item.status === "read" ? (

                                  )
                                })
                              ): null
                            } */}
                            {data.map((item, index) => {
                              if (item.status === 'Unread' && output.title === 'Unread') {
                                return (
                                  <a href="#" className="navi-item">
                                    <div className="navi-link">
                                      <div className="navi-icon mr-2">
                                        {/* <i className="flaticon2-paper-plane text-danger"></i> */}
                                        <span className={`svg-icon svg-icon-xl svg-icon-${item.css}`}>
                                          <SVG src={toAbsoluteUrl(item.svg)} />
                                        </span>
                                      </div>
                                      <div className="navi-text">
                                        <div className="font-weight-bold">{item.title ? item.title : null}</div>
                                        <div className="text-muted">
                                          <span style={{ float: 'left' }}>{item.name ? item.name : null}</span>
                                          <span style={{ float: 'right' }}>2 hrs ago</span>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                );
                              } else if (item.status === 'Read' && output.title === 'Read') {
                                return (
                                  <a href="#" className="navi-item" key={index}>
                                    <div className="navi-link">
                                      <div className="navi-icon mr-2">
                                        {/* <i className="flaticon2-paper-plane text-danger"></i> */}
                                        <span className={`svg-icon svg-icon-xl svg-icon-${item.css}`}>
                                          <SVG src={toAbsoluteUrl(item.svg)} />
                                        </span>
                                      </div>
                                      <div className="navi-text">
                                        <div className="font-weight-bold">{item.title}</div>
                                        <div className="text-muted">
                                          <span style={{ float: 'left' }}>{item.name}</span>
                                          <span style={{ float: 'right' }}>2 hrs ago</span>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                );
                              } else if (output.title === 'All') {
                                return (
                                  <a href="#" className="navi-item" key={index}>
                                    <div className="navi-link">
                                      <div className="navi-icon mr-2">
                                        {/* <i className="flaticon2-paper-plane text-danger"></i> */}
                                        <span className={`svg-icon svg-icon-xl svg-icon-${item.css}`}>
                                          <SVG src={toAbsoluteUrl(item.svg)} />
                                        </span>
                                      </div>
                                      <div className="navi-text">
                                        <div className="font-weight-bold">{item.title}</div>
                                        <div className="text-muted">
                                          <span style={{ float: 'left' }}>{item.name}</span>
                                          <span style={{ float: 'right' }}>2 hrs ago</span>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                );
                              }
                            })}
                          </PerfectScrollbar>
                        </Tab.Pane>
                      </Tab.Content>
                    );
                  })}
                </Tab.Container>
              </div>
            </form>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}
