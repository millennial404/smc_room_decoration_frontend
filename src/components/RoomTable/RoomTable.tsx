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
} from "@mui/material";

const rows = [
  {
    construct: "Полы",
    layer: "Черновой",
    finishType: "2,3",
    material: "Стяжка",
    unit: "м2",
    totalVolume: 10.9,
    completedVolume: 8.72,
    remaining: 2.18,
    completionPercentage: "80%",
  },
  {
    construct: "Полы",
    layer: "Чистовой",
    finishType: "2,3",
    material: "Полимерное покрытие",
    unit: "м2",
    totalVolume: 10.9,
    completedVolume: 0,
    remaining: 10.9,
    completionPercentage: "0%",
  },
  {
    construct: "Потолок",
    layer: "Черновой",
    finishType: "П1",
    material: "Ключевой объем №1",
    unit: "м2",
    totalVolume: 7,
    completedVolume: 7,
    remaining: 0,
    completionPercentage: "100%",
  },
  {
    construct: "Потолок",
    layer: "Чистовой",
    finishType: "П1",
    material: "Ключевой объем №2",
    unit: "м2",
    totalVolume: 7,
    completedVolume: 0,
    remaining: 7,
    completionPercentage: "0%",
  },
  {
    construct: "Потолок",
    layer: "Чистовой",
    finishType: "П2",
    material: "Ключевой объем №2",
    unit: "м2",
    totalVolume: 5,
    completedVolume: 0,
    remaining: 5,
    completionPercentage: "0%",
  },
  {
    construct: "Стены",
    layer: "Черновой",
    finishType: "С-4.С",
    material: "Штукатурка",
    unit: "м2",
    totalVolume: 13.4,
    completedVolume: 13.4,
    remaining: 0,
    completionPercentage: "100%",
  },
  {
    construct: "Стены",
    layer: "Черновой",
    finishType: "Р-1.В",
    material: "Штукатурка",
    unit: "м2",
    totalVolume: 21.7,
    completedVolume: 21.7,
    remaining: 0,
    completionPercentage: "100%",
  },
  {
    construct: "Стены",
    layer: "Черновой",
    finishType: "Р-1.С",
    material: "Штукатурка",
    unit: "м2",
    totalVolume: 1.8,
    completedVolume: 1.8,
    remaining: 0,
    completionPercentage: "100%",
  },
  {
    construct: "Стены",
    layer: "Чистовой",
    finishType: "С-4.С",
    material: "Керамогранитная плитка",
    unit: "м2",
    totalVolume: 13.4,
    completedVolume: 0,
    remaining: 13.4,
    completionPercentage: "0%",
  },
  {
    construct: "Стены",
    layer: "Чистовой",
    finishType: "Р-1.В",
    material: "Окраска",
    unit: "м2",
    totalVolume: 21.7,
    completedVolume: 0,
    remaining: 21.7,
    completionPercentage: "0%",
  },
  {
    construct: "Стены",
    layer: "Чистовой",
    finishType: "Р-1.С",
    material: "Окраска",
    unit: "м2",
    totalVolume: 1.8,
    completedVolume: 0,
    remaining: 1.8,
    completionPercentage: "0%",
  },
];
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
  console.log(allRooms);
  const nameRooms = allRooms.map((room) => room.name);
  console.log(room);

  const roomData = allRooms.find((el) => el.name === room);

  return (
    <TableContainer component={Paper}>
      <Table>
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
                  <TableCell>{row.finishType}</TableCell>
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
