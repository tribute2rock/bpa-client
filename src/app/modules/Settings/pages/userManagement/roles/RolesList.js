import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../../_metronic/_partials/controls';
import BootstrapTable from 'react-bootstrap-table-next';
import { RolesFilterPanel } from './RolesFilterPanel';
import KTLayoutQuickPanel from '../../../../../../_metronic/_assets/js/layout/extended/quick-panel';
import { KTUtil } from '../../../../../../_metronic/_assets/js/components/util';
import Swal from 'sweetalert2';
import { AddButton, DeleteButton, EditButton, FilterButton } from '../../../../../components/Buttons';
import { deleteRole, getRoles } from './api';
import { formatDate, getPageParams, handleIndex } from '../../../../../../util';
import { toast } from 'react-toastify';
import PaginationPage from '../../../../../components/pagination';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;
export const RolesList = () => {
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [searchParam, setSearchParam] = useState();

  const updateData = value => {
    Roles(value);
    KTUtil.ready(function() {
      KTLayoutQuickPanel.init('kt_quick_panel');
    });
  };

  useEffect(() => {
    updateData();
  }, [search, searchParam, pageSize, page, offset]);

  const Roles = value => {
    const params = getPageParams(page, pageSize);
    if (search && search.trim() != '') {
      params['search'] = search;
    }
    getRoles(params, (err, data) => {
      if (!err) {
        setTotalItems(data.totalItems);
        setOffset(data.offset);
        setTotalPages(data.totalPages);
        setRoles(data.pageData);
      }
    });
  };

  // useLayoutEffect(() => {
  //   // Initialization
  //   KTUtil.ready(function() {
  //     KTLayoutQuickPanel.init('kt_quick_panel');
  //   });
  // });

  const handlePageChange = (event, value) => {
    setPage(value);
    updateData();
  };

  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
    setPage(1);
    updateData();
  };

  const ActionsColumnFormatter = cell => {
    const deleteFunction = () => {
      Swal.fire({
        title: '',
        text: 'Are you sure you want to permanently delete this role?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      }).then(async result => {
        if (result.isConfirmed) {
          deleteRole(cell, (err, data) => {
            if (err) return;
            if (data) {
              updateData();
              // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              toast.success('Role deleted successfully.');
            }
          });
        }
      });
    };
    return (
      <>
        <EditButton to={`/roles/edit?id=${cell}`} />
        <DeleteButton handleClick={deleteFunction} />
      </>
    );
  };
  const columns = [
    {
      dataField: 'id',
      text: 'S.N',
      formatter: (row, data, index) => {
        return handleIndex(index, offset);
      }
    },
    {
      dataField: 'name',
      text: 'Name'
    },
    {
      dataField: 'description',
      text: 'Description'
    },
    {
      dataField: 'createdAt',
      text: 'created At',
      formatter: formatDate
    },
    {
      dataField: 'id',
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
    setSearch(value);
    setPage(1);
    updateData(value);
  };
  const handleCallback = data => {
    setSearchParam({ ...searchParam, filterData: data ? data : null });
  };

  return (
    <Card>
      <RolesFilterPanel parentCallback={handleCallback} />
      <CardHeader title="Roles List">
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
                placeholder="Search role by name...."
                style={{ width: 250 + 'px', marginTop: 10 + 'px', borderLeft: 'none' }}
              />
            </div>
          </div>
          <AddButton to="/roles/new" value="New Role" />
          {/* <FilterButton id="kt_quick_panel_toggle" /> */}
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
          data={roles || []}
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
          data={roles || []}
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
  );
};
