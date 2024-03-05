import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import BootstrapTable from 'react-bootstrap-table-next';
import { AddButton, DeleteButton, EditButton } from '../../../../components/Buttons';
import SearchBox from '../../../../components/searchBox';
import { getPrintTemplate, deletePrintTemplate, updateStatus } from './api/printTemplate';
import A from '../../../../../config/url';
import { Switch } from '@material-ui/core';
import { formatDate, getPageParams, handleIndex } from '../../../../../util';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { pageSizes } from '../../../../../values/values';
import PaginationPage from '../../../../components/pagination';

export function PrintTemplateList() {
  const [printTemplateList, setPrintTemplateList] = useState([]);
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  //  search
  const [search, setSearch] = useState('');
  useEffect(() => {
    updateData();
  }, [pageSize, page, offset]); //eslint-disable-line

  const updateData = value => {
    let params = getPageParams(page, pageSize);
    if (search && search.trim() != '') {
      params['search'] = search;
    }
    getPrintTemplate(params, (err, data) => {
      if (err) {
        toast.error('Error while fetching printTemplate !!');
      } else {
        setTotalItems(data.data.totalItems);
        setTotalPages(data.data.totalPages);
        setOffset(data.data.offset);
        setPrintTemplateList(data.data.pageData);
      }
    });
  };

  const ActionsColumnFormatter = (row, rowIndex) => {
    const Delete = () => {
      if (window.confirm('Are you sure you want to delete?')) {
        deletePrintTemplate(rowIndex.id, (err, data) => {
          if (err) return;
          if (data) {
            window.location.reload();
          } else {
            // window.alert(data.message);
          }
        });
      }
    };

    return (
      <>
        <EditButton to={`/print-template/edit?id=${A.getHash(rowIndex.id)}`} />
        <DeleteButton handleClick={Delete} />
      </>
    );
  };

  const handleChange = e => {
    const value = e.target.value === 'true';
    const isActive = !value;
    const id = Number(e.target.name.split('switch-')[1]);
    let message = 'The template will be inactive and will be hidden from customers.';
    let color = 'red';
    if (e.target.checked) {
      message = 'The template will be active and will be shown from customers.';
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
            toast.error(err.response.data.message ?? 'Failed to update template status.');
          } else {
            toast.success(data.message ?? 'Template updated successfully.');
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
      }
    },
    {
      dataField: 'name',
      text: 'Template Name'
    },
    {
      dataField: 'output',
      text: 'Document Type'
    },
    {
      dataField: 'customerAccess',
      text: 'Accessible',
      formatter: row => {
        if (row == true) {
          return <span className="badge badge-success">Yes</span>;
        } else {
          return <span className="badge badge-secondary">No</span>;
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
      }
    }
  ];

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
    setPage(1);
    setSearch(value);
    updateData(value);
  };
  return (
    <Card>
      <CardHeader title="Template List">
        <CardHeaderToolbar>
          {/* <SearchBox searchInput="" /> */}
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
                placeholder="Search template by name...."
                style={{ width: 250 + 'px', marginTop: 10 + 'px', borderLeft: 'none' }}
              />
            </div>
          </div>
          <AddButton to="/print-template/add" value="Create Template" />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BootstrapTable
          wrapperClasses="table-responsive"
          bordered={false}
          classes="table table-head-custom table-vertical-center overflow-hidden"
          bootstrap4
          remote
          keyField="id"
          data={printTemplateList}
          columns={columns}
        />
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
