import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import BootstrapTable from 'react-bootstrap-table-next';
import { Col } from 'react-bootstrap';
import { AddButton, DeleteButton, EditButton } from '../../../../components/Buttons';
import A from '../../../../../config/url';
import { formatDate, getPageParams, handleIndex } from '../../../../../util';
import { getManualGroups, deleteGroup, getSingleGroup } from './api/group';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import PaginationPage from '../../../../components/pagination';
import Swal from 'sweetalert2';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;
export function GroupList() {
  const [groupList, setGroupList] = useState([]);
  const [show, setShow] = useState(false);
  const [group, setGroup] = useState({});
  const [userList, setUserList] = useState([]);
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = id => {
    setShow(true);
    getSingleGroup(id, (err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while fetching the data');
      } else {
        setGroup(data);
        setUserList(data.users);
      }
    });
  };

  const updateData = value => {
    const params = getPageParams(page, pageSize);
    if (search && search.trim() != '') {
      params['search'] = search;
    }
    getManualGroups(params, (err, data) => {
      if (err) {
        alert('Error!');
      } else {
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
        setOffset(data.offset);
        setGroupList(data.pageData);
      }
    });
  };

  useEffect(() => {
    updateData();
  }, [search, pageSize, page, offset]);

  const ActionsColumnFormatter = (row, rowIndex) => {
    return (
      <>
        <Button className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3" onClick={() => handleShow(rowIndex.id)}>
          <i className="fas fa-eye text-primary" />
        </Button>
        <EditButton to={`/groups/edit?id=${A.getHash(rowIndex.id)}`} />
        <DeleteButton handleClick={() => handleDelete(rowIndex.id)} />
      </>
    );
  };

  const handleDelete = async id => {
    const confirmValue = await Swal.fire({
      title: '',
      text: 'Are you sure you want to permanently delete this group?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red'
    });

    if (confirmValue.value) {
      deleteGroup(id, (err, data) => {
        if (!err) {
          toast.success(data.message);
        } else {
          toast.error('Failed to delete form');
        }
        updateData();
      });
    }
  };
  // const Increaseid = (row, key, rowIndex) => {
  //   let i = rowIndex + 1;
  //   return i++;
  // };
  const columns = [
    {
      dataField: 'id',
      text: 'S.N.',
      formatter: (row,data,index) => {
        return handleIndex(index,offset);
      }
    },
    {
      dataField: 'name',
      text: 'Group'
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
      },
      csvExport: false
    }
  ];

  const handlePageChange = (event, value) => {
    setPage(value);
    // updateData();
  };

  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
    setPage(1);
    //updateData();
  };

  const handleSearch = e => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);
    updateData(value);
  };
  return (
    <>
      <Card>
        <CardHeader title="Groups List">
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
            <AddButton to="/groups/add" value="Add Group" />
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
            data={groupList}
            columns={columns}
          /> */}
          <ToolkitProvider
            wrapperClasses="table-responsive"
            bordered={false}
            classes="table table-head-custom table-vertical-center overflow-hidden"
            bootstrap4
            remote
            keyField="id"
            data={groupList}
            columns={columns}
            exportCSV={{ onlyExportFiltered: true, exportAll: false }}
          >
            {props => (
              <>
                <ExportCSVButton {...props.csvProps}>Export CSV!</ExportCSVButton>
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

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Group {group.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Description : </strong>
            {group.description}
          </p>
          <h6>User Assigned :</h6>
          <hr />
          <div className="row">
            {userList.map(user => {
              return (
                <div className="col-3 mb-2">
                  <i
                    className="fa fa-user text-primary btn btn-icon btn-light btn-hover-primary btn-sm mt-2"
                    aria-hidden="true"
                  ></i>{' '}
                  {user.name}
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
