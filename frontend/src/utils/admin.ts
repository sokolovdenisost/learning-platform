import { API_URL } from "../consts";

export const setVerifiedHandler = async (id: string) => {
  const response = await fetch(`${API_URL}/admin/set-verified`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  const result = await response.json();

  if (result.type === "Success") {
    window.location.reload();
  }

  return result;
};

export const sendNotification = async (body: ISendNotification) => {
  const response = await fetch(`${API_URL}/admin/send-notification`, {
    method: "POST",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  const result = await response.json();

  if (result.type === "Success") {
    window.location.reload();
  }

  return result;
};

export const toggleBanUser = async (user_id: string) => {
  const response = await fetch(`${API_URL}/admin/ban-user`, {
    method: "POST",
    body: JSON.stringify({ id: user_id }),
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  const result = await response.json();

  if (result.text === "This user is banned") {
    window.location.reload();
  }

  return result;
};

export async function deleteDontUseImages() {
  const response = await fetch(`${API_URL}/admin/delete-images`, {
    method: "POST",
  });

  const result = await response.json();

  console.log(result);

  return result;
}

interface ISendNotification {
  type: string;
  text: string;
  user_id: string;
}
