import Swal from 'sweetalert2';
import moment from 'moment';
import React from 'react';
import { toast } from 'react-toastify';
import clipboard from 'clipboard-copy';
const copyTextToClipboard = text => {
  clipboard(text).then(
    function() {
      toast.success('Copied to clipboard.');
    },
    function(err) {
      toast.warn('Cannot Copy');
    }
  );
};

const getData = (id, list) => {
  const item = list.filter(data => (data.id === Number(id) ? 1 : 0))[0];
  return item ? item : '';
};

const getObject = (id, list) => {
  const data = list.filter(role => {
    return id === role.roleId;
  })[0];
  return data;
};

const deleteFunction = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!'
  }).then(result => {
    if (result.value) {
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
};

/**
 * Gets raw date as data and returns formatted date.
 * @param row
 * @param data
 * @returns {string}
 */
const formatDate = (row, data) => {
  return moment(data.createdAt).format('MMMM, Do YYYY');
};

const requestFormatDate = (row, data) => {
  return moment(data.requestedDate).format('MMMM, Do YYYY');
};

const actionFormatDate = (row, data) => {
  return moment(data.actionDate).format('MMM DD h:mm A');
};

const bibiniFormatDate = (row, data) => {
  return data.voidDate ? moment(data.voidDate).format('MMM DD h:mm A') : '';
};

const formatSwiftStatus = (row, data) => {
  let dta = '';
  const sts = data.hasOwnProperty('swiftUpload');
  if (!sts) {
    dta = '';
  } else {
    if (
      (data.status == 'Completed' || data.statusId == '4') &&
      (data.request == 'LC Form Centralized' || data.request == 'LC Form Decentralized')
    ) {
      if (data.swiftUpload) {
        return (
          <div>
            <span className="badge badge-primary">TRANSMITTED</span>
          </div>
        );
      } else if (data.swiftClosed) {
        return (
          <div>
            <span className="badge badge-warning">CLOSED</span>
          </div>
        );
      } else {
        return (
          <div>
            <span className="badge badge-danger">NOT TRANSMITTED</span>
          </div>
        );
      }
    }
  }
  return (
    <div>
      <span className="badge badge-danger">{`${dta}`}</span>
    </div>
  );
};
const statusColor = (row, data) => {
  let status;
  if (data.status) {
    status = data.status.toUpperCase();
  } else {
    status = data.statusId;
  }
  switch (status) {
    case 1:
    case 'PENDING':
      return <span className="badge badge-warning">PENDING</span>;
    case 2:
    case 'PROCESSING':
      return (
        <div>
          <span className="badge badge-primary">PROCESSING</span>
        </div>
      );
    case 3:
    case 'RETURNED':
      return (
        <div>
          <span className="badge badge-danger">RETURNED</span>
        </div>
      );
    case 4:
    case 'COMPLETED':
      return (
        <div>
          <span className="badge badge-success">COMPLETED</span>
        </div>
      );
    case 6:
    case 'CLOSED':
      return (
        <div>
          <span className="badge badge-danger">CLOSED</span>
        </div>
      );
    default:
      return '';
    // code block
  }
};

const getPageParams = (page, pageSize) => {
  let params = {};
  if (page) {
    params['page'] = page - 1;
  }
  if (pageSize) {
    params['pageSize'] = pageSize;
  }
  return params;
};

/**
 * Get offset and index of row on that page list and returns new index value
 * @param index
 * @param offset
 * @returns {*}
 */
const handleIndex = (index, offset) => {
  return offset + index + 1;
};

export {
  getData,
  statusColor,
  requestFormatDate,
  actionFormatDate,
  bibiniFormatDate,
  deleteFunction,
  getObject,
  formatDate,
  getPageParams,
  handleIndex,
  formatSwiftStatus,
  copyTextToClipboard
};
