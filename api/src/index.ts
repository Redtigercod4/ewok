import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import equipmentRouter from "./routes/equipmentRouter";
import satenvRouter from "./routes/SatenvRouter";

const port = process.env.API_PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: `http://localhost:${port}`,
  },
});

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = io;
  return next();
});

app.use("/equipment", equipmentRouter);
app.use("/satenv", satenvRouter);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

io.on("connection", (socket) => {
  const Patch = (table, update) => {
    if (table == "equipment") {
      const id = update.id;
      delete update.id;
      const room = `${update.server}_${update.team}`;
      knex("equipment")
        .where("id", id)
        .update(update)
        .then((res) => {
          knex("equipment")
            .select("*")
            .where("team", update.team)
            .andWhere("server", update.server)
            .then((data) => socket.to(room).emit("equipment_patch", data));
        });
    } else if (table == "satEnv") {
      const conn = update.conn;
      delete update.id;
      const room = update.server;
      knex("satenv")
        .where("conn", conn)
        .update(update)
        .then((res) => {
          knex("satenv")
            .select("*")
            .where("server", update.server)
            .then((data) => socket.to(room).emit("satEnv_patch", data));
        });
    }
  };

  const Delete = (table, update) => {
    if (table == "equipment") {
      const id = update.id;
      const room = update.server;
      delete update.id;
      knex("equipment")
        .where("id", id)
        .delete()
        .then((res) => {
          knex("equipment")
            .select("*")
            .where("team", update.team)
            .andWhere("server", update.server)
            .then((data) => socket.to(room).emit("equipment_patch", data));
        });
    } else if (table == "satEnv") {
      const conn = update.conn;
      const room = update.server;
      delete update.id;
      knex("satenv")
        .where("conn", conn)
        .delete()
        .then((res) => {
          knex("satenv")
            .select("*")
            .where("server", update.server)
            .then((data) => socket.to(room).emit("satEnv_patch", data));
        });
    }
  };

  const Post = (table, update) => {
    if (table == "equipment") {
      const room = `${update.server}_${update.team}`;
      delete update.id;
      knex("equipment")
        .insert(update)
        .then((res) => {
          knex("equipment")
            .select("*")
            .where("team", update.team)
            .andWhere("server", update.server)
            .then((data) => socket.to(room).emit("equipment_patch", data));
        });
    } else if (table == "satEnv") {
      const room = update.server;
      delete update.id;
      knex("satenv")
        .insert(update)
        .then((res) => {
          knex("satenv")
            .select("*")
            .where("server", update.server)
            .then((data) => socket.to(room).emit("satEnv_patch", data));
        });
    }
  };

  socket.on("JOIN", (server, team) => {
    socket.join(server);
    socket.join(`${server}_${team}`);
  });

  socket.on("CHAT", (props) => {
    const room = props.server;
    io.sockets.emit("CHAT_API", props);
  });

  socket.on("POST", (table, update) => {
    Post(table, update);
  });

  socket.on("PATCH", (table, update) => {
    Patch(table, update);
  });

  socket.on("DELETE", (table, update) => {
    Delete(table, update);
  });

  socket.on("RESET", (server) => {
    // Delete all student signals from environment
    knex("satenv")
      .select("*")
      .where("server", server)
      .andWhereNot("team", "Instructor")
      .then((res) => {
        res.forEach((signal) => Delete("satEnv", signal));
      });

    // Reset all TX modems
    knex("equipment")
      .select("*")
      .where("server", server)
      .andWhereNot("team", "Instructor")
      .andWhere("unit_type", "TX")
      .then((res) => {
        res.forEach((modem) => {
          const tmpModem = {
            ...modem,
            cf: 1000,
            dr: 1,
            mod: 1,
            fec: 1,
            power: -87,
            sat: "ASH",
            active: false,
          };
          Patch("equipment", tmpModem);
        });
      });

    // Reset all RX modems
    knex("equipment")
      .select("*")
      .where("server", server)
      .andWhereNot("team", "Instructor")
      .andWhere("unit_type", "RX")
      .then((res) => {
        res.forEach((modem) => {
          const tmpModem = {
            ...modem,
            cf: 1000,
            mod: 1,
            fec: 1,
          };
          Patch("equipment", tmpModem);
        });
      });

    // Reset all Antennas
    knex("equipment")
      .select("*")
      .where("server", server)
      .andWhere("unit_type", "Antenna")
      .then((res) => {
        res.forEach((antenna) => {
          const tmpAntenna = {
            ...antenna,
            unit_name: "C",
            cf: 0,
            bw: 0,
            mod: 0,
            fec: 0,
            power: 1,
            sat: "ASH",
            feed: "0",
            active: false,
          };
          Patch("equipment", tmpAntenna);
        });
      });
  });

  socket.on("ACTIVATE", (server) => {
    // Delete instructor signals from satEnv
    knex("satenv")
      .select("*")
      .where("server", server)
      .andWhere("team", "Instructor")
      .then((res) => {
        res.forEach((signal) => {
          Delete("satEnv", signal);
        });
      })
      .then(() => {
        // Post all signals to satEnv
        knex("equipment")
          .select("*")
          .where("server", server)
          .where("team", "Instructor")
          .then((res) => {
            res.forEach((signal) => {
              const tmpSignal = {
                ...signal,
                active: true,
              };
              const tmpEnvSignal = {
                id: signal.id,
                server: signal.server,
                conn: signal.conn,
                team: signal.team,
                cf: Number(signal.cf),
                dr: Number(signal.dr),
                fec: Number(signal.fec),
                mod: Number(signal.mod),
                power: signal.power,
                band:
                  signal.sat === "ASH"
                    ? "C"
                    : signal.sat === "DRSC"
                    ? "Ku"
                    : "Ka",
                sat: signal.sat,
                feed: signal.feed,
                stage: "ULIF",
                active: true,
              };
              Patch("equipment", tmpSignal);
              Post("satEnv", tmpEnvSignal);
            });
          });
      });
  });

  socket.on("DEACTIVATE", (server) => {
    // Delete instructor signals from satEnv
    knex("satenv")
      .select("*")
      .where("server", server)
      .andWhere("team", "Instructor")
      .then((res) => {
        res.forEach((signal) => {
          Delete("satEnv", signal);
        });
      })
      .then(() => {
        // Post all signals to satEnv
        knex("equipment")
          .select("*")
          .where("server", server)
          .where("team", "Instructor")
          .then((res) => {
            res.forEach((signal) => {
              const tmpSignal = {
                ...signal,
                active: false,
              };
              Patch("equipment", tmpSignal);
            });
          });
      });
  });
});


// No idea...
// app.get("/server", (req, res) => {
//   knex
//     .select("*")
//     .from("equipment")
//     .then((data) => {
//       const servers = data.map((x) => x.server);
//       res.status(200).json([...new Set(servers)]);
//     });
// });


// Part of the weird Cors Implementation throughout the API
// app.get("/", (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   res.status(200).send("App root route running");
// });
