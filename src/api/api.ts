import { decodeToken } from "react-jwt";

const BASE_URL = "http://87.242.85.9:8000";

const checkResponse = (res) => {
  return res.status === 204
    ? res.status
    : res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
};

function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}

export const getAllRooms = () => {
  return request(`/api/rooms/`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export const addVolume = (body: object, id: number) => {
  return request(`/api/rooms/${id}/add-volumes/`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    } as HeadersInit,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(body),
  });
};

export const getDownloadCSV_Actual = () => {
  return fetch(`${BASE_URL}/api/rooms/download-last-volumes-csv/`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.blob())
    .then((blob) => {
      const file = window.URL.createObjectURL(blob);
      window.location.assign(file);
    });
};

export const getDownloadCSV_Summary = () => {
  return fetch(`${BASE_URL}/api/rooms/download-csv/`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.blob())
    .then((blob) => {
      const file = window.URL.createObjectURL(blob);
      window.location.assign(file);
    });
};

export const getDownloadCSV_All = () => {
  return fetch(`${BASE_URL}/api/rooms/download-all-volumes-csv/`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((res) => res.blob())
    .then((blob) => {
      const file = window.URL.createObjectURL(blob);
      window.location.assign(file);
    });
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    return await request(endpoint, options); //делаем запрос
  } catch (err) {
    if (err.code === "token_not_valid") {
      const refreshData = await refreshToken(); //обновляем токен
      localStorage.setItem("accessToken", refreshData.access); //(или в cookies)
      options.headers.Authorization = `Bearer ${refreshData.access}`;
      return await request(endpoint, options); //вызываем перезапрос данных
    } else {
      return Promise.reject(err);
    }
  }
};

export function loginRequest(login: string, password: string) {
  return request("/api/token/", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      username: login,
      password: password,
    }),
  });
}

export function getUserData() {
  return fetchWithRefresh(
    `auth/users/${decodeToken(localStorage.getItem("accessToken")).user_id}/`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }
  );
}

export function refreshToken() {
  return request("/api/token/refresh/", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      refresh: localStorage.getItem("refreshToken"),
    }),
  });
}
