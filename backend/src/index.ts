import app from "./server";

const main = async () => {
  try {
    await app.listen(process.env.PORT || 4000);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

main();
