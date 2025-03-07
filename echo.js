import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: 'your-reverb-key',
    wsHost: '192.168.2.7',  // Use your actual IP
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
});

export default echo;
