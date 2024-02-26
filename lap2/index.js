const express = require("express");
const PORT = process.env.PORT || 2000;
const server = express();

const helper = require('./helper');

///////////////////////////////////
server.get("/todo", (req, res) => {
    res.send(helper.listTodos("all"));
  });
  
  server.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    res.send(helper.listTodos("specific", id));
  });
  
  server.get("/todo/completed", (req, res) => {
    res.send(helper.listTodos("checked"));
  });
  
  server.get("/todo/uncompleted", (req, res) => {
    res.send(helper.listTodos("unchecked"));
  });

  ///////////////////////////////////
  
  server.use(express.json()); 
  
  server.post("/todo", (req, res) => {
    const data = req.body;
    console.log(data);
    helper.add(data);
    res.status(201).send("Todo added successfully");
  });
  
  /////////////////////////////
  
  server.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log(data);
    helper.update(id, data.title,data.body);
    res.status(201).send(`Update Todo of ID ${id}`);
  });
  
  server.put("/todo/complete/:id", (req, res) => {
    const id =parseInt( req.params.id);
    console.log(id);
    helper.toggleTodo(id,true);
    res.status(201).send(`Update Todo Status of Id ${id}`);
  });
  
  server.put("/todo/uncomplete/:id", (req, res) => {
    const id = parseInt( req.params.id);
    console.log(id);
    helper.toggleTodo(id,false);
    res.status(201).send(`Update Todo Status of Id ${id}`);
  });
  
 
  
  ///////////////////////////

  server.delete("/todo/:id", (req, res) => {
    const id =  parseInt( req.params.id);
    console.log(id);
    helper.Delete(id);
    res.send(`Delete Todo of ID ${id}`);
  });
  
  server.listen(PORT, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Server listening on ${PORT}`);
  });
  
  helper.createDBFileIsNotExist();  