import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container, Spinner, Alert, Modal, Button } from 'react-bootstrap';

const ProductCard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch products.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setShowModal(false);
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <Row className="mt-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Col key={product.id} md={6} lg={4} className="mb-4">
                            <Card onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
                                {product.image && <Card.Img variant="top" src={`/images/${product.image}`} alt={product.name} />}
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Card.Text>Price: {product.price} đ</Card.Text>
                                    <Card.Text>Current Price: {product.currentPrice} đ</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Alert variant="info">No products available.</Alert>
                    </Col>
                )}
            </Row>

            {/* Modal for Product Details */}
            <Modal show={showModal} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProduct && selectedProduct.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <>
                            <img src={`/images/${selectedProduct.image}`} alt={selectedProduct.name} style={{ maxWidth: '100%', marginBottom: '1rem' }} />
                            <p>{selectedProduct.description}</p>
                            <p>Price: {selectedProduct.price} đ</p>
                            <p>Current Price: {selectedProduct.currentPrice} đ</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProductCard;
