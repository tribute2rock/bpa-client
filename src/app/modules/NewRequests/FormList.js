import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';
import WorkflowFilterPanel from '../Workflow/pages/workflow/WorkflowFilterPanel';
import SearchBox from '../../components/searchBox';
import A from '../../../config/url';
import query from 'querystring';
import metaRoutes from '../../../config/meta_routes';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getFormsByCatId } from './api/newrequest';

const FormList = props => {
  const [formsList, setFormsList] = useState([]);
  const qs = query.parse(props.location.search);
  const id = A.getId(qs['?i']);

  useEffect(() => {
    getFormsByCatId(id, (err, data) => {
      if (err) toast.error('Error!');
      else {
        setFormsList(data.data.formdata);
      }
    });
  }, [id]);

  return (
    <Card>
      <WorkflowFilterPanel />
      <CardHeader title="Form Lists">
        <CardHeaderToolbar>{/* <SearchBox searchInput="" /> */}</CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="content-section">
          <div className="row">
            {formsList &&
              formsList.map((item, index) =>
                item.isActive && id == item.categoryId ? (
                  <div className="col-md-2" key={index}>
                    <div className="each-content text-center rounded mb-8 text-secondary">
                      <Link
                        to={{
                          pathname: metaRoutes.form,
                          search: '?i=' + A.getHash(item.id),
                          state: { fromHome: '?i=' + A.getHash(item.id) }
                        }}
                        className="content-item"
                      >
                        <h5>{item.name}</h5>
                      </Link>
                    </div>
                  </div>
                ) : null
              )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FormList;
