const redis = require("redis");
const db = require("./firebase");
const client = redis.createClient();

client.on("error", (err) => {
  console.log("Redis Error:", err);
});

async function startWorker() {

  await client.connect();
  console.log("Queue worker started");

  setInterval(async () => {

    try {

      const queueLength = await client.lLen("tatkal_queue");
      console.log("Checking queue... Current length:", queueLength);

      for (let i = 0; i < 5; i++) {

        const user = await client.rPop("tatkal_queue");

        if (!user) {
          console.log("No users in queue");
          break;
        }

        console.log("Processing user:", user);

        // check seats
        const seats = parseInt(await client.get("seats_available_12627"));

        if (seats > 0) {

          await client.decr("seats_available_12627");

          console.log("Seat booked for:", user);
          console.log("Remaining seats:", seats - 1);
           await db.collection("bookings").add({

    userId: user,

    train: "12627",

    status: "CONFIRMED",

    time: new Date()

  });

        } else {

          console.log("No seats available. Added to waitlist:", user);
          await client.lPush("waitlist", user);
            await db.collection("bookings").add({
    userId: user,
    train: "12627",
    status: "WAITLIST",
    time: new Date()
  });


        }


        await new Promise(resolve => setTimeout(resolve, 2000));

      }

    } catch (err) {
      console.log("Worker error:", err);
    }

  }, 3000);

}

startWorker();
