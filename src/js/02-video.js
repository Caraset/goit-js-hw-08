// import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// const player = new Player('vimeo-player');

// player.on('play', function () {
//   console.log('played the video!');
// });

// Из описания дз - 3. Инициализируй плеер в файле скрипта как это описано в секции
// pre - existing player, но учти что у тебя плеер добавлен как npm пакет, а не через CDN.

const PLAYER_TIME_ON_EXIT = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');

const player = new Vimeo.Player(iframe);

if (localStorage.key(PLAYER_TIME_ON_EXIT)) {
  player.setCurrentTime(localStorage.getItem(PLAYER_TIME_ON_EXIT));
}

player.on('timeupdate', throttle(OnTimeUpdate, 1000));

function OnTimeUpdate(data) {
  player.getCurrentTime().then(seconds => localStorage.setItem(PLAYER_TIME_ON_EXIT, seconds));
}
