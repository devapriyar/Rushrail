 
const { addUserToQueue, getQueueLength } = require("./queue");
const express = require("express");
const cors = require("cors");
const db = require("./firebase");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Tatkal Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.post("/bookTicket", async (req,res)=>{

  const data = req.body;

  await db.collection("bookings").add(data);

  res.json({
    message: "Ticket booked successfully"
  });

});
app.post("/cancelTicket", async (req,res)=>{

  const bookingId = req.body.bookingId;

  await db.collection("bookings").doc(bookingId).delete();

  res.json({
    message: "Ticket cancelled"
  });

});
app.post("/bookTicket", async (req,res)=>{

  const data = req.body;

  await db.collection("bookings").add(data);

  res.json({
    message: "Ticket booked successfully"
  });

});
app.post("/cancelTicket", async (req,res)=>{

  const bookingId = req.body.bookingId;

  await db.collection("bookings").doc(bookingId).delete();

  res.json({
    message: "Ticket cancelled"
  });

});
app.post("/joinQueue", async (req,res)=>{

 const userId = "user_" + Date.now();

 await addUserToQueue(userId);

 const position = await getQueueLength();

 res.send({
   message: "Joined Queue",
   user: userId,
   queue_position: position
 });

});