import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Image, Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${match.params.id}`
      );
      setProduct(data);
    };
    fetchProduct();
  }, [match]);

  return (
    <>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : {product.price}</ListGroup.Item>
            <ListGroup.Item>Price : {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup.Item variant="flush">
              <Row>
                <Col>Price :</Col>
                <Col>
                  <strong>{product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item variant="flush">
              <Row>
                <Col>Status :</Col>
                <Col>
                  <strong>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item variant="flush">
              <Button
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
