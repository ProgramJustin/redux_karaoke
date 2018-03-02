// LYRIC INFO
const songLyricsArray = "My mama called, seen you on TV, son Said shit done changed ever since we was on I dreamed it all ever since I was young They said I wouldn't be nothing Now they always say congratulations Worked so hard, forgot how to vacation They ain't never had the dedication People hatin', say we changed and look we made it Yeah, we made it".split(', ');

// INITIAL REDUX STATE
const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

// REDUCER
const reducer = (state = initialState, action) => {
  return state;
}

// JEST TESTS + SETUP, JEST USES THE EXPECT LIBRARY
// Expect library as a object belonging to window. Unique, huh!? But this is only when using the CDN. We won't need to do this when we later install Jest through npm.
const { expect } = window;

expect(reducer(initialState, { type: null})).toEqual(initialState);

// testing that our reducer has a NEXT_LYRIC action type that can advance the arrayPosition slice of our state
expect(reducer(initialState, { type: 'NEXT_LYRIC'})).toEqual({
  songLyricsArray: songLyricsArray,
  arrayPosition: 1
});

//REDUX STORE
const { createStore } = Redux;
const store = createStore(reducer);
console.log(store.getState());

// CLICK LISTENER
const userClick = () => {
  console.log('clicked');
}
