import { Box, Paper } from "@mui/material";
import { FormDialog } from "../FormDialog";

export const Header = () => {
  return (
    <Box
      elevation={3}
      component={Paper}
      sx={{
        width: 1200,
        height: 100,
        marginX: "auto",
        marginY: 5,
        display: "flex",
        alignItems: "center",
      }}
    >
      <FormDialog />
    </Box>
  );
};
