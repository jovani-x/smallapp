import { Layout, Row, Col, Card } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import SearchForm from './components/SearchForm';
import ShowResult from './components/ShowResult';

import { useState, useEffect } from 'react';

const { Content } = Layout;

function App() {
  const api_key = process.env.REACT_APP_OMDBAPI_API_KEY;

  const [movieList, setMovieList] = useState([]);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [isWelcome, setIsWelcome] = useState(true);

  const handleFormFinish = (name, { values }) => {
    Object.keys(values).map((key) => {
      if (key === 'title') {
        setMovieTitle( values[key] );
      } else if (key === 'year') {
        setMovieYear( values[key] );
      }
    });

    if (isWelcome && movieList.length === 0) {
      setIsWelcome(false);
    }
  }

  useEffect( findMovie, [movieTitle, movieYear] );

  function findMovie() {
    const title = movieTitle ? `s=${movieTitle}&` : '';
    const year = movieYear ? `y=${movieYear}&` : '';
    const queryStr = `http://www.omdbapi.com/?${title}${year}plot=full&apikey=${api_key}`;

    fetch(queryStr)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'False') {
          setMovieList( [] );
        } else if (data.Search) {
          // data.Search
          // { Title, Poster, Type, Year, imdbID }
          setMovieList( data.Search );
        }
      });
  }

  return (
    <>
      <Layout style={{minHeight:"100vh"}}>
        <Content>
          <Card title="Find Movie">
            <Row justify="center">
              <Col span={12}>
                <SearchForm onValuesChanged={handleFormFinish} />
              </Col>
            </Row>
          </Card>
        </Content>
        <Content>
          <Row justify="center">
            <Col span={15}>
              <ShowResult movieList={movieList} isWelcome={isWelcome} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default App;
