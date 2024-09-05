const config = [
  {
    apiUrl: "http://localhost:80/api",
    socketUrl: "http://localhost:80/api",
  },
  {
    apiUrl: "https://ewok-sim-api.herokuapp.com",
    socketUrl: "https://ewok-sim-api.herokuapp.com",
  },
];

type config = {
  development: any;
  production: any;
};

export default config;
