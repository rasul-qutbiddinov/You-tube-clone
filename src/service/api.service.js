import axios from "axios";

const BASE_URI = "https://youtube-v31.p.rapidapi.com";

const fetching = async (url, query = {}) => {
  const options = {
    params: { maxResults: "50", ...query },
    headers: {
      "X-RapidAPI-Key": "60a0c46e20msh7dd031214607484p1e4aeejsn577ab43499fb", // API kalitni .env orqali olish
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.get(`${BASE_URI}/${url}`, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Xatolikni yuqoriga uzatamiz
  }
};

export const apiservice = { fetching };
