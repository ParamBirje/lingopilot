const domain = () => {
  let domain = "http://localhost:8000";
  if (process.env.NEXT_PUBLIC_API_URL) {
    domain = process.env.NEXT_PUBLIC_API_URL;
  }

  return domain;
};

export default domain();
