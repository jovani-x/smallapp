import { Row, Col, Card } from "antd";
import "antd/dist/antd.css";
import "./ResultList.scss";
import noimage from "./no-image.jpg";

const { Meta } = Card;

const ResultList = (props) => {
  const movieList = props.data.map((el) => {
    const coverItem = el.Poster === "N/A" ? noimage : el.Poster;

    return (
      <Col xs={24} sm={12} lg={8} key={el.imdbID}>
        <Card
          cover={<img alt={el.Title} src={coverItem} />}
          onClick={() => props.handleShowDetails(el.imdbID)}
        >
          <Meta
            title={
              el.Title
            } /*description={<ul><li>{el.Year}</li><li>{el.Type}</li></ul>}*/
          />
        </Card>
      </Col>
    );
  });

  return (
    <div className="result-list">
      <Row gutter={16}>{movieList}</Row>
    </div>
  );
};

export default ResultList;
