// LYRIC INFO
const songLyricsArray = "My mama called, seen you on TV, son Said shit done changed ever since we was on I dreamed it all ever since I was young They said I wouldn't be nothing Now they always say congratulations Worked so hard, forgot how to vacation They ain't never had the dedication People hatin', say we changed and look we made it Yeah, we made it".split(', ');

// INITIAL REDUX STATE, SINGLE SOURCE OF TRUTH
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Congratulations",
      artist: "Post Malone featuring Quavo",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "DNA",
      artist: "Kendrick Lamar",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    }
  }
}

// REDUX REDUCER, REDUCER UPDATES STATE
// advances our song lyrics, including restarting at the first lyric when the song concludes
const lyricChangeReducer = (state = initialState.songsById, action) => {
  // console.log(initialState);
  let newState;
  switch (action.type) {
    case 'NEXT_LYRIC':
    let newArrayPosition = state.arrayPosition + 1;
    newState = {
      songLyricsArray: state.songLyricsArray,
      arrayPosition: newArrayPosition,
    }
    return newState;
  case 'RESTART_SONG':
    newState = initialState;
    return newState;
  default:
    return state;
  }
}

// JEST TESTS + SETUP, JEST USES THE EXPECT LIBRARY
const { expect } = window;

// RUN TEST
expect(lyricChangeReducer(initialState.songsById, { type: null})).toEqual(initialStat.songsById);

expect(lyricChangeReducer(initialState.songsById, {type: 'NEXT_LYRIC'})).toEqual({
  1: {
    title: "Congratulations",
    artist: "Post Malone featuring Quavo",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "DNA",
    artist: "Kendrick Lamar",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});

expect(lyricChangeReducer(initialStat.songsById, { type: 'RESTART_SONG' })).toEqual({
  1: {
    title: "Congratulations",
    artist: "Post Malone featuring Quavo",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "DNA",
    artist: "Kendrick Lamar",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  }
});

//REDUX STORE, SINGLE SOURCE OF TRUTH
const { createStore } = Redux;
const store = createStore(lyricChangeReducer);

// RENDERING STATE IN DOM
const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while(lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
  const renderLine = document.createTextNode(currentLine);
  document.getElementById('lyrics').appendChild(renderLine);
}

window.onload = function() {
  renderLyrics();
}

// CLICK LISTENER
const userClick = () => {
  const currentState = store.getState();
  if (currentState.arrayPosition === currentState.songLyricsArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG' } );
  } else {
    store.dispatch({ type: 'NEXT_LYRIC' } );
  }
}

// SUBSCRIBE TO REDUX STORE
store.subscribe(renderLyrics);
