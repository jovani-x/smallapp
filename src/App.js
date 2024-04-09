import { Layout, Row, Col, Card, Modal, List } from 'antd';
import 'antd/dist/antd.css';
import './App.scss';
import SearchForm from './components/SearchForm';
import ShowResult from './components/ShowResult';

import { useState } from 'react';

const { Content } = Layout;

function App() {
	const api_url = 'https://www.omdbapi.com/?';
	const api_key = process.env.REACT_APP_OMDBAPI_API_KEY;

	const [movieList, setMovieList] = useState([]);
	const [isWelcome, setIsWelcome] = useState(true);
	const [selectedMovie, setSelectedMovie] = useState(null);

	const handleFormFinish = (_name, { values }) => {
		const movieParams = {};

		Object.keys(values).map((key) => {
			if (key === 'title') {
				movieParams.movieTitle = values[key];
			} else if (key === 'year') {
				movieParams.movieYear = values[key];
			}
		});

		findMovie(movieParams);
	}

	async function findMovie({ movieTitle, movieYear }) {
		const title = movieTitle ? `s=${movieTitle}&` : '';
		const year = movieYear ? `y=${movieYear}&` : '';
		const queryStr = `${api_url}${title}${year}plot=full&apikey=${api_key}`;

		if (title === '' && year === '') {
			setIsWelcome(true);
		} else {
			await fetch(queryStr)
				.then(response => response.json())
				.then(data => {
					if (data.Response === 'False') {
						setMovieList([]);
					} else if (data.Search) {
						// data.Search
						// { Title, Poster, Type, Year, imdbID }
						setMovieList(data.Search);
					}
				});
			setIsWelcome(false);
		}
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
			<Layout style={{ minHeight: "100vh" }}>
				<Content>
					<Card title="Find Movie">
						<Row justify="center">
							<Col span={24}>
								<SearchForm onValuesChanged={handleFormFinish} />
							</Col>
						</Row>
					</Card>
				</Content>
				<Content>
					<Row justify="center">
						<Col xs={15} xxl={12}>
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
