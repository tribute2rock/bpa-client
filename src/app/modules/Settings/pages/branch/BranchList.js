import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { formatDate, getPageParams, handleIndex } from '../../../../../util';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { AddButton, DeleteButton, EditButton } from '../../../../components/Buttons';
import PaginationPage from '../../../../components/pagination';
import A from '../../../../../config/url';
import { deleteBranch, getBranches } from './api/branch';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;
export function BranchList() {
  const [branchList, setBranchList] = useState([]);
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');

  const updateData = value => {
    const params = getPageParams(page, pageSize);
    if (search && search.trim() != '') {
      params['search'] = search;
    }

    getBranches(params, (err, data) => {
      if (err) {
        alert('Error!');
      } else {
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
        setOffset(data.offset);
        setBranchList(data.pageData);
      }
    });
  };

  useEffect(() => {
    updateData();
  }, [search, pageSize, page, offset]);

  const handlePageChange = (event, value) => {
    setPage(value);
    // updateData();
  };

  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
    setPage(1);
    // updateData();
  };

  const handleDelete = async id => {
    const confirmValue = await Swal.fire({
      title: '',
      text: 'Are you sure you want to permanently delete this branch?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red'
    });
    if (confirmValue.value) {
      deleteBranch(id, (err, data) => {
        if (!err) {
          toast.success(data.message);
        } else {
          toast.error('Failed to delete form');
        }
        updateData();
      });
    }
  };

  const ActionsColumnFormatter = (row, rowIndex) => {
    return (
      <>
        <EditButton to={`/branch/edit?id=${A.getHash(rowIndex.id)}`} />
        <DeleteButton handleClick={() => handleDelete(rowIndex.id)} />
      </>
    );
  };

  const Increaseid = (row, key, rowIndex) => {
    let i = rowIndex + 1;
    return ++i;
  };

  const columns = [
    {
      dataField: 'id',
      text: 'S.N.',
      formatter: (row, data, index) => {
        return handleIndex(index, offset);
      },
      csvExport: false
    },
    {
      dataField: 'name',
      text: 'Branch'
    },
    {
      dataField: 'sol',
      text: 'Branch Code',
      csvFormatter: (cell, row, rowIndex) => `(${row.sol})`
    },
    {
      dataField: 'lc_decentralized',
      text: 'Decentralized LC',
      formatter: row => {
        if (row == true) {
          return <span className="badge badge-success">Enabled</span>;
        } else {
          return <span className="badge badge-secondary">Disabled</span>;
        }
      }
    },
    {
      dataField: 'bg_decentralized',
      text: 'Decentralized BG',
      formatter: row => {
        if (row == true) {
          return <span className="badge badge-success">Enabled</span>;
        } else {
          return <span className="badge badge-secondary">Disabled</span>;
        }
      }
    },
    {
      dataField: 'createdAt',
      text: 'Created At',
      formatter: formatDate
    },
    {
      dataField: 'action',
      text: 'Actions',
      classes: 'text-right pr-0',
      headerClasses: 'text-right pr-3',
      formatter: ActionsColumnFormatter,
      style: {
        minWidth: '100px'
      },
      csvExport: false
    }
  ];

  const handleSearch = e => {
    const value = e.target.value;
    setPage(1);
    setSearch(value);
    updateData(value);
  };
  return (
    <>
      <Card>
        <CardHeader title="Branch List">
          <CardHeaderToolbar>
            <div className="col-auto">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text bg-white" style={{ marginTop: 10 + 'px', borderRight: 'none' }}>
                    <i className="fa fa-search"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control d-inline-block"
                  id="inlineFormInputGroup"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search group by name...."
                  style={{ width: 250 + 'px', marginTop: 10 + 'px', borderLeft: 'none' }}
                />
              </div>
            </div>
            <AddButton to="/branch/add" value="Add Branch" />
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <ToolkitProvider
            wrapperClasses="table-responsive"
            bordered={false}
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bootstrap4
            remote
            keyField="id"
            exportCSV={{ onlyExportFiltered: true, exportAll: false }}
            data={branchList}
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
}
