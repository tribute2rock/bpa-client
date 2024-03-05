import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { Form, Tab, Col, Tabs, OverlayTrigger, Tooltip, Dropdown, Modal } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import A from '../../../../../config/url';
import { useLocation, Link } from 'react-router-dom';
import PaginationPage from '../../../../components/pagination';
import CustomLoadingOverlay from '../../../../components/CustomLoadingOverlay';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import { toast } from 'react-toastify';
import { getBibiniList } from './api/bibiniFetch';
import { getPageParams, bibiniFormatDate, handleIndex } from '../../../../../util';
import { submitRequestAction } from '../../../Requests/pages/requests/api';
import { VoidButton } from '../../../../components/Buttons';
import BibiniFilterPanel from './BibiniFilterPanel';
import moment from 'moment';
const { ExportCSVButton } = CSVExport;
export const BibiniList = props => {
  const initialLocation = useLocation();
  const [bibiniList, setBibiniList] = useState([]);
  const [tabName, setTabName] = useState('All');
  const [offset, setOffset] = useState(0);
  const [pageSize, setpageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState([]);
  const [reqVisible, setreqVisible] = useState(false);

  useEffect(() => {
    getAllRequests();
  }, [pageSize, page, search, offset]);
  const getAllRequests = () => {
    setreqVisible(true);
    const params = getPageParams(page, pageSize);
    let reqParams = {
      page: params.page,
      pageSize: params.pageSize
    };

    if (search.length > 0 && search[0]?.value != '') {
      reqParams['search'] = JSON.stringify(search);
    }
    getBibiniList(reqParams, (err, data) => {
      if (!err) {
        setreqVisible(false);
        setTotalItems(data.data.totalItems);
        setTotalPages(data.data.totalPages);
        setOffset(data.data.offset);
        setBibiniList(data.data.pageData);
      }
    });
  };
  const handlePageChange = (event, value) => {
    setPage(value);
    getAllRequests();
  };
  const handlePageSizeChange = e => {
    setpageSize(Number(e.target.value));
    setPage(1);
    getAllRequests();
  };
  const handleSearch = filter => {
    setPage(1);
    setSearch(filter);
  };

  const handleReset = () => {
    setPage(1);
    setSearch([{ field: 'copy', operator: 'like', value: '', value2: '' }]);
  };

  const ActionsColumnFormatter = (requestId, request) => {
    const formData = new FormData();
    formData.append('actionId', 8);
    const Void = () => {
      submitRequestAction(requestId, formData, (err, data) => {
        if (!err) {
          toast.success(data.message ?? 'Request void successfully.');
        } else {
          toast.error(err.response?.data?.message ?? 'Failed to perform action on request.');
        }
      });
    };
    return (
      <div className="d-flex justify-content-end">
        <div>
          <CustomLoadingOverlay>
            <VoidButton handleVoid={Void} />
          </CustomLoadingOverlay>
        </div>
        <div>
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
        </div>
      </div>
    );
  };
  const columns = [
    {
      dataField: 'rId',
      text: 'S.N',
      formatter: (row, data, index) => {
        return handleIndex(index, offset);
      },
      csvExport: false
    },
    {
      dataField: 'requestKey',
      text: 'Key'
    },
    {
      dataField: 'form',
      text: 'Request'
    },
    {
      dataField: 'copy',
      text: 'Bibini Number'
    },
    {
      dataField: 'branch',
      text: 'Branch'
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: row => {
        if (row == 6) {
          return <span className="badge badge-danger">Void</span>;
        } else {
          return <span className="badge badge-success">Issued</span>;
        }
      }
    },
    {
      dataField: 'voidUser',
      text: 'Void Marked By'
    },
    {
      dataField: 'voidDate',
      text: 'Void Date',
      formatter: bibiniFormatDate
    },
    {
      dataField: 'rId',
      text: 'Actions',
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
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
  return (
    <>
      <BibiniFilterPanel reqSearch={test => handleSearch(test)} handleReset={handleReset} />
      <Card style={{ display: 'inline-block' }}>
        <CardBody>
          {/* <BootstrapTable
                    wrapperClasses="table-responsive"
                    bordered={false}
                    classes="table table-head-custom table-vertical-center overflow-hidden"
                    bootstrap4
                    remote
                    keyField="id"
                    data={bibiniList}
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
            data={bibiniList}
            columns={columns}
          >
            {props => (
              <>
                <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
                <hr />
                <BootstrapTable {...props.baseProps} />
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
    </>
  );
};
