"use client";

import { urlBase64ToUint8Array } from "@/app/services/encodin-helper";

const key = process.env.NEXT_PUBLIC_VAPID_KEY;

export default function Test() {
  const requestPushNotification = async () => {
    try {
      console.log("requestPushNotification");
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key), // From `web-push generate-vapid-keys`
        });

        console.log("Push subscription:", subscription.keys);

        // Send subscription to your backend (for testing, log it)
        await fetch("/api", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: { "Content-Type": "application/json" },
        });
      }
    } catch (error) {
      console.log("requestPushNotification: ", error);
    }
  };

  return (
    <div className="">
      <button onClick={requestPushNotification}>Enable Notifications</button>
    </div>
  );
}
