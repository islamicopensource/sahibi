"use client";

import { urlBase64ToUint8Array } from "@/app/services/encodin-helper";
import { useState } from "react";

const key = process.env.NEXT_PUBLIC_VAPID_KEY;

export default function Test() {
  const { result, setResult } = useState("");

  const requestPushNotification = async () => {
    try {
      console.log("requestPushNotification");
      setResult("requestPushNotification");
      const permission = await Notification.requestPermission();
      setResult(JSON.stringify(permission, null, 2));

      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(key), // From `web-push generate-vapid-keys`
        });
        setResult(JSON.stringify(subscription, null, 2));

        console.log("Push subscription:", subscription);

        // Send subscription to your backend (for testing, log it)
        const res = await fetch("/api", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: { "Content-Type": "application/json" },
        });
      }
      setResult(JSON.stringify(res, null, 2));
    } catch (error) {
      console.log("requestPushNotification: ", error);
      setResult(JSON.stringify(error, null, 2));
    }
  };

  return (
    <div className="">
      <button onClick={requestPushNotification}>Enable Notifications</button>

      <pre>{result}</pre>
    </div>
  );
}
