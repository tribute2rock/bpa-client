import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';
import WorkflowFilterPanel from '../Workflow/pages/workflow/WorkflowFilterPanel';
import SearchBox from '../../components/searchBox';
import { getDataByCategoryId } from './api/newrequest';
import { toast } from 'react-toastify';
import A from '../../../config/url';
import query from 'querystring';
import { Link, Redirect } from 'react-router-dom';
import metaRoutes from '../../../config/meta_routes';

const SubNewRequest = props => {
  const [subcategories, setSubCategories] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const qs = query.parse(props.location.search);
  const id = A.getId(qs['?i']);

  useEffect(() => {
    getDataByCategoryId(id, (err, data) => {
      if (err) toast.error('Error!');
      else {
        setSubCategories(data.data.subCategories);
        if (data.data.subCategories.length > 0) {
          setRedirect(true);
        } else {
          setRedirect(true);
        }
      }
    });
  }, [id]);
  return (
    <Card>
      <WorkflowFilterPanel />
      <CardHeader title="Sub Categories">
        <CardHeaderToolbar>
          <SearchBox searchInput="" />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="content-section">
          <div className="row">
            {subcategories &&
              subcategories.map((subCategory, index) =>
                subCategory.isActive ? (
                  <div className="col-md-4" key={index}>
                    <Link to={metaRoutes.formLists + '?i=' + A.getHash(subCategory.id)} className="content-item">
                      <h2>{subCategory.name}</h2>
                    </Link>
                  </div>
                ) : null
              )}
            {redirect ? <Redirect to={metaRoutes.formLists + '?i=' + A.getHash(id)} /> : null}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SubNewRequest;
