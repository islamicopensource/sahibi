// import webPush from "web-push"; // npm i web-push
const subscriptions = [];

export async function POST(request) {
  const data = await request.json();

  subscriptions.push(data);
  console.log("Subscription saved:", data);

  return Response.json({ success: true });
}

export async function GET(request) {
  if (subscriptions.length === 0) return Response.json({ message: "No subscriptions found", status: 400 });

  // const payload = JSON.stringify({
  //   title: "Test Push from Localhost!",
  //   body: "This notification was sent from your Node.js server.",
  //   url: "http://localhost:3000",
  // });

  // Send to all subscriptions (for testing)
  Promise.all(subscriptions.map((sub) => webPush.sendNotification(sub, payload)))
    .then(() => res.json({ success: true }))
    .catch((err) => {
      console.error("Error sending push:", err);

      // Clean up expired/failed subscriptions:
      if (err.statusCode === 410) "removeSubscriptionFromDB(subscription)";
    });

  webPush.sendNotification(subscription, payload).catch((err) => {});

  return Response.json({ success: true });
}
