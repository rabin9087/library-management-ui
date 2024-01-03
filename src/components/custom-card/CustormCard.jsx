import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const CustomeCard = ({ thumbnail, name, author, publishYear }) => {
  return (
    <Card style={{ width: "18rem" }} className="shadow-lg flex-grow-1">
      <Card.Img
        variant="top"
        src={thumbnail}
        height={"280px"}
        className="p-2"
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {author} - {publishYear}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
