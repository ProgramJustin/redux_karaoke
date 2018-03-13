// LYRIC INFO

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

    // Creates a copy of the entire songsById state slice, and adds the
    // updated newSongsById state entry we just created to this new copy:
    newSongsByIdStateSlice = Object.assign({}, state, {
      [action.currentSongId]: newSongsByIdEntry
    });

    // Returns the entire newSongsByIdStateSlice we just constructed, which will
    // update state in our Redux store to match this returned value:
    return newSongsByIdStateSlice;

  case 'RESTART_SONG':

    // Creates a copy of the song entry in songsById state slice whose ID matches
    // the currentSongId included with the action, sets the copy's arrayPosition value
    // to 0:}

    newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
      arrayPosition: 0
    })

    // Creates a copy of the entire songsById state slice, and adds the
    // updated newSongsByIdEntry we just created to this copy:
    newSongsByIdStateSlice = Object.assign({}, state, {
      [action.currentSongId]: newSongsByIdEntry
    });

    // Returns the entire newSongsByIdStateSlice we just constructed, which will
    // update the songsById state slice in our Redux store to match the new slice returned:

    return newSongsByIdStateSlice;

    // If action is neither 'NEXT_LYRIC' nor 'RESTART_STATE' type, return existing state:
  default:
    return state;
  }
}

const songChangeReducer = (state = initialState.currentSongId, action) => {
  switch (action.type){
    case 'CHANGE_SONG':
      return action.newSelectedSongId
    default:
      return state;
  }
}

const rootReducer = this.Redux.combineReducers({
  currentSongId: songChangeReducer,
  songsById: lyricChangeReducer
});

//REDUX STORE, SINGLE SOURCE OF TRUTH
const { createStore } = Redux;
const store = createStore(rootReducer);

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

expect(songChangeReducer(initialState, { type: null })).toEqual(initialState);

expect(songChangeReducer(initialState.currentSongId, { type: 'CHANGE_SONG', newSelectedSongId: 1 })).toEqual(1);

expect(rootReducer(initialState, { type: null })).toEqual(initialState);

expect(store.getState().currentSongId).toEqual(songChangeReducer(undefined, { type: null }));
expect(store.getState().songsById).toEqual(lyricChangeReducer(undefined, { type: null }));

// RENDERING STATE IN DOM
const renderLyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while(lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  // If currentSongId is not null we look at the entry in the songsById state slice with currentSongId as its key
  if (store.getState().currentSongId) {
  //  From songArray, we retrieve the specific lyric that is at the location of arrayPosition.
  // We create a text node from this lyric using document.createTextNode(), and append it to the lyrics area of our DOM.
    const currentLine = document.createTextNode(store.getState().songsById[store.getState().currentSongId].songArray[store.getState().songsById[store.getState().currentSongId].arrayPosition]);
    document.getElementById('lyrics').appendChild(currentLine);
    // If currentSongId is null (remember, we set it to null in our initialState), we display a message instructing users to select a song.
  } else {
    const selectSongMessage = document.createTextNode("select a song from the menu above to sing along!");
    document.getElementById('lyrics').appendChild(selectSongMessage);
   }
}

const renderSongs = () => {
  console.log('renderSongs method successfully fired!');
  console.log(store.getState());
  // Retrieves songsById state slice from store:
  const songsById = store.getState().songsById;

  // Cycles through each key in songsById
  for (const songKey in songsById) {

    // Locates song corresponding with each key, saves as 'song' constant:
    const song = songsById[songKey];

    // Creates <li>, <h3>, and <em> HTML elements to render this song's information in the DOM:
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const em = document.createElement('em');

    // Creates text node containing each song's title:
    const songTitle = document.createTextNode(song.title);

    // Creates text node containing each song's artist:
    const songArtist = document.createTextNode( ' by ' + song.artist);

    // Adds songTitle text node to the <em> element\:
    em.appendChild(songTitle);

    // Adds <em> element that now contains song title to the <h3> element
    h3.appendChild(em);

    // Also adds songArtist text node to <h3>
    h3.appendChild(songArtist);

    // Adds click event listener to same <h3>, when this <h3> is clicked, an event handler called selectedSong() will run, using song's ID as argument:
    h3.addEventListener('click', function() {
      selectSong(song.songId);
    });

    // Adds entire <h3> element to the <li> element
    li.appendChild(h3);

    // Appends <li> element to the <ul> element in the index.html with 'songs' ID:
    document.getElementById('songs').appendChild(li);
  }
}

window.onload = function() {
  renderSongs();
  renderLyrics();
}

// CLICK LISTENER
const userClick = () => {
  if (store.getState().songsById[store.getState().currentSongId].arrayPosition === store.getState().songsById[store.getState().currentSongId].length - 1) {
    store.dispatch({ type: 'RESTART_SONG',
                     currentSongId: store.getState().currentSongId });
  } else {
    store.dispatch( {type: 'NEXT_LYRIC',
                     currentSongId: store.getState().currentSongId });
  }
}

const selectSong = (newSongId) => {
  let action = {
    type: 'CHANGE_SONG',
    newSelectedSongId: newSongId
  }
  store.dispatch(action);
}

// SUBSCRIBE TO REDUX STORE
store.subscribe(renderLyrics);
