import { AddOutlined } from '@mui/icons-material';
import { Button, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import CustomTitle from 'src/components/CustomTitle';
import { Box, debounce } from '@mui/material';
import DOCUMENT_API from 'src/services/api/students/DocumentAPI';
import { useQuery } from '@tanstack/react-query';

const FilterDocument = ({ onCreateModal, onSearchDocument, onSelectDocument }) => {
  const [groups, setGroups] = useState([]);

  const { refetch } = useQuery(['groups-members'], DOCUMENT_API.GET_GROUP_MEMBER, {
    onSuccess: (values) => {
      const convertGroupSelect = values.map((item) => {
        return {
          label: item.name,
          value: item.id
        };
      });

      setGroups(convertGroupSelect);
    }
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box display={'flex'} flexDirection={'column'} marginBottom={'1rem '} width={'100%'}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <CustomTitle mb={3}>Tài liệu</CustomTitle>
        <Button
          type="primary"
          size="large"
          prefix={<AddOutlined />}
          onClick={() => onCreateModal()}
        >
          Chia sẻ tài liệu
        </Button>
      </div>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '1rem' }}>
        <Input
          placeholder="Nhập tên tài liệu mà bạn muốn tìm"
          style={{ width: '18%' }}
          onChange={debounce(onSearchDocument, 1000)}
        />
        {/* <Select
          placeholder="Chọn nhóm mà bạn muốn tìm"
          style={{ width: '18%' }}
          options={groups}
          onChange={onSelectDocument}
        /> */}
      </Box>
    </Box>
  );
};

export default FilterDocument;
