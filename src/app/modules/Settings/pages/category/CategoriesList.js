import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import BootstrapTable from 'react-bootstrap-table-next';
import { AddButton, DeleteButton, EditButton } from '../../../../components/Buttons';
import SearchBox from '../../../../components/searchBox';
import { getCategories, deleteCategory, updateStatus } from './api/category';
import A from '../../../../../config/url';
import { Switch } from '@material-ui/core';
import { formatDate, getPageParams, handleIndex } from '../../../../../util';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import PaginationPage from '../../../../components/pagination';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;

export function CategoriesList() {
  const [categoryList, setCategoryList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  const updateData = value => {
    const params = getPageParams(page, pageSize);
    if (search && search.trim() != '') {
      params['search'] = search;
    }
    getCategories(params, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while fetching categories.');
      } else {
        setTotalItems(data.data.totalItems);
        setTotalPages(data.data.totalPages);
        setOffset(data.data.offset);
        setCategoryList(data.data.pageData);
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

  const ActionsColumnFormatter = (row, rowIndex) => {
    return (
      <>
        <EditButton to={`/categories/edit?id=${A.getHash(rowIndex.id)}`} />
        <DeleteButton
          handleClick={() => {
            handleDelete(rowIndex.id);
          }}
        />
      </>
    );
  };

  const handleDelete = async id => {
    const confirmValue = await Swal.fire({
      title: '',
      text: 'Are you sure you want to permanently delete this category?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red'
    });

    if (confirmValue.value) {
      deleteCategory(id, (err, data) => {
        if (!err) {
          toast.info(data.message);
        } else {
          toast.error('Failed to delete form');
        }
        updateData();
      });
    }
  };

  const handleChange = e => {
    const value = e.target.value === 'true';
    const isActive = !value;
    const id = Number(e.target.name.split('switch-')[1]);
    let message = 'The category will be inactive and will be hidden from customers.';
    let color = 'red';
    if (e.target.checked) {
      message = 'The category will be active and will be shown from customers.';
      color = 'green';
    }
    Swal.fire({
      title: 'Are you sure?',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: color
    }).then(function(result) {
      if (result.value) {
        updateStatus(id, (err, data) => {
          if (err) {
            toast.error(err.response.data.message ?? 'Failed to update category status.');
          } else {
            updateData();
            toast.success(data.message ?? 'Category updated successfully.');
          }
        });
      }
    });
  };

  const ActiveColumnSwitch = (cell, row) => {
    return (
      <Switch
        checked={row.isActive}
        onChange={handleChange}
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
      text: 'Identity No.',
      formatter: (row, data, index) => {
        return handleIndex(index, offset);
      },
      csvExport: false
    },
    {
      dataField: 'name',
      text: 'Name'
    },
    {
      dataField: 'isActive',
      text: 'Publish',
      formatter: ActiveColumnSwitch
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
  // search for category
  const handleSearch = e => {
    const value = e.target.value;
    setPage(1);
    setSearch(value);
    updateData(value);
  };

  return (
    <Card>
      <CardHeader title="Category List">
        <CardHeaderToolbar>
          {/* search for category */}
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
                placeholder="Search category by name...."
                style={{ width: 250 + 'px', marginTop: 10 + 'px', borderLeft: 'none' }}
              />
            </div>
          </div>
          <AddButton to="/categories/add" value="Create Category" />
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
          data={categoryList}
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
}
