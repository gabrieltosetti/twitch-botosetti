(() => {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const ws = new WebSocket("ws://localhost:8080/stream");
  ws.onopen = () => console.log("Connected to server");
  ws.onclose = () => console.log("Disconnected from server");
  ws.onmessage = (event) => {
    const gif = document.createElement("div");

    gif.className = "go-up gif";
    gif.style.backgroundImage = `url(${event.data})`;
    gif.style.left = getRandomInt(0, 90) + "vw";

    document.getElementById("gif-wrapper").appendChild(gif);

    setTimeout(() => gif.remove(), 9000, gif);
  };
})();
