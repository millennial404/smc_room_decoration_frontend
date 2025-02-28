import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Popover,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Box from "@mui/material/Box";
import styles from "./LoginPage.module.css";
import { fetchLogin } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

function useForm(inputValues: { login: string; password: string }) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}

export const LoginPage = () => {
  const { values, handleChange } = useForm({
    login: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const status = useAppSelector((state) => state.auth.status);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [errorText, setErrorText] = useState("");
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(fetchLogin(values));
  };

  useEffect(() => {
    if (status === "rejected") {
      setErrorText("Неверное имя пользователя или пароль");
      console.log(status);
    }
  }, [status]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "96vh",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 512,
          minHeight: 512,
          flexDirection: "column",
        }}
        elevation={6}
      >
        <Stack spacing={4} maxWidth="300px" width="100%" px={4} pt={10}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              error={!!errorText}
              helperText={errorText}
              onChange={handleChange}
              name="login"
              id="standard-basic"
              label="Логин"
              variant="outlined"
              size="small"
              placeholder={"Введите свой логин"}
              autoComplete="off"
              required
            />
            <FormControl variant="outlined" error={!!errorText}>
              <InputLabel size="small" htmlFor="outlined-adornment-password">
                Пароль
              </InputLabel>
              <OutlinedInput
                placeholder={"Введите пароль"}
                onChange={handleChange}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="password"
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Пароль"
              />
              {errorText && (
                <FormHelperText error id="my-helper-text">
                  {errorText}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography
                sx={{ alignSelf: "center" }}
                variant={"body2"}
                color="text.secondary"
              ></Typography>
            </Stack>
            <Button
              disabled={!("login" in values && "password" in values)}
              variant="contained"
              type={"submit"}
              sx={{ alignSelf: "center", textTransform: "none" }}
              fullWidth={true}
              onClick={handleSubmit}
            >
              Войти
            </Button>
          </form>
        </Stack>

        <Typography
          sx={{ alignSelf: "center", alignItems: "center" }}
          mb={10}
          variant={"body2"}
          color="text.secondary"
        ></Typography>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          sx={{ mt: 2 }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography sx={{ p: 2 }}>
            Обратитесь в отдел технической поддержки
          </Typography>
        </Popover>
      </Paper>
    </Box>
  );
};
