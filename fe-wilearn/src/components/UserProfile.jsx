import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  PasswordElement,
  PasswordRepeatElement,
  DatePickerElement,
} from "react-hook-form-mui";
import dayjs from "dayjs";

export default function UserProfile() {
  return (
    <Grid
      container
      direction={"row"}
      paddingLeft={10}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", textAlign: "start" }}
        >
          Profile
        </Typography>
      </Grid>

      <Grid item xs={2}>
        <Card>
          <Grid
            container
            direction={"column"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
          >
            <Grid item>
              <Avatar sx={{ width: 100, height: 100 }}>TL</Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5">Thuy Linh</Typography>
            </Grid>
          </Grid>

          <CardContent justifyContent="center" p={2}>
            <Typography variant="h6" color="text.secondary">
              Bio
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Thuy Linh is a Junior Web Developer for FPT Software. She&apos;s
              an accomplished programmer and enjoys using her skills to
              contribute to the exciting work of FPT Software.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={3}>
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

      <Grid item xs={3}>
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

            <DatePickerElement label="Birth date" name="birth_date" required />
            <Button type="submit">Submit</Button>
          </Stack>
        </FormContainer>
      </Grid>
    </Grid>
  );
}
