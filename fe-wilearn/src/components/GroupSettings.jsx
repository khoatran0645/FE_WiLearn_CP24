import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import {
  TextField,
  Box,
  Autocomplete,
  Chip,
  Avatar,
  Input,
} from "@mui/material";

const defaultAvatar = '/src/assets/default.jpg';

export default function GroupSettings() {
  const [subject, setSubject] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [groupIntro, setGroupIntro] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Grid container marginLeft={10} paddingTop={10}>
      <Grid item xs={6}>
        {/* title */}
        <Typography variant="h5" textAlign={"center"}>
          Update group
        </Typography>

        <FormContainer
          onSuccess={(data) => console.log(data)}
          defaultValues={{
            group_name: "Nhóm 1",
            subject: "React",
          }}
        >
          <Stack spacing={2} paddingTop={2}>
            <TextFieldElement
              name="group_name"
              label="Group name"
              required
              margin="dense"
            />
            <TextField
              label="Introduction"
              fullWidth
              multiline
              rows={4}
              sx={{ marginTop: '15px' }}
              value={groupIntro}
              onChange={(e) => setGroupIntro(e.target.value)}
            />
            <Box sx={{ marginTop: '1rem' }}>
              <Autocomplete
                id="tags-outlined"
                options={["React", "Python", "Java"]}
                value={subject}
                onChange={(event, newValue) => {
                  setSubject(newValue);
                }}
                multiple
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={option} variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Subject"
                    placeholder="Select subject"
                  />
                )}
              />
            </Box>
            <Button type="submit">Submit</Button>
          </Stack>
        </FormContainer>
      </Grid>

      <Grid item xs={5} paddingLeft={2}>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
          <Typography variant="body1" marginBottom={1}>Image group</Typography>
          <Avatar
            style={{ width: '250px', height: '250px', borderRadius: 0 }}
            src={selectedFile ? URL.createObjectURL(selectedFile) : defaultAvatar}
          />
          <Input
            accept="image/*"
            type="file"
            id="avatar-upload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="avatar-upload">
            <Button
              variant="contained"
              component="span"
              style={{
                marginTop: '16px',
                padding: '2px 5px',
                backgroundColor: 'transparent',
                color: '#000',
                border: '1px solid #000',
                fontSize: '12px',
              }}
            >
              Choose File
            </Button>
          </label>
          {selectedFile ? (
            <Typography variant="body2" marginTop="10px">Local avatar selected: {selectedFile.name}</Typography>
          ) : (
            <Typography variant="body2" marginTop="10px">No local avatar is set. Use the upload field to add a local image.</Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
