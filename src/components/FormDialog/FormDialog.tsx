import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export const FormDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [finishing, setFinishing] = React.useState("");
  const [type, setType] = React.useState("");
  const [volume, setVolume] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeFinishing = (event: SelectChangeEvent) => {
    setFinishing(event.target.value as string);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(event.target.value);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ margin: 2 }}>
        Внести данные
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Внесение данных по помещению $</DialogTitle>
        <DialogContent>
          <DialogContentText mb={3}>
            Форма для ввода данных по выполненому объёму
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Слой</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select-layer"
              value={finishing}
              label="Слой"
              onChange={handleChangeFinishing}
            >
              <MenuItem value={"Черновая"}>Черновая</MenuItem>
              <MenuItem value={"Чистовая"}>Чистовая</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginY: 3 }}>
            <InputLabel id="simple-select-label">Тип отделки</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select-type"
              value={type}
              label="Тип отделки"
              onChange={handleChangeType}
            >
              <MenuItem value={"П1"}>П1</MenuItem>
              <MenuItem value={"С2"}>С2</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="outlined-number"
              value={volume}
              label="Объём в м2"
              type="number"
              onChange={handleChangeVolume}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="submit">Отправить</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
