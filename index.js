const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

//get all available users
app.get("/user", async (req, res) => {
  const allUsers = await prisma.user.findMany({});

  res.json({
    data: allUsers,
  });
});

//get user by id
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const getUserById = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!!getUserById) {
    res.json({
      data: getUserById,
    });
  } else {
    res.json({
      data: "Unable to find user with id:" + id,
    });
  }
});

//create user
app.post("/user", async (req, res) => {
  const userName = req.body.name;
  const userPlace = req.body.place;

  // if (!userName || !userPlace) {
  //   return res.status(400).json({ message: "Either name or place is missing" });
  // }

  try {
    const userData = await prisma.user.create({
      data: {
        name: userName,
      },
    });
    console.log("Created User");
    return res.json({ userData });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "something went wrong" });
  }
});

//update a user
app.put("/user/:id", async (req, res) => {
  console.log("here");
  const { id } = req.params;
  const { name, place } = req.body;
  try {
    const getUserById = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!!getUserById) {
      const post = await prisma.user.update({
        where: { id: id },
        data: {
          name: name,
          place: place,
        },
      });
      res.json(post);
    } else {
      res.json({
        data: "Unable to find user with id:" + id,
      });
    }
  } catch (error) {
    console.log("error", error);
    res.json({ error: `User with ID ${id} does not exist in the database` });
  }
});

//delete a user
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (!!deleteUser) {
      res.json({ data: "Sucessfully deleted user with id: " + id });
    }
  } catch (error) {
    res.json({ error: `User with ID ${id} does not exist in the database` });
  }
});
const server = app.listen(3000, () =>
  console.log("Server running at: http://localhost:3000")
);
