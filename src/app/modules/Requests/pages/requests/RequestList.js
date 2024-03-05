import React, { forwardRef, useEffect, useState, useLayoutEffect, useRef } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { Form, Tab, Col, Tabs, OverlayTrigger, Tooltip, Dropdown, Modal } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import moment from 'moment';
import {
  statusColor,
  requestFormatDate,
  actionFormatDate,
  getData,
  getPageParams,
  handleIndex,
  formatSwiftStatus
} from '../../../../../util';
import PaginationPage from '../../../../components/pagination';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Swal from 'sweetalert2';
import { NextButton, PreviousButton, ViewButton, PickButton, RollBackButton } from '../../../../components/Buttons';
import {
  getRequests,
  getDraftRequestSubmitted,
  submitRequestAction,
  internalRequest,
  sendTokenForInternalRequest
} from './api';
import A from '../../../../../config/url';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, Link, NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import query from 'querystring';
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { server } from '../../../../../config/server';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { Input, Switch } from '@material-ui/core';
import axios from 'axios';
import { FilterButton } from '../../../../components/Buttons';
import RequestFilterPanel from './RequestFilterPanel';
import KTLayoutQuickPanel from '../../../../../_metronic/_assets/js/layout/extended/quick-panel';
import { KTUtil } from '../../../../../_metronic/_assets/js/components/util';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { addMultipick } from '../../../../../redux/user/multiPickSlice';
import MultiPickCheckBox from './MultiPickCheckBox';

const { ExportCSVButton } = CSVExport;

export const RequestsList = props => {
  useLayoutEffect(() => {
    KTUtil.ready(function() {
      KTLayoutQuickPanel.init('kt_quick_panel');
    });
  });
  const initialLocation = useLocation();

  const [requestList, setRequestList] = useState([]);
  const [tabName, setTabName] = useState(initialLocation.tab);
  const [tabNameAdmin, setTabNameAdmin] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const userInfo = useSelector(state => state.user?.data.user);
  const userToken = useSelector(state => state.user?.token);
  const multipickIds = useSelector(state => state.multipick.multipickIds || []);
  const dispatch = useDispatch();
  const [requestType, setRequestType] = useState();
  const qs = query.parse(props.location.search);
  const reqType = qs['?type'];
  const [visible, setVisible] = useState(false);
  const [reqVisible, setreqVisible] = useState(false);
  const [switchCustomer, setSwitchCustomer] = useState(false);
  const multiplePickRef = useRef(false);
  const [multiplePick, setMultiplePick] = useState(false);
  const [search, setSearch] = useState([]);
  // const [searchKey, setSearchKey] = useState('');
  // const [dateRange, setDateRange] = useState({});
  const [filters, setFilters] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = id => {
    setShow(true);
  };

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  useEffect(() => {
    if (
      ['Pending', 'Upcoming', 'Approved', 'Returned', 'Forwarded', 'Bucket', 'All', 'All-requests', 'Closed'].includes(
        tabName
      )
    ) {
      setTabName(tabName);
    } else {
      userInfo.roleId === 1 ? setTabName('All-requests') : setTabName('Pending');
    }
    updateData();

    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, [tabName, reqType, pageSize, page, search, offset, userInfo, userToken, tabNameAdmin]);

  const internalRequestType = () => {
    setRequestType(reqType ? reqType : '');
  };

  const updateData = async () => {
    await getAllRequests();
  };
  const handleMultiplePick = e => {
    setMultiplePick(e.target.checked);
    multiplePickRef.current = e.target.checked;
  };

  const handleSearch = filter => {
    setPage(1);
    setSearch(filter);
    // getAllRequests();
  };

  const handleReset = () => {
    setPage(1);
    setSearch([{ field: 'requestKey', operator: 'like', value: '', value2: '' }]);
    // getAllRequests();
  };

  const handleSwitch = () => {
    const actionSwitchCustomer = !switchCustomer;
    setSwitchCustomer(actionSwitchCustomer);
    getAllRequests(actionSwitchCustomer || '');
  };
  let getAllRequests;
    if(reqType==="internal" || reqType==="customer"){
      getAllRequests = switchCustomer => {
        setreqVisible(true);
        const params = getPageParams(page, pageSize);
        let reqParams = {
          page: params.page,
          pageSize: params.pageSize,
          tab: tabName,
          reqType: reqType,
          switchCustomer
        };
    
        if (search.length > 0 && search[0]?.value != '') {
          reqParams['search'] = JSON.stringify(search);
        }
        getRequests(
          reqParams,
          (err, data) => {
            if (!err) {
              setTotalItems(data.totalItems);
              setTotalPages(data.totalPages);
              setOffset(data.offset);
              setRequestList(data.pageData);
              setreqVisible(false);
            }
          },
          source
        );
      };
    }
    else{
      getAllRequests = switchCustomer => {
        setreqVisible(true);
        const params = getPageParams(page, pageSize);
        let reqParams = {
          page: 0,
          pageSize: 100000,
          tab: tabName,
          reqType: reqType,
          switchCustomer
        };
    
        if (search.length > 0 && search[0]?.value != '') {
          reqParams['search'] = JSON.stringify(search);
        }
        getRequests(
          reqParams,
          (err, data) => {
            if (!err) {
              setTotalItems(data.totalItems);
              setTotalPages(data.totalPages);
              setOffset(data.offset);
              setRequestList(data.pageData);
              setreqVisible(false);
            }
          },
          source
        );
      };
    }

  const handlePageChange = (event, value) => {
    setPage(value);
    // updateData();
  };

  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
    setPage(1);
    // updateData();
  };

  const handleToggleTab = tab => {
    handleReset();
    setMultiplePick(false);
    setTabName(tab);
    setPage(1);
  };
  const handleChangeTabPending = () => {
    if (multiplePickRef) {
      handleToggleTab('Pending');
    }
  };

  const switchRequestType = reqType => {
    switch (reqType) {
      case 'internal':
        return 'Internal';
      case 'customer':
        return 'Customer';
      case 'corporate':
        return 'Corporate';
      default:
        return 'Customer';
    }
  };
  const ActionsColumnFormatter = (requestId, request, row, index, history) => {
    const formData = new FormData();
    formData.append('actionId', 4);

    const Pick = () => {
      setVisible(true);
      submitRequestAction(requestId, formData, (err, data) => {
        if (!err) {
          setVisible(false);
          toast.success(data.message ?? 'Pick performed on request successfully.');
            if (multiplePickRef.current) {
              dispatch(addMultipick(requestId));
            }
        } else {
          setVisible(false);
          toast.error(err.response?.data?.message ?? 'Failed to perform action on request.');
        }
      });
    };

    return (
      <>
        {requestList[0]?.STATUS === 'Bucket' ? (
          <CustomLoadingOverlay isLoading={visible}>
            <PickButton handlePick={Pick} />
          </CustomLoadingOverlay>
        ) : ((requestList[0]?.statusId === 2) && tabName==="Pending" && !(multipickIds.includes(requestId)))  && (
          <>
          <MultiPickCheckBox requestId={requestId} multipickIds={multipickIds} dispatch={dispatch} reload={handleToggleTab}/>
          </>
        )}

        {(multipickIds.includes(requestId) && tabName==="Pending") && <i className="fa fa-arrow-up text-danger" />}
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">View</Tooltip>}>
          <Link
            to={{
              pathname: 'requests/view/' + requestId,
              search: '?i=' + A.getHash(requestId) + '&&' + '?s=' + tabName + '&&' + '?b=' + request.requestedBranch,
              state: {
                RequestView: '?i=' + A.getHash(requestId) + '&&' + '?s=' + tabName + '&&' + '?b=' + request.requestedBranch
              }
            }}
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          >
            <i className="fas fa-eye text-primary" />
          </Link>
        </OverlayTrigger>
      </>
    );
  };
  let columns = [
    {
      dataField: 'id',
      text: 'S.N',
      formatter: (row, data, index) => {
        return handleIndex(index, offset);
      },
      csvExport: false,
      classes: 'text-center',
      headerClasses: 'text-center d-flex align-items-center justify-content-center flex-column border-0'
    },
    {
      dataField: 'requestKey',
      filter: textFilter(),
      text: 'Key',
      classes: 'text-center',
      headerClasses: 'text-center mx-auto'
    },
    {
      dataField: 'request',
      filter: textFilter(),
      text: 'Request',
      classes: 'text-center',
      headerClasses: 'text-center mx-auto'
    },
    {
      dataField: 'requestedBranch',
      text: 'SOL ID',
      filter: textFilter(),
      headerClasses: 'text-center mx-auto',
      classes: 'text-center'
    },
    {
      dataField: 'swiftUpload',
      text: 'Swift Status',
      formatter: formatSwiftStatus,
      csvFormatter: (cell, row, rowIndex) => {
        if (row.swiftUpload) {
          return 'Transmitted';
        } else if (row.swiftClosed) {
          return 'Not Transmitted and Closed';
        } else {
          return '';
        }
      },
      classes: 'text-center',
      headerClasses: 'text-center d-flex align-items-center justify-content-center flex-column border-0'
    },
    {
      dataField: 'guarantee',
      text: 'Guarantee Type',
      headerClasses: 'text-center mx-auto',
      filter: textFilter(),
      csvFormatter: (cell, row, rowIndex) => {
        if (row?.guarantee === null) {
          return '';
        } else if (row?.guarantee && row?.guarantee.length > 0) {
          return row.guarantee;
        } else {
          return '';
        }
      },
      classes: 'text-center'
    },
    {
      dataField: 'refNums',
      text: 'Reference Number',
      classes: 'text-center',
      headerClasses: 'text-center mx-auto',
      filter: textFilter(),
      csvFormatter: (cell, row, rowIndex) => {
        if (row?.refNums === null) {
          return '';
        } else if (row?.refNums && row?.refNums.length > 0) {
          return row.refNums;
        } else {
          return '';
        }
      }
    },
    {
      dataField: 'beneficiaryName',
      text: 'Beneficiary Name',
      headerClasses: 'text-center mx-auto',
      classes: 'text-center',
      filter: textFilter(),
      csvFormatter: (cell, row, rowIndex) => {
        if (row?.beneficiaryName === (null || undefined)) {
          return '';
        } else if (row?.beneficiaryName && row?.beneficiaryName.length > 0) {
          return row?.beneficiaryName;
        } else {
          return '';
        }
      }
    },
    {
      dataField: 'requestAt',
      filter: textFilter(),
      classes: 'text-center',
      text: 'Last Action by',
      headerClasses: 'text-center mx-auto'
    },
    {
      dataField: 'requestedDate',
      text: 'Requested Date',
      formatter: requestFormatDate,
      headerClasses: 'text-center mx-auto',
      classes: 'text-center',
      filter: textFilter(),
      csvFormatter: (cell, row, rowIndex) => {
        return moment(row.requestedDate).format('MMMM, Do YYYY');
      }
    },
    {
      dataField: 'actionDate',
      text: 'Last Action Date',
      formatter: actionFormatDate,
      csvFormatter: (cell, row, rowIndex) => {
        return moment(row.actionDate).format('MMMM, Do YYYY');
      },
      headerClasses: 'text-center mx-auto',
      filter: textFilter(),
      classes: 'text-center'
    },
    {
      dataField: 'id',
      text: 'Actions',
      classes: 'text-center pr-0',
      headerClasses: 'text-center d-flex align-items-center justify-content-center flex-column border-0',
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        history: props.history
      },
      style: {
        minWidth: '100px'
      },
      csvExport: false
    }
  ];

  if (userInfo?.roleId === 1) {
    columns.splice(4, 0, {
      dataField: 'status',
      text: 'Status',
      formatter: statusColor,
      filter: textFilter(),
      headerClasses: 'text-center mx-auto',
      classes: 'text-center'
    });
  } else if (tabName == 'All') {
    columns.splice(4, 0, {
      dataField: 'statusId',
      filter: textFilter(),
      text: 'Status',
      headerClasses: 'text-center mx-auto',
      csvFormatter: (cell, row, rowIndex) => {
        switch (row.statusId) {
          case 1:
            return 'PENDING';
            break;
          case 2:
            return 'PROCESSING';
            break;
          case 3:
            return 'RETURNED';
            break;
          case 4:
            return 'COMPLETED';
            break;
          case 6:
            return 'CLOSED';
            break;
          default:
            return '';
            break;
        }
      },
      formatter: statusColor,
      classes: 'text-center'
    });
  }

  if (requestList[0]?.requestSenderType === 'user') {
    columns.splice(
      4,
      0,
      {
        dataField: 'name',
        text: 'User',
        filter: textFilter(),
        headerClasses: 'text-center mx-auto',
        classes: 'text-center'
      }

      // {
      //   dataField: 'email',
      //   text: 'Email'
      // }
    );
  } else {
    columns.splice(
      6,
      0,
      {
        dataField: 'customer',
        text: 'Customer',
        filter: textFilter(),
        classes: 'text-center'
      }
      // {
      //   dataField: 'account',
      //   text: 'Account',
      //   csvFormatter: (cell, row, rowIndex) => {
      //     return `"${row.account}"`;
      //   }
      // },
      // {
      //   dataField: 'mobile',
      //   text: 'Contact'
      // }
    );
  }

  // request type
  const QuickActionsDropdownToggle = forwardRef((props, ref) => {
    return (
      <a
        ref={ref}
        href="#"
        onClick={e => {
          e.preventDefault();
          props.onClick(e);
        }}
        id="kt_subheader_quick_actions"
        className="btn btn-white btn-sm"
      >
        <i className="text-danger fas fa-sliders-h"></i> {switchRequestType(reqType)}
      </a>
    );
  });

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    // paginationTotalRenderer: products && products.length,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: '20',
        value: 20
      },
      {
        text: '20',
        value: 20
      },
      {
        text: '50',
        value: 50
      },
      {
        text: '100',
        value: 100
      },
      {
        text: '200',
        value: 200
      },
      {
        text: 'All',
        value: requestList.length
      }
    ] // A numeric array is also available. the purpose of above example is custom the text
  };

  const componentSwitchCustomer = (
    <Col>
      <Switch
        checked={switchCustomer}
        onChange={handleSwitch}
        color="primary"
        name={`switch-customer`}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      Corporate List
    </Col>
  );

  return (
    <>
      {/* Required to switch requests lists between user groups. */}

      <div className="float-right">
        {userInfo.permissions.includes('view-issuance-register') ? (
          <></>
        ) : (
          // <OverlayTrigger placement="left" overlay={<Tooltip id="quick-actions-tooltip">View Issuance Register</Tooltip>}>
          //   {/* <a className="btn btn-white btn-sm mr-1" onClick={() => handleShow()}>
          //     Issuance Register
          //   </a> */}
          //   <Link
          //     to={{
          //       pathname: '/issuance-register'
          //     }}
          //     target="_blank"
          //     rel="noopener noreferrer"
          //   >
          //     <a className="btn btn-white btn-sm mr-1">Issuance Register</a>
          //   </Link>
          // </OverlayTrigger>
          ''
        )}
        {/* <Dropdown className="dropdown-inline" drop="down" alignRight>
          <Dropdown.Toggle as={QuickActionsDropdownToggle} id="dropdown-toggle-quick-actions-subheader" />
          <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-sm dropdown-menu-right">
            <ul className="navi navi-hover">
              <li className="navi-item">
                <Link to="#" onClick={() => internalRequestType('customer')} className="navi-link">
                  Customer
                </Link>
              </li>
              <li className="navi-item">
                <Link to="#" onClick={() => internalRequestType('internal')} className="navi-link">
                  Internal
                </Link>
              </li>
            </ul>
          </Dropdown.Menu>
        </Dropdown> */}
        <FilterButton id="kt_quick_panel_toggle" />
      </div>
      <RequestFilterPanel reqSearch={test => handleSearch(test)} handleReset={handleReset} />
      <div className="float-right">
        {/* <Button className="btn btn-secondary" onClick={newRequestTab()}>
          New Request
        </Button> */}

        {/* Internal Request 
        <Link onClick={newInternalRequest} className="btn btn-primary mr-2 btn-sm">
          New Request
        </Link> 
        */}
      </div>

      {userInfo.roleId === 1 ? (
        <Tabs activeKey={tabNameAdmin} onSelect={handleToggleTab} id="uncontrolled-tab-example">
          <Tab eventKey="All" title="All">
            <CustomLoadingOverlay isLoading={reqVisible}>
              <Card style={{ display: 'inline-block' }}>
                <CardHeader title="All List">
                  <CardHeaderToolbar>{componentSwitchCustomer}</CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                  {/* <BootstrapTable
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    keyField="id"
                    data={requestList}
                    columns={columns}
                  /> */}
                  <ToolkitProvider
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                    keyField="id"
                    data={requestList}
                    columns={columns}
                    search
                  >
                    {props => (
                      <>
                        <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                        <hr />
                        <div>
                          <BootstrapTable
                            {...props.baseProps}
                            filter={filterFactory({
                              custom: filters
                            })}
                            noDataIndication="There is no solution"
                            hover
                            condensed
                          />
                        </div>
                      </>
                    )}
                  </ToolkitProvider>
                  <PaginationPage
                    handlePageChange={handlePageChange}
                    handlePageSizeChange={handlePageSizeChange}
                    offset={offset}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    totalPages={totalPages}
                    page={page}
                  />
                </CardBody>
              </Card>
            </CustomLoadingOverlay>
          </Tab>
        </Tabs>
      ) : userInfo.permissions.includes('swift-user') ? (
        <Tabs activeKey={tabNameAdmin} onSelect={handleToggleTab} id="uncontrolled-tab-example">
          <Tab eventKey="All" title="Approved">
            <Card style={{ display: 'inline-block' }}>
              <CardHeader title="Approved List">
                <CardHeaderToolbar></CardHeaderToolbar>
              </CardHeader>
              <CardBody>
                <Tabs defaultActiveKey="All" id="uncontrolled-tab-example" className="mb-3">
                  <Tab eventKey="All" title="All">
                    <ToolkitProvider
                      wrapperClasses="table-responsive"
                      bordered={false}
                      classes="table table-head-custom table-vertical-center overflow-hidden"
                      bootstrap4
                      remote
                      keyField="id"
                      exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                      data={requestList}
                      columns={columns}
                    >
                      {props => (
                        <>
                          <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                          <hr />
                          <div>
                            <BootstrapTable
                              {...props.baseProps}
                              filter={filterFactory({
                                custom: filters
                              })}
                              noDataIndication="There is no solution"
                              hover
                              condensed
                            />
                          </div>
                        </>
                      )}
                    </ToolkitProvider>
                  </Tab>
                  <Tab eventKey="notTransmitted" title="Not Transmitted">
                    {/* <BootstrapTable
                      wrapperClasses="table-responsive"
                      bordered={false}
                      classes="table table-head-custom table-vertical-center overflow-hidden"
                      bootstrap4
                      remote
                      keyField="id"
                      data={requestList.filter(list => list.swiftUpload == false)}
                      columns={columns}
                    /> */}
                    <ToolkitProvider
                      wrapperClasses="table-responsive"
                      bordered={false}
                      classes="table table-head-custom table-vertical-center overflow-hidden"
                      bootstrap4
                      remote
                      keyField="id"
                      exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                      data={requestList.filter(list => list.swiftUpload != true && list.swiftClosed != true)}
                      columns={columns}
                    >
                      {props => (
                        <>
                          <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                          <hr />
                          <div>
                            <BootstrapTable
                              {...props.baseProps}
                              filter={filterFactory({
                                custom: filters
                              })}
                              noDataIndication="There is no solution"
                              hover
                              condensed
                            />
                          </div>
                        </>
                      )}
                    </ToolkitProvider>
                  </Tab>
                  <Tab eventKey="transmitted" title="Transmitted">
                    <ToolkitProvider
                      wrapperClasses="table-responsive"
                      bordered={false}
                      classes="table table-head-custom table-vertical-center overflow-hidden"
                      bootstrap4
                      remote
                      keyField="id"
                      exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                      data={requestList.filter(list => list.swiftUpload == true)}
                      columns={columns}
                    >
                      {props => (
                        <>
                          <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                          <hr />
                          <div>
                            <BootstrapTable
                              {...props.baseProps}
                              filter={filterFactory({
                                custom: filters
                              })}
                              noDataIndication="There is no solution"
                              hover
                              condensed
                            />
                          </div>
                        </>
                      )}
                    </ToolkitProvider>
                  </Tab>
                  <Tab eventKey="closed" title="Closed & Not Transmitted">
                    <ToolkitProvider
                      wrapperClasses="table-responsive"
                      bordered={false}
                      classes="table table-head-custom table-vertical-center overflow-hidden"
                      bootstrap4
                      remote
                      keyField="id"
                      exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                      data={requestList.filter(list => list.swiftClosed == true)}
                      columns={columns}
                    >
                      {props => (
                        <>
                          <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                          <hr />
                          <div>
                            <BootstrapTable
                              {...props.baseProps}
                              filter={filterFactory({
                                custom: filters
                              })}
                              noDataIndication="There is no solution"
                              hover
                              condensed
                            />
                          </div>
                        </>
                      )}
                    </ToolkitProvider>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      ) : (
        <Tabs activeKey={tabName} onSelect={handleToggleTab} id="uncontrolled-tab-example">
          <Tab eventKey="Bucket" title="Bucket">
            <CustomLoadingOverlay isLoading={reqVisible}>
              <Card style={{ display: 'inline-block' }}>
                <>
                  <CardHeader title="Bucket List">
                    <CardHeaderToolbar>
                      <Form.Group>
                        <Form.Label>Multiple Pick</Form.Label>
                        <Switch
                          checked={multiplePick}
                          color="primary"
                          name={`switch-enable-preview`}
                          onChange={handleMultiplePick}
                          value={multiplePickRef.current}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </Form.Group>
                    </CardHeaderToolbar>
                  </CardHeader>
                  <CustomLoadingOverlay isLoading={visible}>
                    <CardBody>
                      {/* <BootstrapTable
                          wrapperClasses="table-responsive"
                          bordered={false}
                          classes="table table-head-custom table-vertical-center overflow-hidden"
                          bootstrap4
                          remote
                          keyField="id"
                          data={requestList}
                          columns={columns}
                        /> */}
                      <ToolkitProvider
                        wrapperClasses="table-responsive"
                        bordered={false}
                        classes="table table-head-custom table-vertical-center overflow-hidden"
                        bootstrap4
                        remote
                        exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                        keyField="id"
                        data={requestList}
                        columns={columns}
                      >
                        {props => (
                          <>
                            <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                            <hr />
                            <div>
                              <BootstrapTable
                                {...props.baseProps}
                                filter={filterFactory({
                                  custom: filters
                                })}
                                noDataIndication="There is no solution"
                                hover
                                condensed
                              />
                            </div>
                          </>
                        )}
                      </ToolkitProvider>
                    </CardBody>
                  </CustomLoadingOverlay>
                </>
              </Card>
            </CustomLoadingOverlay>
          </Tab>
          <Tab eventKey="Pending" title="Pending">
            <CustomLoadingOverlay isLoading={reqVisible}>
              <Card style={{ display: 'inline-block' }}>
                <>
                  <CardHeader title="Pending List">
                    <CardHeaderToolbar>
                      <NextButton
                        handleNext={() => {
                          handleToggleTab('Upcoming');
                        }}
                      />
                    </CardHeaderToolbar>
                  </CardHeader>
                  <CardBody>
                    <ToolkitProvider
                      wrapperClasses="table-responsive"
                      bordered={false}
                      classes="table table-head-custom table-vertical-center overflow-hidden"
                      bootstrap4
                      remote
                      exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                      keyField="id"
                      data={requestList}
                      columns={columns}
                    >
                      {props => (
                        <>
                        <div className='d-flex justify-content-between'>
                        <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                        <div>
                        <button type="button" class="btn btn-primary">
                           MultiPick <span class="badge badge-light">{multipickIds?.length}</span>
                        </button>
                        </div>
                        </div>
                          <hr />
                          <div>
                            <BootstrapTable
                              {...props.baseProps}
                              filter={filterFactory({
                                custom: filters
                              })}
                              noDataIndication="There is no solution"
                              hover
                              condensed
                            />
                          </div>
                        </>
                      )}
                    </ToolkitProvider>
                  </CardBody>
                </>
              </Card>
            </CustomLoadingOverlay>
          </Tab>
          <Tab eventKey="Upcoming" title="Upcoming">
            <CustomLoadingOverlay isLoading={reqVisible}>
              <Card style={{ display: 'inline-block' }}>
                <CardHeader title="Upcoming List">
                  <CardHeaderToolbar>
                    <PreviousButton handlePrevious={() => handleToggleTab('Pending')} />
                    <NextButton
                      handleNext={() => {
                        handleToggleTab('Forwarded');
                      }}
                    />
                  </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                  <ToolkitProvider
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                    keyField="id"
                    data={requestList}
                    columns={columns}
                  >
                    {props => (
                      <>
                        <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                        <hr />
                        <div>
                          <BootstrapTable
                            {...props.baseProps}
                            filter={filterFactory({
                              custom: filters
                            })}
                            noDataIndication="There is no solution"
                            hover
                            condensed
                          />
                        </div>
                      </>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>
            </CustomLoadingOverlay>
          </Tab>

          <Tab eventKey={'Forwarded'} title="Forwarded">
            <CustomLoadingOverlay isLoading={reqVisible}>
              <Card style={{ display: 'inline-block' }}>
                <CardHeader title="Forwarded List">
                  <CardHeaderToolbar>
                    <PreviousButton handlePrevious={() => handleToggleTab('Upcoming')} />
                    <NextButton
                      handleNext={() => {
                        handleToggleTab('Approved');
                      }}
                    />
                  </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                  <ToolkitProvider
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                    keyField="id"
                    data={requestList}
                    columns={columns}
                  >
                    {props => (
                      <>
                        <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                        <hr />
                        <div>
                          <BootstrapTable
                            {...props.baseProps}
                            filter={filterFactory({
                              custom: filters
                            })}
                            noDataIndication="There is no solution"
                            hover
                            condensed
                          />
                        </div>
                      </>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>
            </CustomLoadingOverlay>
          </Tab>
          <Tab eventKey={'Approved'} title="Approved">
            <CustomLoadingOverlay isLoading={reqVisible}>
              <Card style={{ display: 'inline-block' }}>
                <CardHeader title="Approved List">
                  <CardHeaderToolbar>
                    <PreviousButton handlePrevious={() => handleToggleTab('Forwarded')} />
                    <NextButton
                      handleNext={() => {
                        handleToggleTab('Closed');
                      }}
                    />
                  </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                  <ToolkitProvider
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                    keyField="id"
                    data={requestList}
                    columns={columns}
                  >
                    {props => (
                      <>
                        <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                        <hr />
                        <div>
                          <BootstrapTable
                            {...props.baseProps}
                            filter={filterFactory({
                              custom: filters
                            })}
                            noDataIndication="There is no solution"
                            hover
                            condensed
                          />
                        </div>
                      </>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>
            </CustomLoadingOverlay>
          </Tab>

          <Tab eventKey="Closed" title="Closed">
            <CustomLoadingOverlay isLoading={reqVisible}>
              <Card style={{ display: 'inline-block' }}>
                <CardHeader title="Closed List">
                  <CardHeaderToolbar>
                    <PreviousButton handlePrevious={() => handleToggleTab('Approved')} />
                    <NextButton
                      handleNext={() => {
                        handleToggleTab('Returned');
                      }}
                    />
                  </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                  <ToolkitProvider
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                    keyField="id"
                    data={requestList}
                    columns={columns}
                  >
                    {props => (
                      <>
                        <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                        <hr />
                        <div>
                          <BootstrapTable
                            {...props.baseProps}
                            filter={filterFactory({
                              custom: filters
                            })}
                            noDataIndication="There is no solution"
                            hover
                            condensed
                          />
                        </div>
                      </>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>
            </CustomLoadingOverlay>
          </Tab>
          <Tab eventKey={'Returned'} title="Returned">
            <CustomLoadingOverlay isLoading={reqVisible}>
              <Card style={{ display: 'inline-block' }}>
                <CardHeader title="Returned List">
                  <CardHeaderToolbar>
                    <PreviousButton handlePrevious={() => handleToggleTab('Closed')} />
                    <NextButton
                      handleNext={() => {
                        handleToggleTab('All');
                      }}
                    />
                  </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                  {/* <BootstrapTable
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    keyField="id"
                    data={requestList}
                    columns={columns}
                  /> */}
                  <ToolkitProvider
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                    keyField="id"
                    data={requestList}
                    columns={columns}
                  >
                    {props => (
                      <>
                        <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                        <hr />
                        <div>
                          <BootstrapTable
                            {...props.baseProps}
                            filter={filterFactory({
                              custom: filters
                            })}
                            noDataIndication="There is no solution"
                            hover
                            condensed
                          />
                        </div>
                      </>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>
            </CustomLoadingOverlay>
          </Tab>

          <Tab eventKey={'All'} title="All">
            <CustomLoadingOverlay isLoading={reqVisible}>
              <Card style={{ display: 'inline-block' }}>
                <CardHeader title="All List">
                  <CardHeaderToolbar>
                    {componentSwitchCustomer}
                    <PreviousButton handlePrevious={() => handleToggleTab('Returned')} />
                  </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                  <ToolkitProvider
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    exportCSV={{ onlyExportFiltered: true, exportAll: false }}
                    keyField="id"
                    data={requestList}
                    columns={columns}
                  >
                    {props => (
                      <>
                        <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                        <hr />
                        <div>
                          <BootstrapTable
                            {...props.baseProps}
                            filter={filterFactory({
                              custom: filters
                            })}
                            noDataIndication="There is no solution"
                            hover
                            condensed
                          />
                        </div>
                      </>
                    )}
                  </ToolkitProvider>
                </CardBody>
              </Card>
            </CustomLoadingOverlay>
          </Tab>
        </Tabs>
      )}

      {!userInfo.permissions.includes('swift-user') ? (
        <PaginationPage
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          offset={offset}
          pageSize={pageSize}
          totalItems={totalItems}
          totalPages={totalPages}
          page={page}
        />
      ) : (
        ''
      )}
    </>
  );
};
