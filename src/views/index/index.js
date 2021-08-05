
(function() {
    const sse = new EventSource("http://localhost:80/stream");

    sse.onmessage = function(event) {
        const divGif = document.getElementById("gif-wrap");
        divGif.style.backgroundImage = `url(${event.data})`;
    }
})()