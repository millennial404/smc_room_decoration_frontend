import React, { useEffect, useState } from "react";
import { getAllRooms } from "../../api";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
} from "@mui/material";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    fontSize: 14,
  },
});

// Функция для определения цвета фона строки
const getRowBackgroundColor = (layer: string) => {
  return layer === "Черновой" ? "#f5f5f5" : "#ffffff"; // Светло-серый для "Черновой", белый для "Чистовой"
};
// Функция для вычисления цвета на основе процента
const getBackgroundColor = (percentage: string) => {
  const percent = parseFloat(percentage); // Преобразуем строку в число
  return `linear-gradient(to right, #4caf50 ${percent}%, #ff5722 ${percent}%)`;
};

export const RoomTable: React.FC = () => {
  const [allRooms, setAllRooms] = useState([]);
  const [room, setRoom] = React.useState("");
  const nameRooms = allRooms.map((room) => room.name);

  const roomData = allRooms.find((el) => el.name === room);

  const planning_type_floor = roomData?.planning_type_floor
    ?.map((el) => {
      const volumes = roomData?.floor_volumes.find(
        (volume) => volume.floor_type.id === el.floor_type.id
      );
      return [
        {
          construct: "Полы",
          layer: "Черновой",
          finishType: el.floor_type.type_code,
          descriptionFinishType: el.floor_type.description,
          material: el.floor_type.rough_finish,
          unit: "м2",
          totalVolume: el.area_rough,
          completedVolume: volumes?.rough_volume || 0,
          remaining: volumes?.remaining_rough || 0,
          completionPercentage: volumes?.rough_completion_percentage || 0,
        },
        {
          construct: "Полы",
          layer: "Чистовой",
          finishType: el.floor_type.type_code,
          descriptionFinishType: el.floor_type.description,
          material: el.floor_type.clean_finish,
          unit: "м2",
          totalVolume: el.area_clean,
          completedVolume: volumes?.clean_volume || 0,
          remaining: volumes?.remaining_clean || 0,
          completionPercentage: volumes?.clean_completion_percentage || 0,
        },
      ];
    })
    .flat();
  const planning_type_ceiling = roomData?.planning_type_ceiling
    ?.map((el) => {
      const volumes = roomData?.ceiling_volumes.find(
        (volume) => volume.ceiling_type.id === el.ceiling_type.id
      );
      return [
        {
          construct: "Потолок",
          layer: "Черновой",
          finishType: el.ceiling_type.type_code,
          descriptionFinishType: el.ceiling_type.description,
          material: el.ceiling_type.rough_finish,
          unit: "м2",
          totalVolume: el.area_rough,
          completedVolume: volumes?.rough_volume || 0,
          remaining: volumes?.remaining_rough || 0,
          completionPercentage: volumes?.rough_completion_percentage || 0,
        },
        {
          construct: "Потолок",
          layer: "Чистовой",
          finishType: el.ceiling_type.type_code,
          descriptionFinishType: el.ceiling_type.description,
          material: el.ceiling_type.clean_finish,
          unit: "м2",
          totalVolume: el.area_clean,
          completedVolume: volumes?.clean_volume || 0,
          remaining: volumes?.remaining_clean || 0,
          completionPercentage: volumes?.clean_completion_percentage || 0,
        },
      ];
    })
    .flat();

  const planning_type_wall = roomData?.planning_type_wall
    ?.map((el) => {
      const volumes = roomData?.wall_volumes.find(
        (volume) => volume.wall_type.id === el.wall_type.id
      );
      return [
        {
          construct: "Стены",
          layer: "Черновой",
          finishType: el.wall_type.type_code,
          descriptionFinishType: el.wall_type.description,
          material: el.wall_type.rough_finish,
          unit: "м2",
          totalVolume: el.area_rough,
          completedVolume: volumes?.rough_volume || 0,
          remaining: volumes?.remaining_rough || 0,
          completionPercentage: volumes?.rough_completion_percentage || 0,
        },
        {
          construct: "Стены",
          layer: "Чистовой",
          finishType: el.wall_type.type_code,
          descriptionFinishType: el.wall_type.description,
          material: el.wall_type.clean_finish,
          unit: "м2",
          totalVolume: el.area_clean,
          completedVolume: volumes?.clean_volume || 0,
          remaining: volumes?.remaining_clean || 0,
          completionPercentage: volumes?.clean_completion_percentage || 0,
        },
      ];
    })
    .flat();
  const rows = planning_type_floor
    ? [...planning_type_floor, ...planning_type_ceiling, ...planning_type_wall]
    : [];
  console.log(rows);

  // Группируем строки по конструктиву и слою
  const groupedRows: { [key: string]: { [key: string]: typeof rows } } = {};
  rows.forEach((row) => {
    if (!groupedRows[row.construct]) {
      groupedRows[row.construct] = {};
    }
    if (!groupedRows[row.construct][row.layer]) {
      groupedRows[row.construct][row.layer] = [];
    }
    groupedRows[row.construct][row.layer].push(row);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRooms();
        setAllRooms(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setRoom(event.target.value as string);
  };

  return (
    <TableContainer
      elevation={3}
      component={Paper}
      sx={{ width: 1200, margin: "auto" }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={9}>
              <FormControl fullWidth>
                <InputLabel
                  id="simple-select-label"
                  sx={{ fontSize: "1.5rem" }}
                >
                  Помещение
                </InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={room}
                  label="Помещение"
                  onChange={handleChange}
                  sx={{
                    textAlign: "center", // Выравнивание текста по центру
                    fontWeight: "600",
                    fontSize: "1.5rem",
                  }}
                >
                  {nameRooms.map((nameRoom, i) => (
                    <MenuItem key={i} value={nameRoom}>
                      {nameRoom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Конструктив</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Слой</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Тип отделки</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Материал</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Ед. изм.</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Объём всего</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Объём выполнено ранее
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Остаток</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Объём выполнено ранее, %
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(groupedRows).map(([construct, layers]) =>
            Object.entries(layers).map(([layer, group], layerIndex) =>
              group.map((row, index) => (
                <TableRow
                  key={`${construct}-${layer}-${index}`}
                  sx={{ backgroundColor: getRowBackgroundColor(layer) }} // Применяем цвет фона
                >
                  {/* Конструктив */}
                  {layerIndex === 0 && index === 0 ? (
                    <TableCell rowSpan={Object.values(layers).flat().length}>
                      {construct}
                    </TableCell>
                  ) : null}
                  {/* Слой */}
                  {index === 0 ? (
                    <TableCell rowSpan={group.length}>{layer}</TableCell>
                  ) : null}
                  {/* Остальные ячейки */}

                  <CustomWidthTooltip title={row.descriptionFinishType}>
                    <TableCell>{row.finishType}</TableCell>
                  </CustomWidthTooltip>
                  <TableCell>{row.material}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell>{row.totalVolume}</TableCell>
                  <TableCell>{row.completedVolume}</TableCell>
                  <TableCell>{row.remaining}</TableCell>
                  {/* Ячейка с градиентом */}
                  <TableCell
                    style={{
                      background: getBackgroundColor(row.completionPercentage),
                      color: "white", // Для лучшей читаемости текста
                    }}
                  >
                    {row.completionPercentage}
                  </TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
