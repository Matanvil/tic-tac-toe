const users = [];

const addUser = ({ id, username, room, sign }) => {
  // Clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // validate the data
  if (!username || !room) {
    return {
      error: "Username and room are required",
    };
  }

  // check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  // validate username
  if (existingUser) {
    return {
      error: "User already exists",
    };
  }

  //store user
  const user = { id, username, room, sign };
  users.push(user);
  return { user };
};


const getUser = (id) => {
  return users.find((user) => user.id === id)
  
};


module.exports = { addUser, getUser, users };
