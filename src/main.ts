import App from "./App.svelte";

const app = new App({
  target: document.body,
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../service-worker.js");
}

// window.addEventListener("beforeunload", (evt) => {
//     evt.preventDefault()
// })

export default app;
