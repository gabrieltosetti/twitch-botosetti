

(function() {
    const getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const sse = new EventSource("http://localhost:80/stream");

    sse.onmessage = function(event) {
        const gif = document.createElement('div');

        gif.className = 'go-up gif';
        gif.style.backgroundImage = `url(${event.data})`;
        gif.style.left = getRandomInt(0, 90) + 'vw';

        document.getElementById('gif-wrapper')
            .appendChild(gif);

        setTimeout(function(){ gif.remove() }, 9000, gif);
    }
})()