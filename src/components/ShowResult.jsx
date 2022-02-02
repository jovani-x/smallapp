import { Result } from 'antd';
import ResultList from './ResultList';

const ShowResult = (props) => {
  return (
    props.isWelcome 
      ? <Result title="Welcome. Try find some movie." /> 
      : props.movieList.length === 0
        ? <Result status="warning" title="There is no items. Please, try again." />
        : <ResultList data={props.movieList} handleShowDetails={props.handleShowDetails} />
  )
}

export default ShowResult;
