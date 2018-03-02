// LYRIC INFO
const songLyricsArray = "My mama called, seen you on TV, son Said shit done changed ever since we was on I dreamed it all ever since I was young They said I wouldn't be nothing Now they always say congratulations Worked so hard, forgot how to vacation They ain't never had the dedication People hatin', say we changed and look we made it Yeah, we made it".split(', ');

// INITIAL REDUX STATE
const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

//REDUX STORE
const { createStore } = Redux;
const store = createStore(reducer);
console.log(store.getState());

// CLICK LISTENER
const userClick = () => {
  console.log('clicked');
}
