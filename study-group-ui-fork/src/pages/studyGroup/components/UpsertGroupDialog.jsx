/* eslint-disable no-unused-vars */
import {
  DialogContent,
  FormControl,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select
} from '@mui/material';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormLabel from 'src/components/FormLabel';
import Button from 'src/components/Button';
import TextField from 'src/components/TextField';
import { useDispatch } from 'react-redux';
import { createGroup, updateGroupInfo, getGroupLists, getGroupInfo } from '../reducer';

const validationSchema = Yup.object({
  name: Yup.string().required('Require information.')
});

const classes = [
  {
    id: 6,
    name: 'Lớp 6'
  },
  {
    id: 7,
    name: 'Lớp 7'
  },
  {
    id: 8,
    name: 'Lớp 8'
  },
  {
    id: 9,
    name: 'Lớp 9'
  },
  {
    id: 10,
    name: 'Lớp 10'
  },
  {
    id: 11,
    name: 'Lớp 11'
  },
  {
    id: 12,
    name: 'Lớp 12'
  }
];

const UpsertGroupDialog = (props) => {
  const { onClose, open, subjectLists, groupInfo } = props;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: groupInfo || {
      name: '',
      classId: 0,
      subjectIds: []
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (groupInfo) {
        const transformSbjIds = values.subjectIds.map((id) => parseInt(id));
        const response = await dispatch(
          updateGroupInfo({ ...values, subjectIds: transformSbjIds })
        );
        if (response.type === updateGroupInfo.fulfilled.type) {
          formik.resetForm();
          dispatch(getGroupInfo(groupInfo?.id));
          onClose();
        }
      } else {
        const transformSbjIds = values.subjectIds.map((id) => parseInt(id));
        const response = await dispatch(createGroup({ ...values, subjectIds: transformSbjIds }));
        if (response.type === createGroup.fulfilled.type) {
          dispatch(getGroupLists());
          formik.resetForm();
          onClose();
        }
      }
    }
  });

  return (
    <Dialog
      fullWidth
      sx={{ '& .MuiPaper-root': { borderRadius: '10px' } }}
      onClose={onClose}
      open={open}
    >
      <DialogContent>
        <Box
          component={'form'}
          onSubmit={formik.handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
          mt={'24px'}
          rowGap={'32px'}
        >
          <FormControl fullWidth>
            <FormLabel>Tên nhóm</FormLabel>
            <TextField
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Lớp</FormLabel>
            <Select value={formik.values.classId} name="classId" onChange={formik.handleChange}>
              {classes.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Môn học</FormLabel>
            <FormGroup row>
              {subjectLists.map((sbj) => (
                <FormControlLabel
                  key={sbj.id}
                  name="subjectIds"
                  control={
                    <Checkbox
                      defaultChecked={groupInfo?.subjectIds.includes(sbj.id)}
                      value={parseInt(sbj.id)}
                      onChange={formik.handleChange}
                    />
                  }
                  label={sbj.name}
                  labelPlacement="end"
                />
              ))}
            </FormGroup>
          </FormControl>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}
          >
            <Button color="secondary" variant="contained" onClick={onClose}>
              Huỷ
            </Button>
            <Button color="primary" type="submit" variant="contained">
              {groupInfo ? 'Cập nhật' : 'Tạo nhóm'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

UpsertGroupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  subjectLists: PropTypes.arrayOf(PropTypes.object),
  groupInfo: PropTypes.object
};

UpsertGroupDialog.defaultProps = {
  open: false,
  subjectLists: [],
  groupInfo: null
};

export default UpsertGroupDialog;
