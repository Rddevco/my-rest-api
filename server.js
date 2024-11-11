const express = require("express");
// const users = require("./MOCK_DATA.json");
const app = express();
const port = 3000;

let users = [
    { "id": 1, "first_name": "Molli", "last_name": "O'Scandall", "email": "moscandall0@merriam-webster.com", "gender": "Agender" },
    { "id": 2, "first_name": "John", "last_name": "Doe", "email": "johndoe@example.com", "gender": "Male" }
  ];
  
app.use(express.json());

//Routes To Get User Data
app.get("/users",(req,res) => {
return res.json(users);    
});

//Route To Get Users By Id
app.get("/users/:id",(req,res) => {
const userId = parseInt(req.params.id);
const user = users.find(user => user.id === userId);
if (user) {
return res.json(user);
}
return res.status(404).json({message: "user not found"});
});


app.post("/post",(req,res) => {
const {first_name,last_name,email,gender} = req.body;

if (!first_name || !last_name || !email || !gender) {
    return res.status(400).json({ message: "Missing required fields" });
  }
const newUser ={
id:users.length +1,
first_name,
last_name,
email,
gender
};
users.push(newUser);

return res.status(201).json(newUser);
});

//route to update existing user data
// app.put("put/users/:id", (req,res) => {

//  const userId = parseInt(req.params.id);   
// const {first_name,last_name,email,gender} = req.body;

// const userIndex =  users.findIndex(user => user.id === userId);

// if(userIndex === -1){

//     return res.status(404).json({message: "user not found"});
// }
// const updatedUser = {
// ...users[userIndex],
// first_name,
// last_name,
// email,
// gender
// };

// users[userIndex] = updatedUser;
// return res.json(updatedUser);

// });

app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id); 
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
  }
    const { first_name, last_name, email, gender } = req.body; 
  
   const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = {
      ...users[userIndex],
      first_name,          
      last_name,
      email,
      gender
    };

    users[userIndex] = updatedUser;

    return res.json(updatedUser);
  });
  
// DELETE route to remove a user by ID
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id,10); 
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);

    return res.status(204).json({ message: 'User deleted successfully' });
});

app.listen(port, () => console.log('Server Started At PORT:${port} '));