import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  PasswordRepeatElement,
  DatePickerElement,
} from "react-hook-form-mui";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import dayjs from "dayjs";

export default function Settings() {
  return (
    <Grid border={0} container direction={"row"}>
      <Grid xs={12}>
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "left" }}>
          Settings
        </Typography>
      </Grid>

      <Grid xs={6}>
        <Typography variant="h5" textAlign={"left"}>
          Change password
        </Typography>
        <FormContainer
          defaultValues={{
            old_password: "",
            new_password: "",
            confirm_password: "",
          }}
          onSuccess={(data) => console.log(data)}
        >
          <Stack spacing={2} maxWidth={500} paddingTop={2}>
            <PasswordElement
              margin={"dense"}
              label={"Current password"}
              required
              name={"old_password"}
            />
            <PasswordElement
              margin={"dense"}
              label={"New password"}
              required
              type="password"
              name={"new_password"}
            />
            <PasswordRepeatElement
              passwordFieldName={"new-password"}
              name={"password_repeat"}
              margin={"dense"}
              label={"Repeat Password"}
              required
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </FormContainer>
      </Grid>

      <Grid xs={6}>
        <Typography variant="h5" textAlign={"left"}>
          Update information
        </Typography>
        <FormContainer
          defaultValues={{
            full_name: "Thuy Linh",
            phone_number: "0123456789",
            birth_date: dayjs(),
          }}
          onSuccess={(data) => console.log(data)}
        >
          <Stack spacing={2} maxWidth={500} paddingTop={2}>
            <TextFieldElement
              name="full_name"
              label="Full name"
              required
              margin="dense"
            />
            <TextFieldElement
              name="phone_number"
              label="Phone number"
              required
              margin="dense"
            />

            <DatePickerElement
              label="Birth date"
              name="birth_date"
              required
            />
            <Button type="submit">Submit</Button>
          </Stack>
        </FormContainer>
      </Grid>
    </Grid>
  );
}
