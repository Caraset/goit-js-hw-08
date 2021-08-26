import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const PLAYER_TIME_ON_EXIT = 'videoplayer-current-time';

const player = new Player('vimeo-player');

player.on('play', onVideoPlay);

function onVideoPlay() {
  if (localStorage.getItem(PLAYER_TIME_ON_EXIT)) {
    player.setCurrentTime(localStorage.getItem(PLAYER_TIME_ON_EXIT));
    player.off('play', onVideoPlay);
  }
}

player.on('timeupdate', throttle(OnTimeUpdate, 1000));

player.on('seeked', OnTimeUpdate);

function OnTimeUpdate(data) {
  player.getCurrentTime().then(seconds => localStorage.setItem(PLAYER_TIME_ON_EXIT, seconds));
}
