import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import BootstrapTable from 'react-bootstrap-table-next';
import { AddButton, DeleteButton, EditButton } from '../../../../components/Buttons';
import KTLayoutQuickPanel from '../../../../../_metronic/_assets/js/layout/extended/quick-panel';
import { KTUtil } from '../../../../../_metronic/_assets/js/components/util';
import WorkflowFilterPanel from './WorkflowFilterPanel';
import { countActiveWorkflow, deleteWorkflow, getWorkflow } from './api';
import { toast } from 'react-toastify';
import { getPageParams } from '../../../../../util';
import PaginationPage from '../../../../components/pagination';
import Swal from 'sweetalert2';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;

const WorkflowList = () => {
  const [workflowList, setWorkflowList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  const ActionsColumnFormatter = (id, rowIndex) => {
    return (
      <>
        <EditButton title="Edit Workflow" to={`/workflow/edit?id=${rowIndex.id}`} />
        <DeleteButton
          handleClick={() => {
            handleDelete(rowIndex.id);
          }}
        />
      </>
    );
  };
  useEffect(() => {
    getData();
    KTUtil.ready(function() {
      KTLayoutQuickPanel.init('kt_quick_panel');
    });
  }, [search, pageSize, page, offset]);

  const handleDelete = async id => {
    const confirmValue = await Swal.fire({
      title: '',
      text: 'Are you sure you want to permanently delete this workflow?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red'
    });
    if (confirmValue.value) {
      countActiveWorkflow(id, (err, data) => {
        if (!err) {
          if (data.data) {
            toast.info('This workflow can not be deleted.');
          } else {
            deleteWorkflow(id, (err, data) => {
              if (!err) {
                toast.info(data.message);
              } else {
                toast.error('Failed to delete workflow');
              }
              getData();
            });
          }
        } else {
          toast.error('Error in deletion');
        }
      });
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    // getData();
  };

  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
    setPage(1);
    //getData();
  };

  const getData = value => {
    const params = getPageParams(page, pageSize);
    if (search && search.trim() != '') {
      params['search'] = search;
    }
    getWorkflow(params, (err, data) => {
      if (err) {
        toast.error('Server is not responding!!');
      } else {
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
        setOffset(data.offset);
        setWorkflowList(data.pageData);
      }
    });
  };

  const indexNumber = (row, data, index) => {
    return offset + index + 1;
  };

  const handleSearch = e => {
    const value = e.target.value;
    setPage(1);
    setSearch(value);
    getData(value);
  };

  const columns = [
    {
      dataField: 'id',
      text: 'S.N.',
      formatter: indexNumber
    },
    {
      dataField: 'name',
      text: 'Workflow Title'
    },
    {
      dataField: 'description',
      text: 'Description'
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
      CSVExport: false
    }
  ];

  return (
    <Card>
      <WorkflowFilterPanel />
      <CardHeader title="Workflow List">
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
                placeholder="Search workflow by name...."
                style={{ width: 250 + 'px', marginTop: 10 + 'px', borderLeft: 'none' }}
              />
            </div>
          </div>
          <AddButton to="/workflow/new" value="Create" />
          {/*<FilterButton id="kt_quick_panel_toggle" />*/}
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
          data={workflowList || []}
          columns={columns}
        >
          {props => (
            <>
              <ExportCSVButton {...props.csvProps}>Export CSV</ExportCSVButton>
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

export default WorkflowList;
