"use client";
const key = process.env.VAPID_KEY;
console.log(key);

export default function Test() {
  const requestPushNotification = async () => {
    try {
      console.log("requestPushNotification");
      const permission = await Notification.requestPermission();
      console.log(permission);
      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: key, // From `web-push generate-vapid-keys`
        });

        console.log("Push subscription:", subscription);

        // Send subscription to your backend (for testing, log it)
        // await fetch("http://localhost:3000/save-subscription", {
        //   method: "POST",
        //   body: JSON.stringify(subscription),
        //   headers: { "Content-Type": "application/json" },
        // });
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
