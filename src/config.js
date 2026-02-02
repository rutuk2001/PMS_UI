const dev = {
  apiUrl: process.env.REACT_APP_API_URL,
};

const prod = {
  apiUrl: process.env.REACT_APP_API_URL || "/api",
};

const config = process.env.NODE_ENV === "development" ? dev : prod;

export default config;
