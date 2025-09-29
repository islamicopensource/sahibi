"use client";
import { createContext, useContext, useEffect, useState } from "react";
// import Messages from "./components/messages";
import Loader from "./components/loader";

const StateContext = createContext();

export function StateProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({ loading: true });
  const [err, setErr] = useState("");

  const addMessage = (msg) => setMessages([...messages, msg]);

  const registerServiceWorker = async (update) => {
    if ("serviceWorker" in navigator) {
      return navigator.serviceWorker.getRegistrations().then(async (registrations) => {
        for (const registration of registrations) {
          if (
            registration.active.state == "activated" &&
            registration.active?.scriptURL?.includes("service-worker.js")
          ) {
            continue;
          }
          await new Promise((res, rej) => registration.unregister().then(res).catch(rej));
        }

        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => console.log("Registration scope: ", registration.scope))
          .catch((error) => console.log("Web Worker Registration Error: ", error));
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        // Invoke the native share dialog
        await navigator.share({
          // title: name,
          url: window.location.origin,
        });
        console.log("Content shared successfully!");
      } catch (error) {
        // Handle errors, including if the user cancels the share
        console.log("Sharing failed:", error);
        setErr(error.message);
      }
    } else {
      // Provide a fallback for unsupported browsers
      console.log("Web Share API not supported.");
      // You could open a traditional share modal here
    }

    // localStorage.setItem("shownIosInstallModal", "true");
    // setOpen(false);
  };

  useEffect(() => {
    // if (!window.localStorage.getItem("accessToken"))  setUser(null);
    // else fetchUser().then(updateUser).catch(()=> setUser(null));
    setUser({ id: "some-id", name: "Mister Tester" });
    // setUser({ id: "some-id", name: "Mister Tester" });

    registerServiceWorker();
  }, []);

  return (
    <StateContext.Provider value={{ user, messages, addMessage }}>
      {children}
      {user.loading && <Loader size="40" wrapperCls="z-9 absolute inset-0 !m-0 bg-blur" />}
      {/* <Messages messages={messages} setMessages={setMessages} /> */}

      <button onClick={handleShare}>Share {err}</button>
    </StateContext.Provider>
  );
}

export const State = () => useContext(StateContext);
