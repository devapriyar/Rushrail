const redis = require("redis");

const client = redis.createClient();

client.on("error", (err) => {
  console.log("Redis Error:", err);
});

async function startWorker() {

  await client.connect();
  console.log("Queue worker started");

  setInterval(async () => {

    try {

      for (let i = 0; i < 5; i++) {   // process 5 users at once

        const user = await client.rPop("tatkal_queue");

        if (user) {
          console.log("Processing user:", user);
        }

      }

    } catch (err) {
      console.log("Worker error:", err);
    }

  }, 3000); // runs every 3 seconds

}

startWorker();