import { Box, CircularProgress, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import NotFound from 'src/common/NotFound';
import DOCUMENT_API from 'src/services/api/students/DocumentAPI';
import DocumentItem from '../../modules/students/pages/documents/DocumentItem';
import FilterDocument from 'src/modules/students/pages/documents/FilterDocument';
import CreateDocument from 'src/modules/students/pages/documents/Modal/CreateDocument';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StudentDocuments = ({ isLead }) => {
  const [documents, setDocuments] = useState([]);
  const createDocumentRef = useRef();
  const params = useParams();

  const { isLoading, refetch, data } = useQuery(['documents-list'], DOCUMENT_API.GET_LIST, {
    enabled: false,
    onSuccess: (values) => {
      const convertData = values.map((item, index) => {
        const indexLink = item.httpLink.lastIndexOf('/');

        return {
          ...item,
          name: item.httpLink.slice(indexLink + 1)
        };
      });

      const result = convertData.filter((item) => item.groupId === Number(params.groupId));

      // console.log(result);
      setDocuments(result);
    }
  });

  useEffect(() => {
    refetch();
  }, [params]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const onRefreshAfterDeleted = (id) => {
    const result = documents.filter((item) => item.id !== id);

    setDocuments(result);
  };

  const onSearchDocument = (event) => {
    const keySearch = event.target.value;
    const convertData = data.map((item, index) => {
      const indexLink = item.httpLink.lastIndexOf('/');

      return {
        ...item,
        name: item.httpLink.slice(indexLink + 1),

        isAcceptDocument: false
      };
    });

    const result = convertData.filter(
      (item) =>
        item.name.toLowerCase().trim().includes(keySearch.toLowerCase().trim()) &&
        item.groupId === Number(params.groupId)
    );

    setDocuments(result);
  };
  const onSelectDocument = (value) => {
    const convertData = data.map((item, index) => {
      return {
        ...item,
        name: 'Tài liệu' + ' ' + (index + 1),
        isAcceptDocument: false
      };
    });
    const result = convertData.filter((item) => item.groupId === value);
    setDocuments(result);
  };

  const onRefreshAfterAccept = () => {
    refetch();
  };

  return (
    <Grid item xs={12}>
      <CreateDocument ref={createDocumentRef} refreshPage={() => refetch()} />
      <FilterDocument
        onCreateModal={() => createDocumentRef.current.openModal()}
        onSearchDocument={onSearchDocument}
        onSelectDocument={onSelectDocument}
      />
      {
        <Box sx={{ minHeight: '25vh' }}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            {documents.length > 0 ? (
              <Row gutter={[10, 10]}>
                {documents.map((document, index) => {
                  return (
                    (isLead === true || document.approved === true) && 
                     (
                      <DocumentItem
                        key={index}
                        documentItem={document}
                        refreshAfterDelete={onRefreshAfterDeleted}
                        onRefreshAfterAccept={onRefreshAfterAccept}
                        isLead={isLead}
                      />
                    )
                  );
                })}
              </Row>
            ) : (
              <NotFound />
            )}
          </Col>
        </Row>
      </Box>
      }
      {/* <Box sx={{ minHeight: '25vh' }}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            {documents.length > 0 ? (
              <Row gutter={[10, 10]}>
                {documents.map((document, index) => {
                  return (
                    {isLead === true && document.approved === false} && <DocumentItem
                    key={index}
                    documentItem={document}
                    refreshAfterDelete={onRefreshAfterDeleted}
                    onRefreshAfterAccept={onRefreshAfterAccept}
                    isLead={isLead}
                  />
                  )
                })}
              </Row>
            ) : (
              <NotFound />
            )}
          </Col>
        </Row>
      </Box> */}
    </Grid>
  );
};

export default StudentDocuments;
