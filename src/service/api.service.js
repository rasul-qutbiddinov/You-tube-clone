import axios from "axios";

const BASE_URI = "https://youtube-v31.p.rapidapi.com";

const fetching = async (url, query = {}) => {
  const options = {
    params: { maxResults: "50", ...query },
    headers: {
      "X-RapidAPI-Key": "6b41343acamsh2b7cc682ce36c22p1e13efjsnff30cec24da5", // API kalitni .env orqali olish
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
