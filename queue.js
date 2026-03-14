const redis = require("redis");

const client = redis.createClient({
  url: "redis://127.0.0.1:6379"
});

client.on("error", (err) => {
  console.log("Redis Error:", err);
});

async function connectRedis(){
  await client.connect();
  console.log("Redis Connected");
}

connectRedis();

async function addUserToQueue(userId){
  await client.lPush("tatkal_queue", userId);
}

async function getQueueLength(){
  return await client.lLen("tatkal_queue");
}

module.exports = { addUserToQueue, getQueueLength };