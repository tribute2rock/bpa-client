import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import { Form, Dropdown, Col, Button } from 'react-bootstrap';
import { Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import { Switch } from '@material-ui/core';
import { FormsFilterPanel } from './FormsFilterPanel';
import Swal from 'sweetalert2';
import KTLayoutQuickPanel from '../../../../../_metronic/_assets/js/layout/extended/quick-panel';
import { KTUtil } from '../../../../../_metronic/_assets/js/components/util';
import { DeleteButton, EditButton, CloneButton, CopyLinkButton } from '../../../../components/Buttons';
import { countActiveForm, deleteForm, getForms, updateFormStatus, cloneForm, updateTest } from './api/form';
import A from '../../../../../config/url';
import { toast } from 'react-toastify';
import { getPageParams, handleIndex, copyTextToClipboard } from '../../../../../util';
import PaginationPage from '../../../../components/pagination';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
const { ExportCSVButton } = CSVExport;

export const FormsList = props => {
  const [formList, setFormList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [flowCount,setTotalFlowCount]=useState(0)
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [search, setSearch] = useState('');
  const [copyValue, setCopyValue] = useState('');

  const ActionsColumnFormatter = (row, rowIndex) => {
    return (
      <>
        <EditButton to={`/forms/edit?type=${rowIndex.type}&id=${A.getHash(rowIndex.id)}`} />
        <CloneButton
          handleClone={() => {
            handleClone(rowIndex.id);
          }}
        />
        <DeleteButton
          handleClick={() => {
            handleDelete(rowIndex.id);
          }}
        />
      </>
    );
  };
  const [copyLinkModal, setCopyLinkModal] = useState(false);

  const toggleCopyLink = params => {
    setCopyLinkModal(!copyLinkModal);
  };

  const handleSearch = e => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);
    updateData(value);
  };

  const handleClone = async id => {
    const confirmValue = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to clone this form',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'blue'
    });
    if (confirmValue.value) {
      cloneForm(id, (err, data) => {
        if (!err) {
          toast.info(data.message);
          props.history.push(`/forms/edit?type=${data.data.type}&id=${A.getHash(data.data.id)}`);
        } else {
          toast.error('Failed to clone form');
        }
      });
    }
  };

  const handleDelete = async id => {
    const confirmValue = await Swal.fire({
      title: '',
      text: 'Are you sure you want to permanently delete this form?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red'
    });
    if (confirmValue.value) {
      countActiveForm(id, (err, data) => {
        if (!err) {
          if (data.data) {
            toast.info('This form can not be deleted.');
          } else {
            deleteForm(id, (err, data) => {
              if (!err) {
                toast.info(data.message);
              } else {
                toast.error('Failed to delete form');
              }
              updateData();
            });
          }
        } else {
          toast.error('Error in deletion');
        }
      });
    }
  };

  const updateData = value => {
    let params = getPageParams(page, pageSize);
    if (search && search.trim() != '') {
      params['search'] = search;
      
    }
    getForms(params, (err, data) => {
      // TODO: Display message which is given by backend.
      if (err) {
        toast.error('Error retrieving form data!');
      } else {
        
        setTotalFlowCount(data.finalFlowCount);
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

  useLayoutEffect(() => {
    KTUtil.ready(function() {
      KTLayoutQuickPanel.init('kt_quick_panel');
    });
  });

  const handlePageChange = (event, value) => {
    setPage(value);
    // updateData();
  };

  const handlePageSizeChange = e => {
    setPageSize(Number(e.target.value));
    setPage(1);
    // updateData();
  };

  const handleChange = e => {
    const value = e.target.value === 'true';
    const isActive = !value;
    const id = Number(e.target.name.split('switch-')[1]);
    Swal.fire({
      title: 'Are you sure?',
      text: `The Form will be ${isActive == true ? 'active' : 'inactive'} from now on.`,
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: 'red'
    }).then(result => {
      if (result.value) {
        const data = { id, isActive };
        updateFormStatus(data, () => {
          updateData();
        });
      }
    });
  };

  const handleCopyLink = data => {
    let dummyText = data;
    dummyText = `${process.env.REACT_APP_COPY_LINK}${A.getHashLink(data.id)}`;
    updateTest(data, () => {
      setCopyValue(dummyText);
      toggleCopyLink();
      copyTextToClipboard(dummyText);
    });
  };

  const ActiveColumnSwitch = (cell, row) => {
    return (
      <>
        <Switch
          checked={row.isActive}
          onChange={handleChange}
          color="primary"
          name={`switch-${row.id}`}
          value={row.isActive}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        {!row.isActive ? (
          <CopyLinkButton
            handleClick={() => {
              handleCopyLink(row);
            }}
          />
        ) : null}
      </>
    );
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
      text: 'Form Name'
    },
    {
      dataField: 'flowCount',
      text: 'Flow Count'
    },
    {
      dataField: 'category.name',
      text: 'Category'
    },
    {
      dataField: 'workflow.name',
      text: 'Workflow Name'
    },
    {
      dataField: 'type',
      text: 'Type'
    },
    {
      dataField: 'isActive',
      text: 'Publish',
      formatter: ActiveColumnSwitch
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

  return (
    <Card>
      <Modal size="xl" isOpen={copyLinkModal} toggle={toggleCopyLink}>
        <ModalBody>
          <Form.Group>
            <Form.Control type="text" name="link" value={copyValue} disabled />
          </Form.Group>
        </ModalBody>
      </Modal>
      <FormsFilterPanel />
      <CardHeader title="Forms List">
        <CardHeaderToolbar>
          {/*<SearchBox searchInput="" />*/}
          <div className="col-auto">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text bg-white" style={{ marginTop: 10 + 'px', borderRight: 'none' }}>
                  <i class="fa fa-search"></i>
                </div>
              </div>
              <input
                type="text"
                className="form-control d-inline-block"
                id="inlineFormInputGroup"
                value={search}
                onChange={handleSearch}
                placeholder="Search form by name...."
                style={{ width: 250 + 'px', marginTop: 10 + 'px', borderLeft: 'none' }}
              />
            </div>
          </div>

          <Col>
            <Link to="/sub-form">
              <Button value="Sub Form" className="btn btn-light-primary btn-sm font-weight-bolder">
                Sub Form
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
                  <Link to="/forms/new?type=dynamic" className="navi-link">
                    <span className="navi-icon">
                      <i className="fas fa-clone" />
                    </span>
                    <span className="navi-text">Dynamic</span>
                  </Link>
                </li>
                <li className="navi-item">
                  <Link to="/forms/new?type=html" className="navi-link">
                    <span className="navi-icon">
                      <i className="fas fa-code" />
                    </span>
                    <span className="navi-text">HTML</span>
                  </Link>
                </li>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
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
          exportCSV={{ onlyExportFiltered: true, exportAll: false }}
          data={formList}
          columns={columns}
          >
          {props => (
            <>
             <div className="d-flex justify-content-between">
              <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>
              <div className=" form-count ml-auto h6 font-weight-bold shadow p-6 mb-5 bg-secondary rounded  text-dark "> {'Flow Count '} {flowCount} </div>
              </div>
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
