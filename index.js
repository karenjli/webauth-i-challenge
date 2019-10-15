const server = require("./api/server");

const port = 6500;

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
