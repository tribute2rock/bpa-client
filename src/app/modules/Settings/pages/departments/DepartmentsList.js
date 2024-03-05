import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import BootstrapTable from 'react-bootstrap-table-next';
import { AddButton, DeleteButton, EditButton } from '../../../../components/Buttons';
import SearchBox from '../../../../components/searchBox';
import { getDepartments, deleteDepartment } from './api/departments';
import A from '../../../../../config/url';
import { formatDate } from '../../../../../util';

export function DepartmentsList() {
  const [departmentsList, setDepartmentsList] = useState([]);

  const updateData = () => {
    getDepartments((err, data) => {
      if (err) {
        alert('Error!');
      } else {
        setDepartmentsList(data);
      }
    });
  };

  useEffect(() => {
    updateData();
  }, []);

  const ActionsColumnFormatter = (row, rowIndex) => {
    const Delete = () => {
      if (window.confirm('Are you sure you want to delete?')) {
        deleteDepartment(rowIndex.id, (err, data) => {
          if (err) return;
          if (data) {
            updateData();
          } else {
          }
        });
      }
    };
    return (
      <>
        <EditButton to={`/departments/edit?id=${A.getHash(rowIndex.id)}`} />
        <DeleteButton handleClick={Delete} />
      </>
    );
  };

  const columns = [
    {
      dataField: 'id',
      text: 'S.N.',
      formatter: (row, data, index) => {
        return index + 1;
      }
    },
    {
      dataField: 'name',
      text: 'Department'
    },
    {
      dataField: 'description',
      text: 'Description'
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

  return (
    <Card>
      <CardHeader title="Departments List">
        <CardHeaderToolbar>
          <SearchBox searchInput="" />
          <AddButton to="/departments/add" value="Create Department" />
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
          data={departmentsList}
          columns={columns}
        />
      </CardBody>
    </Card>
  );
}
