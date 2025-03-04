import { BASE_URL } from "../constants/constants";

const checkResponse = (res: Response) => {
  if (res.status === 204) {
    // Если статус 204 (No Content), возвращаем статус
    return res.status;
  }

  if (res.ok) {
    // Если запрос успешен, парсим JSON
    return res.json();
  } else {
    // Если запрос неуспешен, парсим JSON и отклоняем промис
    return res.json().then((err) => {
      throw new Error(err.message || "An error occurred");
    });
  }
};

function request(endpoint: string, options: RequestInit = {}) {
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

export const getDownloadCSV_Actual = async () => {
  try {
    // Проверяем наличие токена
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing. Please log in.");
    }

    // Выполняем запрос к серверу
    const response = await fetch(
      `${BASE_URL}/api/rooms/download-last-volumes-csv/`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }
    );

    // Проверяем статус ответа
    if (!response.ok) {
      throw new Error(`Failed to download CSV: ${response.statusText}`);
    }

    // Получаем Blob из ответа
    const blob = await response.blob();

    // Создаем ссылку для скачивания и назначаем имя файла
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "actual_volumes.csv"; // Указываем имя файла
    link.click();

    // Освобождаем URL-объект после скачивания
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error downloading CSV:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
};

export const getDownloadCSV_Summary = async () => {
  try {
    // Проверяем наличие токена
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing. Please log in.");
    }

    // Выполняем запрос к серверу
    const response = await fetch(`${BASE_URL}/api/rooms/download-csv/`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });

    // Проверяем статус ответа
    if (!response.ok) {
      throw new Error(`Failed to download CSV: ${response.statusText}`);
    }

    // Получаем Blob из ответа
    const blob = await response.blob();

    // Создаем ссылку для скачивания и назначаем имя файла
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "summary_volumes.csv"; // Указываем имя файла
    link.click();

    // Освобождаем URL-объект после скачивания
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error downloading CSV:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
};

export const getDownloadCSV_All = async () => {
  try {
    // Проверяем наличие токена
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access token is missing. Please log in.");
    }

    // Выполняем запрос к серверу
    const response = await fetch(
      `${BASE_URL}/api/rooms/download-all-volumes-csv/`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }
    );

    // Проверяем статус ответа
    if (!response.ok) {
      throw new Error(`Failed to download CSV: ${response.statusText}`);
    }

    // Получаем Blob из ответа
    const blob = await response.blob();

    // Создаем ссылку для скачивания и назначаем имя файла
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "all_volumes.csv"; // Указываем имя файла
    link.click();

    // Освобождаем URL-объект после скачивания
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error downloading CSV:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
};

export const fetchWithRefresh = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    return await request(endpoint, options); // делаем запрос
  } catch (err) {
    if (err instanceof Error && err.message.includes("token_not_valid")) {
      const refreshData = await refreshToken(); // обновляем токен
      localStorage.setItem("accessToken", refreshData.access); // (или в cookies)
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${refreshData.access}`,
      };
      return await request(endpoint, options); // вызываем перезапрос данных
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
