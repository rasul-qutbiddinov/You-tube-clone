import axios from "axios";

const BASE_URI = "https://youtube-v31.p.rapidapi.com";

const fetching = async (url, query = {}) => {
  const options = {
    params: { maxResults: "50", ...query },
    headers: {
      "X-RapidAPI-Key": "9c816756f1msh1bf89b3246025a6p1d9ae0jsnb83d5b8aa462", // API kalitni .env orqali olish
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
