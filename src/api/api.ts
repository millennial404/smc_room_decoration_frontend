export const getAllRooms = async () => {
  const res = await fetch(" http://127.0.0.1:8000/api/rooms/");
  return await res.json();
};
