import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { useSelector } from 'react-redux';
import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { server } from '../../config/server';
import A from '../../config/url';
import { statusColor } from '../../util';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const { ExportCSVButton } = CSVExport;
const { SearchBar } = Search;

const BgTABLE = props => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const userInfo = useSelector(state => state.user?.data.user);

  const ColumnFormatter = (requestId, row) => {
    // console.log('REQUEST ID', requestId);

    return (
      <>
        <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">View</Tooltip>}>
          <Link
            to={{
              pathname: 'requests/view/' + requestId,
              search: '?i=' + A.getHash(requestId) + '&&' + '?s=',
              state: {
                RequestView: '?i=' + A.getHash(requestId) + '&&' + '?s='
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
  const columns = [
    {
      dataField: 'date',
      text: 'Date',
      // searchable: false
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'reference_number',
      text: 'Reference Number',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'branch_name',
      text: 'Branch Name',
      sort: true
    },
    {
      dataField: 'sol_id',
      text: 'Sol ID',
      filter: textFilter({
        defaultValue: userInfo && userInfo.permissions.includes('view-self-branch-requests') ? userInfo.solId : '',
        disabled: userInfo && userInfo.permissions.includes('view-self-branch-requests') ? true : false
      }),
      sort: true
    },
    {
      dataField: 'applicant',
      text: 'Applicant',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'beneficiary',
      text: 'Beneficiary',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'CCY',
      text: 'CCY',
      sort: true
    },
    {
      dataField: 'amount',
      text: 'Amount',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'validity',
      text: 'Validity',
      searchable: false,
      sort: true
    },
    {
      dataField: 'margin',
      text: 'Margin',
      sort: true
    },
    {
      dataField: 'commission',
      text: 'Commission',
      sort: true
    },
    {
      dataField: 'statusId',
      text: 'Status',
      formatter: statusColor,
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
            return null;
            break;
        }
      }
    },
    {
      dataField: 'id',
      text: 'Actions',
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      formatter: ColumnFormatter,
      csvExport: false
    }
  ];
  const getData = () => {
    /**Currently commented this BG Issuance Report code due to slowness */
    // server
    //   .get('/getBgData')
    //   .then(res => {
    //     setData(res.data.data);
    //   })
    //   .catch(err => {
    //     console.log('Error==>', err);
    //   });
  };
  const getMappedData = data => {
    if (data.length > 0) {
      let mappedData = data.map(item => {
        return {
          id: item['id'] ? item['id'] : '',
          date: item['Date'] ? item['Date'].split('T')[0] : '',
          reference_number: item['Reference Number'] ? item['Reference Number'].slice(1, -1) : '',
          branch_name: item['Branch Name'] ? item['Branch Name'] : '',
          statusId: item['statusId'] ? item['statusId'] : '',
          sol_id: item['Sol Id'] ? item['Sol Id'] : '',
          applicant: item['Applicant Name'] ? item['Applicant Name'].slice(1, -1) : '',
          beneficiary: item['Beneficiary Name'] ? item['Beneficiary Name'].slice(1, -1) : '',
          CCY: item['CCY'] ? item['CCY'].slice(1, -1) : '',
          amount: item['Amount'] ? item['Amount'].slice(1, -1) : '',
          validity: item['Validity Period'] ? item['Validity Period'].slice(1, -1) : '',
          margin: item['Margin Amount'] ? item['Margin Amount'].slice(1, -1) : '',
          commission: item['Commission'] ? item['Commission'].slice(1, -1) : ''
        };
      });
      setProducts(mappedData);
    }
  };
  useEffect(() => {
    getData();
    data.length > 0 && getMappedData(data);
  }, [data.length]);
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
        text: '30',
        value: 30
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
        text: 'All',
        value: products.length
      }
    ] // A numeric array is also available. the purpose of above example is custom the text
  };
  return (
    // style={{ background: 'blue' }}

    <div className="card card-custom gutter-b">
      <div className="card-body">
        <ToolkitProvider
          keyField="id"
          data={products}
          columns={columns}
          exportCSV={{ onlyExportFiltered: true, exportAll: false }}
          search
        >
          {props => (
            <div>
              <ExportCSVButton {...props.csvProps}> Export CSV!!</ExportCSVButton>
              <hr />
              <SearchBar {...props.searchProps} />
              <BootstrapTable {...props.baseProps} filter={filterFactory()} pagination={paginationFactory(options)} />
            </div>
          )}
        </ToolkitProvider>
      </div>
    </div>
  );
};
export { BgTABLE };
