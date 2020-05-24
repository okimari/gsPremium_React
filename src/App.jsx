import React from 'react';
import Booklist from './components/Booklist';	// 追加（コンポーネントのimport）
import { BrowserRouter, Route, Link } from 'react-router-dom';  // 追加
import axios from 'axios';

const App = () => {
  const languages = ['React', 'Vue', 'Angular'];

  // 関数の内容
  const getDataFromAPI = async keyword => {
    const requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:';
    const result = await axios.get(`${requestUrl}${keyword}`);
    return result;
  }
  return (
    <BrowserRouter>
      <div>
        <h1>react app</h1>
        <ul>
          <li><Link to='/'>React</Link></li>
          <li><Link to='/Vue'>Vue</Link></li>
          <li><Link to='/angular'>Angular</Link></li>
        </ul>
        {/* 変数を記述したいときは{}を記述する */}
        <Route
          exact
          path='/'
          render={props =>
            <Booklist language={languages[0]}
              getData={keyword => getDataFromAPI(keyword)}
            />
          }
        />

        <Route
          path='/Vue'
          render={props =>
            <Booklist language={languages[1]}
              getData={keyword => getDataFromAPI(keyword)}
            />
          }
        />
        <Route
          path='/angular'
          render={props =>
            <Booklist language={languages[2]}
              getData={keyword => getDataFromAPI(keyword)}
            />
          }
        />
      </div>
    </BrowserRouter>
  );
}
export default App;