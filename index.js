const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const PORT = 3100;
const WS_PORT = 3300;

// web server
const app = express();
app.use(cors());

// socket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// ws messages
const messages = [];

// web mock
const data = [
  {
    id: 1,
    image:
      "https://cdn0.iconfinder.com/data/icons/real-estate-special/145/7-512.png",
    title: "John Doe",
    role: "Fullstack Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis placerat lacus, sed sollicitudin ligula mattis in. Pellentesque at mauris laoreet lacus faucibus tempus. Phasellus gravida massa ac nunc dictum semper. Pellentesque et posuere leo, sit amet vestibulum sem. Cras neque urna, rhoncus vel neque facilisis, sollicitudin congue magna. Quisque blandit ac arcu quis sagittis. Aenean et ipsum leo. Aliquam iaculis sem id nisl aliquam bibendum id eu sem.",
  },
  {
    id: 2,
    image:
      "https://cdn0.iconfinder.com/data/icons/real-estate-special/145/7-512.png",
    title: "Marcos",
    role: "Fullstack Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis placerat lacus, sed sollicitudin ligula mattis in. Pellentesque at mauris laoreet lacus faucibus tempus. Phasellus gravida massa ac nunc dictum semper. Pellentesque et posuere leo, sit amet vestibulum sem. Cras neque urna, rhoncus vel neque facilisis, sollicitudin congue magna. Quisque blandit ac arcu quis sagittis. Aenean et ipsum leo. Aliquam iaculis sem id nisl aliquam bibendum id eu sem.",
  },
  {
    id: 3,
    image:
      "https://cdn0.iconfinder.com/data/icons/real-estate-special/145/7-512.png",
    title: "Felipe",
    role: "Front-end Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis placerat lacus, sed sollicitudin ligula mattis in. Pellentesque at mauris laoreet lacus faucibus tempus. Phasellus gravida massa ac nunc dictum semper. Pellentesque et posuere leo, sit amet vestibulum sem. Cras neque urna, rhoncus vel neque facilisis, sollicitudin congue magna. Quisque blandit ac arcu quis sagittis. Aenean et ipsum leo. Aliquam iaculis sem id nisl aliquam bibendum id eu sem.",
  },
  {
    id: 4,
    image:
      "https://cdn0.iconfinder.com/data/icons/some-avatars/200/girlbrownhairsute-512.png",
    title: "Marta",
    role: "Front-end Developer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis placerat lacus, sed sollicitudin ligula mattis in. Pellentesque at mauris laoreet lacus faucibus tempus. Phasellus gravida massa ac nunc dictum semper. Pellentesque et posuere leo, sit amet vestibulum sem. Cras neque urna, rhoncus vel neque facilisis, sollicitudin congue magna. Quisque blandit ac arcu quis sagittis. Aenean et ipsum leo. Aliquam iaculis sem id nisl aliquam bibendum id eu sem.",
  },
];

// web routes
app.get("/candidates", (_req, res) => res.json(data));

app.get("/candidate", (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.status(400);
  }

  const item = data.find((item) => item.id === Number(id));

  if (!item) {
    res.status(404);
  }

  res.json(item);
});

// socket routes
io.on("connection", (socket) => {
  socket.emit("load-messages", messages);
  socket.on(
    "new-message",
    (message) => {
      messages.push(message);
      socket.broadcast.emit("load-messages", messages);
    }
  )
});

// web server start
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// ws server start
io.listen(WS_PORT);
