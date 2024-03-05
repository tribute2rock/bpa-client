import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../../_metronic/_partials/controls';
import BootstrapTable from 'react-bootstrap-table-next';
import KTLayoutQuickPanel from '../../../../../../_metronic/_assets/js/layout/extended/quick-panel';
import { KTUtil } from '../../../../../../_metronic/_assets/js/components/util';
import { AddButton, DeleteButton, EditButton, FilterButton, ResetButton } from '../../../../../components/Buttons';
import SearchBox from '../../../../../components/searchBox';
import { getUsers, updateUserStatus, deleteUser, resetPassword } from './api/user';
import A from '../../../../../../config/url';
import { formatDate, getPageParams, handleIndex } from '../../../../../../util';
import { toast } from 'react-toastify';
import { UsersFilterPanel } from './UsersFilterPanel';
import Swal from 'sweetalert2';
import { Switch } from '@material-ui/core';
import { pageSizes } from '../../../../../../values/values';
import PaginationPage from '../../../../../components/pagination';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;
const UsersList = () => {
  const [userData, setUserData] = useState([]);
  const [searchParam, setSearchParam] = useState();
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');

  const updateData = value => {
    User(value);
    KTUtil.ready(function() {
      KTLayoutQuickPanel.init('kt_quick_panel');
    });
  };

  useEffect(() => {
    updateData();
  }, [search, searchParam, pageSize, page, offset]);

  const User = value => {
    const params = getPageParams(page, pageSize);
    if (search && search.trim() != '') {
      params['search'] = search;
    }
    getUsers(params, (err, data) => {
      if (err) {
        toast.error('Error while fetching users.');
      } else {
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
        setOffset(data.offset);
        setUserData(data?.pageData ? data.pageData : []);
      }
    });
  };

  const handlePasswordReset = async id => {
    const confirmValue = await Swal.fire({
      title: '',
      text: 'Are you sure you want Reset Password?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red'
    });

    if (confirmValue.value) {
      resetPassword(id, err => {
        if (err) {
          if (err?.message) toast.error(err.message);
          else toast.error('Error while password reset.');
        } else {
          toast.success('Password reset success!');
        }
      });
    }
  };

  const ActionsColumnFormatter = id => {
    return (
      <>
        <ResetButton value="Reset Password" handleReset={() => handlePasswordReset(id)} />

        {/* <DeleteButton
          handleClick={() => {
            handleDelete(id);
          }}
        /> */}
      </>
    );
  };

  const handleDelete = async id => {
    const confirmValue = await Swal.fire({
      title: '',
      text: 'Are you sure you want to permanently delete this user?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red'
    });

    if (confirmValue.value) {
      deleteUser(id, (err, data) => {
        if (!err) {
          toast.info(data.message);
          updateData();
        } else {
          toast.error('Failed to delete user');
        }
      });
    }
  };
  const handleSearchChange = e => {
    const searchValue = e.target.value;
    setSearchParam({ ...searchParam, email: searchValue });
  };

  const handleSwitch = e => {
    const value = e.target.value === 'true';
    const isActive = !value;
    const id = Number(e.target.name.split('switch-')[1]);
    Swal.fire({
      title: 'Are you sure?',
      text: `The user authorization status will be ${isActive == true ? 'active' : 'inactive'} from now on.`,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red'
    }).then(result => {
      if (result.value) {
        const data = { id, isActive };
        updateUserStatus(data, () => {
          updateData();
        });
      }
    });
  };

  const ActiveColumnSwitch = (cell, row) => {
    return (
      <Switch
        checked={row.isActive}
        onChange={handleSwitch}
        color="primary"
        name={`switch-${row.id}`}
        value={row.isActive}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    );
  };

  const columns = [
    {
      dataField: 'id',
      text: 'S.N.',
      formatter: (row, data, index) => {
        return handleIndex(index, 0);
      }
    },
    {
      dataField: 'accountName',
      text: 'Account Name'
    },
    {
      dataField: 'accountNumber',
      text: 'Account Number'
    },
    {
      dataField: 'email',
      text: 'Email'
    },
    {
      dataField: 'mobileNumber',
      text: 'MobileNumber'
    },

    {
      dataField: 'branchSol',
      text: 'Branch SOL'
    },
    {
      dataField: 'createdAt',
      text: 'Created Date',
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

  const handleCallback = data => {
    setSearchParam({ ...searchParam, filterData: data ? data : null });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // updateData();
  };

  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
    setPage(1);
    // updateData();
  };

  const handleSearch = e => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);
    updateData(value);
  };

  return (
    <Card>
      <UsersFilterPanel parentCallback={handleCallback} />
      <CardHeader title="Customers list">
        <CardHeaderToolbar>
          {/* <SearchBox placeholder={'Search Email'} searchInput={searchParam?.email} handleSearchChange={handleSearchChange} /> */}
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
                placeholder="Search user by email...."
                style={{ width: 250 + 'px', marginTop: 10 + 'px', borderLeft: 'none' }}
              />
            </div>
          </div>
          {/* <AddButton to="/users/new" value="Create User" /> */}
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
          data={userData}
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
          data={userData}
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
          // handleSearchChange={handleSearch}
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

export default UsersList;
