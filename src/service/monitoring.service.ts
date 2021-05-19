import axios from "axios";
import sslChecker from "ssl-checker";

export const responseTime = async (url: string): Promise<number | string> => {
  try {
    const instance = axios.create();
    instance.interceptors.request.use((config) => {
      config.headers["request-startTime"] = process.hrtime();
      return config;
    });

    instance.interceptors.response.use((response) => {
      const start = response.config.headers["request-startTime"];
      const end = process.hrtime(start);
      const milliseconds = Math.round(end[0] * 1000 + end[1] / 1000000);
      response.headers["request-duration"] = milliseconds;
      return response;
    });
    const response = await instance.get((url || "example.com").toString());
    return response.headers["request-duration"];
  } catch (error) {
    console.error(error);
    return "Error";
  }
};

export const sslCheck = async (url: string): Promise<any> => {
  const response = sslChecker(url, { method: "GET", port: 443 });
  return response;
};
