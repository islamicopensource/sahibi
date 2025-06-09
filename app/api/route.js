import webPush from "web-push"; // npm i web-push
const subscriptions = [];
const { NEXT_PUBLIC_HOST, NEXT_PUBLIC_VAPID_KEY, PRIV_VAPID_KEY, PUSH_NOTIFICATION_CONTACT_IDENTIFIER } =
  process.env;

// VAPID keys (generate with `web-push generate-vapid-keys`)
const vapidKeys = { publicKey: NEXT_PUBLIC_VAPID_KEY, privateKey: PRIV_VAPID_KEY };

webPush.setVapidDetails(
  `mailto:${PUSH_NOTIFICATION_CONTACT_IDENTIFIER}`,
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export async function POST(request) {
  const data = await request.json();

  subscriptions.push(data);
  console.log("Subscription saved:", data);

  return Response.json({ success: true });
}

export async function GET(request) {
  if (subscriptions.length === 0) return Response.json({ message: "No subscriptions found", status: 400 });

  const payload = JSON.stringify({
    title: "Test Push from Localhost!",
    body: "This notification was sent from your Node.js server.",
    url: NEXT_PUBLIC_HOST,
  });

  // Send to all subscriptions (for testing)
  Promise.all(subscriptions.map((sub) => webPush.sendNotification(sub, payload)))
    .then(() => Response.json({ success: true }))
    .catch((err) => {
      console.error("Error sending push:", err);

      // Clean up expired/failed subscriptions:
      if (err.statusCode === 410) "removeSubscriptionFromDB(subscription)";
      return Response.json({ message: "Failed to send push", status: 500 });
    });

  return Response.json({ success: true });
}
