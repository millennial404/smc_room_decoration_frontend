import { Box, Button, Paper } from "@mui/material";
import { FormDialog } from "../FormDialog";
import { setPopup } from "../../store/popupSlice";
import { useDispatch } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(setPopup(true));
  };
  return (
    <Box
      elevation={3}
      component={Paper}
      sx={{
        maxWidth: 1200,
        height: 100,
        marginX: "auto",
        marginY: 5,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button variant="outlined" onClick={handleClickOpen} sx={{ margin: 2 }}>
        Внести данные
      </Button>
      <FormDialog />
    </Box>
  );
};
