import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
export default function GroupSettings() {
  const [subject, setSubject] = useState("");
  return (
    <Grid xs={6}>
      {/* title */}
      <Typography variant="h5" textAlign={"left"}>
        Group&apos;s information
      </Typography>

      <FormContainer
        onSuccess={(data) => console.log(data)}
        defaultValues={{
          group_name: "Nhóm 1",
          subject: "React",
        }}
      >
        <Stack spacing={2} maxWidth={"15rem"} paddingTop={2}>
          <TextFieldElement
            name="group_name"
            label="Group name"
            required
            margin="dense"
          />
        </Stack>
        <FormControl sx={{ marginTop: "20px", minWidth: "15rem" }}>
          <InputLabel htmlFor="subject-label">Subject</InputLabel>
          <Select
            fullWidth
            labelId="subject-label"
            id="demo-simple-select"
            value={subject}
            label="Subject"
            onChange={(e) => setSubject(e.target.value)}
          >
            <MenuItem value="React">React</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
          </Select>
          <Button type="submit">Update</Button>
        </FormControl>
      </FormContainer>
    </Grid>
  );
}
