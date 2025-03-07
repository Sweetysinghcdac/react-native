import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: "27ca158831da4eb75787",
    cluster: "ap2", // Use your actual cluster
    forceTLS: true
});

export default echo;
