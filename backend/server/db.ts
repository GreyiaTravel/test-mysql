import app from "./server";

const start = () => {
  app.listen(3000, () => {
    console.log("Started...");
  });
};

export default start;
