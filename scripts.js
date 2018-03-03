// LYRIC INFO
const songLyricsArray = "My mama called, seen you on TV, son Said shit done changed ever since we was on I dreamed it all ever since I was young They said I wouldn't be nothing Now they always say congratulations Worked so hard, forgot how to vacation They ain't never had the dedication People hatin', say we changed and look we made it Yeah, we made it".split(', ');

// INITIAL REDUX STATE, SINGLE SOURCE OF TRUTH
const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

// REDUX REDUCER, REDUCER UPDATES STATE
const reducer = (state = initialState, action) => {
  // console.log(initialState);
  switch (action.type) {
    case 'NEXT_LYRIC':
    let newArrayPosition = state.arrayPosition + 1;
    let newState = {
      songLyricsArray: state.songLyricsArray,
      arrayPosition: newArrayPosition,
    }
    return newState;
  default:
    return state;
  }
}

// JEST TESTS + SETUP, JEST USES THE EXPECT LIBRARY
const { expect } = window;

// RUN TEST
expect(reducer(initialState, { type: null})).toEqual(initialState);

expect(reducer(initialState, {type: 'NEXT_LYRIC'})).toEqual({
  songLyricsArray: songLyricsArray,
  arrayPosition: 1
});

//REDUX STORE, SINGLE SOURCE OF TRUTH
const { createStore } = Redux;
const store = createStore(reducer);

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



// CLICK LISTENER
const userClick = () => {
  console.log('clicked');
}
