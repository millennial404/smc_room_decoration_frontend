export const getAllRooms = async () => {
  const res = await fetch(" http://127.0.0.1:8000/api/rooms/");
  return await res.json();
};

export const addVolume = async (body: object, id: number) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/rooms/${id}/add-volumes/`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      } as HeadersInit,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(body),
    }
  );
  return res;
};
