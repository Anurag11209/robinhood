// https://github.com/lxndroc/react-robinhood-clone
// Reference: youtube.com/watch?v=TxggrQ0nHjY

import './App.css';
import Header from './Header';
import NewsFeed from './Newsfeed';
import Stats from './Stats';

function App() {
  return (
    <div className='app'>
      {/* Header Component */}
      <div className='app__header'>
        <Header />
      </div>
      {/* Body */}
      <div className='app__body'>
        <div className='app__container'>
          <NewsFeed />
          <Stats />
        </div>
      </div>
    </div>
  );
}

export default App;
