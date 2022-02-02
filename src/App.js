import { Layout, Row, Col, Card, Modal, List } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import SearchForm from './components/SearchForm';
import ShowResult from './components/ShowResult';

import { useState, useEffect } from 'react';

const { Content } = Layout;

function App() {
  const api_url = 'http://www.omdbapi.com/?';
  const api_key = process.env.REACT_APP_OMDBAPI_API_KEY;

  const [movieList, setMovieList] = useState([]);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [isWelcome, setIsWelcome] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    const queryStr = `${api_url}${title}${year}plot=full&apikey=${api_key}`;

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

  const handleShowDetails = (imdbID) => {
    const queryStr = `${api_url}i=${imdbID}&plot=full&apikey=${api_key}`;
    fetch(queryStr)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'False') {
          setSelectedMovie(null);
        } else {
          setSelectedMovie(data);
        }
      });
  }

  const getMovieDetails = (data) => {
    if (!data) return null;

    return Object
      .keys(data)
      .filter((key) => {
        return (
          key !== 'Poster' 
          && key !== 'Ratings' 
          && key !== 'imdbID' 
          && key !== 'Response' 
          && key !== 'Rated'
          && key !== 'Metascore'
          && key !== 'Title'
        );
      })
      .map((key) => {
        return {
          name: key,
          value: data[key]
        };
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
              <ShowResult movieList={movieList} isWelcome={isWelcome} handleShowDetails={handleShowDetails} />
              <Modal
                title={selectedMovie ? selectedMovie.Title : ''}
                visible={selectedMovie}
                onCancel={() => setSelectedMovie(null)}
                footer={null}
              >
                <List 
                  dataSource={getMovieDetails(selectedMovie)} 
                  renderItem={item => <List.Item><strong>{item.name}: </strong>{item.value}</List.Item>}
                />
              </Modal>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default App;
