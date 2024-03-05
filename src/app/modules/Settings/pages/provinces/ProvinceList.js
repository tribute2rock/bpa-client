import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../../../_metronic/_partials/controls';
import BootstrapTable from 'react-bootstrap-table-next';
import { KTUtil } from '../../../../../_metronic/_assets/js/components/util';
import KTLayoutQuickPanel from '../../../../../_metronic/_assets/js/layout/extended/quick-panel';
import SearchBox from '../../../../components/searchBox';
import { getProvinces } from './api/provinces';
import { toast } from 'react-toastify';

const columns = [
  {
    dataField: 'id',
    text: 'S.N',
    formatter: (row, data, index) => {
      return index + 1;
    }
  },
  {
    dataField: 'name',
    text: 'Province'
  }
];

const ProvinceList = () => {
  const [provinceList, setProvinceList] = useState([]);
  useEffect(() => {
    getProvinces((err, data) => {
      if (err) {
        toast.error('Error while fetching provinces.');
      } else {
        setProvinceList(data);
      }
    });
  }, []);

  useLayoutEffect(() => {
    KTUtil.ready(function() {
      KTLayoutQuickPanel.init('kt_quick_panel');
    });
  });
  return (
    <Card>
      <CardHeader title="Provinces List">
        <CardHeaderToolbar>
          <SearchBox searchInput="" />
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
          data={provinceList}
          columns={columns}
        />
      </CardBody>
    </Card>
  );
};

export default ProvinceList;
