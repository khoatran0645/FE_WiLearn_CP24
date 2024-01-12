import { Box, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import CardGroup from "src/components/CardGroup";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/Button";
import { getClassLists, getSubjectLists, requestJoinGroup } from "../reducer";
import SearchComponent from "src/components/SearchComponent";
import { searchGroups } from "../reducer";
import { Select } from "antd";
import client from "src/common/client";

const SearchGroupDialog = (props) => {
  const { onClose, open } = props;
  const { searchGroupss, subjectLists, listClass } = useSelector(
    (state) => state.studyGroup
  );

  console.log(subjectLists);
  const { userInfo } = useSelector((state) => state.auth);
  const [newSearch, setNewSearch] = useState([]);
  const [changeSearch, setChangeSearch] = useState("abc");
  const dispatch = useDispatch();
  const [subjectList, setSubjectList] = useState([]);
  const [classLists, setClassList] = useState([]);
  const onRequestJoinGroup = (groupId) => {
    dispatch(requestJoinGroup({ groupId, studentId: userInfo?.id }));
    onClose();
  };
  const onNewSearch = async (keyword) => {
    const response = await dispatch(searchGroups(keyword));

    if (response.type === searchGroups.fulfilled.type) {
      // setNewSearch(searchGroups);
      setNewSearch([]);
      setChangeSearch("abc");
    }
  };
  useEffect(() => {
    dispatch(getSubjectLists());
    dispatch(getClassLists());
    const convert = subjectLists?.map((sub) => {
      return {
        label: sub.name,
        value: sub.name,
      };
    });
    const convertClass = listClass?.map((sub) => {
      return {
        label: sub.name,
        value: sub.name,
      };
    });
    console.log(listClass);
    setSubjectList(convert);
    setClassList(convertClass);
  }, []);

  const handleSelectChange = async (value) => {
    try {
      const response = await client.get(
        `api/Groups/Search/Subject?subject=${value}&newGroup=false`
      );

      const data = response.data;

      setNewSearch(response);
      setChangeSearch("");
    } catch (error) {
      if (error.response.status === 404) {
        setNewSearch([]);
        setChangeSearch("");
      }
    }
  };
  const handleClassChange = async (value) => {
    try {
      const response = await client.get(
        `api/Groups/Search/Class?Class=${value}&newGroup=false`
      );

      const data = response.data;

      setNewSearch(response);
      setChangeSearch("");
    } catch (error) {
      if (error.response.status === 404) {
        setNewSearch([]);
        setChangeSearch("");
      }
    }
  };
  console.log(newSearch);
  return (
    <Dialog
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: "10px" } }}
      onClose={onClose}
      open={open}
    >
      <DialogContent>
        <SearchComponent placeholder="Tìm nhóm" onSearch={onNewSearch} />
        <Box marginBottom={2}>
          <Select
            id="selectSubject"
            style={{ width: 160, marginRight: 20 }}
            onChange={handleSelectChange}
            options={subjectList}
            placeholder="Tìm theo môn"
            dropdownStyle={{ zIndex: 2000 }}
          />
          <Select
            id="selectClass"
            placeholder="Tìm theo lớp"
            style={{ width: 160 }}
            onChange={handleClassChange}
            options={classLists}
            dropdownStyle={{ zIndex: 2000 }}
          />
        </Box>

        {newSearch.length == 0 && changeSearch == "abc" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {searchGroupss.map((gr) => (
              <CardGroup
                key={gr.id}
                data={gr}
                actions={[
                  <Button
                    variant="contained"
                    onClick={() => onRequestJoinGroup(gr.id)}
                    key={0}
                  >
                    Xin vào
                  </Button>,
                ]}
              />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {newSearch?.map((gr) => (
              <CardGroup
                key={gr.id}
                data={gr}
                actions={[
                  <Button
                    variant="contained"
                    onClick={() => onRequestJoinGroup(gr.id)}
                    key={0}
                  >
                    Xin vào
                  </Button>,
                ]}
              />
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

SearchGroupDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

SearchGroupDialog.defaultProps = {
  open: false,
};

export default SearchGroupDialog;
