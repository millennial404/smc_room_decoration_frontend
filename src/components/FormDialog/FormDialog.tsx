import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { addVolume } from "../../api";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { setPopup } from "../../store/popupSlice";

export const FormDialog = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.popup.popup);
  const currentRoom = useSelector((state) => state.currentRoom.currentRoom);

  const [finishing, setFinishing] = React.useState("");
  const [type, setType] = React.useState("");
  const [volume, setVolume] = React.useState("");
  const [volumePercent, setVolumePercent] = React.useState("");
  const [constructive, setСonstructive] = React.useState("");

  const volumeData = constructive
    ? {
        [constructive]: [
          {
            ...(type && {
              [constructive.split("_")[0] + "_type"]: Number(type),
            }),
            ...(volume && { [finishing + "_volume"]: parseFloat(volume) }),
            ...(volumePercent && {
              [finishing + "_completion_percentage"]: parseFloat(volumePercent),
            }),
          },
        ],
      }
    : {};
  console.log(volumeData);
  console.log(currentRoom.planning_type_floor);
  const handleClose = () => {
    setFinishing("");
    setType("");
    setVolume("");
    setVolumePercent("");
    setСonstructive("");
    dispatch(setPopup(false));
  };

  const handleChangeFinishing = (event: SelectChangeEvent) => {
    setFinishing(event.target.value as string);
  };

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleChangeVolumeM2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(event.target.value);
  };
  const handleChangeVolumePercent = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVolumePercent(event.target.value);
  };
  const handleChangeСonstructive = (event: SelectChangeEvent) => {
    setСonstructive(event.target.value);
    console.log(event.target.value);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Внесение данных по помещению:</DialogTitle>

        <DialogContent>
          <DialogContentText mb={3} sx={{ fontWeight: 600 }}>
            {currentRoom?.name}
          </DialogContentText>
          <DialogContentText mb={3}>
            Форма для ввода данных по выполненому объёму
          </DialogContentText>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl sx={{ marginY: 3 }}>
              <InputLabel id="simple-select-label">Конструктив</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select-layer"
                value={constructive}
                label="Конструктив"
                onChange={handleChangeСonstructive}
              >
                <MenuItem value={"floor_volumes"}>Полы</MenuItem>
                <MenuItem value={"ceiling_volumes"}>Потолок</MenuItem>
                <MenuItem value={"wall_volumes"}>Стены</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="simple-select-label">Слой</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select-layer"
                value={finishing}
                label="Слой"
                onChange={handleChangeFinishing}
              >
                <MenuItem value={"rough"}>Черновая</MenuItem>
                <MenuItem value={"clean"}>Чистовая</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ marginY: 3 }}>
              <InputLabel id="simple-select-label">Тип отделки</InputLabel>
              <Select
                labelId="simple-select-label"
                id="simple-select-type"
                value={type}
                label="Тип отделки"
                onChange={handleChangeType}
              >
                {constructive === "floor_volumes" &&
                  currentRoom.planning_type_floor.map((el: any) => (
                    <MenuItem key={el.floor_type.id} value={el.floor_type.id}>
                      {el.floor_type.type_code}
                    </MenuItem>
                  ))}
                {constructive === "ceiling_volumes" &&
                  currentRoom.planning_type_ceiling.map((el: any) => (
                    <MenuItem
                      key={el.ceiling_type.id}
                      value={el.ceiling_type.id}
                    >
                      {el.ceiling_type.type_code}
                    </MenuItem>
                  ))}
                {constructive === "wall_volumes" &&
                  currentRoom.planning_type_wall.map((el: any) => (
                    <MenuItem key={el.wall_type.id} value={el.wall_type.id}>
                      {el.wall_type.type_code}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                error={Number(volume) < 0}
                helperText={
                  Number(volume) < 0 ? "Значение не может быть меньше 0" : ""
                }
                disabled={volumePercent !== ""}
                id="outlined-number"
                value={volume}
                label="Объём в м2"
                type="number"
                onChange={handleChangeVolumeM2}
              />
            </FormControl>
            <FormControl sx={{ marginY: 3 }}>
              <TextField
                error={Number(volumePercent) < 0}
                helperText={
                  Number(volumePercent) < 0
                    ? "Значение не может быть меньше 0"
                    : ""
                }
                disabled={volume !== ""}
                id="outlined-number"
                value={volumePercent}
                label="Объём в %"
                type="number"
                onChange={handleChangeVolumePercent}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button
            disabled={
              constructive === "" ||
              finishing === "" ||
              type === "" ||
              ((volume === "" || Number(volume) < 0) &&
                (volumePercent === "" || Number(volumePercent) < 0))
            }
            type="submit"
            onClick={() => {
              addVolume(volumeData, currentRoom.id);
              console.log('Кнопка "Отправить" нажата');
              handleClose();
            }}
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
