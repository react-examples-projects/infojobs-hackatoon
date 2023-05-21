process.on("unhandledRejection", (err) => {
  console.error(err.message);
  process.exit(1);
});
process.on("warning", (e) => console.warn(e.stack));
