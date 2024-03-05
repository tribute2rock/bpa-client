import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DeleteButton, EditButton, FilterButton, AddButton } from '../../../components/Buttons';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../_metronic/_partials/controls';
import { Dropdown, Col, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { countActiveForm, deleteForm, getSubForms } from '../api/subform';
import { getPageParams } from '../../../../util';
import { pageSizes } from '../../../../values/values';
import A from '../../../../config/url';
import { toast } from 'react-toastify';
import PaginationPage from '../../../components/pagination';
import Swal from 'sweetalert2';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;
export default function SubFormList(props) {
  const [formList, setFormList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const updateData = () => {
    const params = getPageParams(page, pageSize);
    getSubForms(params, (err, data) => {
      if (err) {
        toast.error('Error!!');
      } else {
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
        setOffset(data.offset);
        setFormList(data.pageData);
      }
    });
  };

  useEffect(() => {
    updateData();
  }, [pageSize, page, offset]);

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
        <EditButton to={`/sub-form/edit?type=${rowIndex.type}&id=${A.getHash(rowIndex.id)}`} />
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
      text: 'Are you sure you want to permanently delete this sub-form?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red'
    });
    if (confirmValue.value) {
      deleteForm(id, (err, data) => {
        if (!err) {
          toast.info(data.message);
        } else {
          toast.error('Failed to delete form');
        }
        updateData();
      });
    } else {
      toast.error('Error in deleting data');
    }
  };

  const columns = [
    {
      dataField: 'id',
      text: 'S.N.'
      //   formatter: (row, data, index) => {
      //     return handleIndex(index, offset);
      //   }
    },
    {
      dataField: 'name',
      text: 'Sub-Form Name'
    },
    {
      dataField: 'description',
      text: 'Description'
    },
    {
      dataField: 'type',
      text: 'Type'
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
      <CardHeader title="Sub Form List">
        <CardHeaderToolbar>
          <Col>
            <Link to="/forms">
              <Button value="Form" className="btn btn-light-primary btn-sm font-weight-bolder">
                Form
              </Button>
            </Link>
          </Col>
          <Dropdown className="dropdown-inline" drop="down" alignRight>
            <Dropdown.Toggle
              id="dropdown-toggle-top2"
              variant="transparent"
              className="btn btn-light-primary btn-sm font-weight-bolder dropdown-toggle"
            >
              Create
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
              <ul className="navi navi-hover">
                <li className="navi-item">
                  <Link to="/forms/new?type=dynamic&&formNature=subForm" className="navi-link">
                    <span className="navi-icon">
                      <i className="fas fa-clone" />
                    </span>
                    <span className="navi-text">Dynamic</span>
                  </Link>
                </li>
                <li className="navi-item">
                  <Link to="/forms/new?type=html&&formNature=subForm" className="navi-link">
                    <span className="navi-icon">
                      <i className="fas fa-code" />
                    </span>
                    <span className="navi-text">HTML</span>
                  </Link>
                </li>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
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
          data={formList}
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
          data={formList}
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
}
