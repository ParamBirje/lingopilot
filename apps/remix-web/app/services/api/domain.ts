const domain = () => {
  let domain = "http://127.0.0.1:8000";
  if (process.env.API_URL) {
    domain = process.env.API_URL;
  }

  return domain;
};

export default domain();
