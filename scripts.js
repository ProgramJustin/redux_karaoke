// LYRIC INFO
const songLyricsArray = "My mama called, seen you on TV, son Said shit done changed ever since we was on I dreamed it all ever since I was young They said I wouldn't be nothing Now they always say congratulations Worked so hard, forgot how to vacation They ain't never had the dedication People hatin', say we changed and look we made it Yeah, we made it".split(', ');

const songList = {
  1: "My mama called, seen you on TV, son Said shit done changed ever since we was on I dreamed it all ever since I was young They said I wouldn't be nothing Now they always say congratulations Worked so hard, forgot how to vacation They ain't never had the dedication People hatin', say we changed and look we made it Yeah, we made it".split(', '),
  2: "I got, I got, I got, I got Loyalty, got royalty inside my DNA Cocaine quarter piece, got war and peace inside my DNA I got power, poison, pain and joy inside my DNA I got hustle though, ambition, flow, inside my DNA I was born like this, since one like this Immaculate conception I transform like this, perform like this Was Yeshua's new weapon I don’t contemplate, I meditate, then off your fucking head This that put-the-kids-to-bed This that I got, I got, I got, I got Realness, I just kill shit 'cause it's in my DNA I got millions, I got riches buildin’ in my DNA I got dark, I got evil, that rot inside my DNA"
}

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
  // Declares several variables used below, without yet defining.
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':

    // Locates the arrayPosition of the song whose ID was provided in the action's payload, and increments it by one:
    newArrayPosition = state[action.currentSongId].arrayPosition + 1;

    // Creates a copy of that song's entry in the songsById state slice,
    // and adds the updated newArrayPosition value we just calculated as its arrayPosition:
    newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
      arrayPosition: newArrayPosition
    })

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
expect(lyricChangeReducer(initialState.songsById, { type: null})).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, {type: 'NEXT_LYRIC', currentSongId: 2})).toEqual({
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
    arrayPosition: 1,
  }
});

expect(lyricChangeReducer(initialState.songsById, { type: 'RESTART_SONG', currentSongId: 1 })).toEqual({
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
