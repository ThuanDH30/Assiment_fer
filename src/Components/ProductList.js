import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Table, Container, Row, Col, Alert, Modal } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        currentPrice: '',
        image: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                setProducts(response.data);
            } catch (error) {
                setError('Failed to fetch products.');
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/products', newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ name: '', description: '', price: '', currentPrice: '', image: '' });
        } catch (error) {
            setError('Failed to add product.');
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/products/${id}`);
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            setError('Failed to delete product.');
        }
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct({ ...editingProduct, [name]: value });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/products/${editingProduct.id}`, editingProduct);
            setProducts(products.map((product) => (product.id === editingProduct.id ? response.data : product)));
            setEditingProduct(null);
        } catch (error) {
            setError('Failed to update product.');
        }
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1>Add Product</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleAddProduct}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newProduct.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={newProduct.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="currentPrice">
                            <Form.Label>Current Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="currentPrice"
                                placeholder="Current Price"
                                value={newProduct.currentPrice}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                placeholder="Image"
                                value={newProduct.image}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Add Product
                        </Button>
                    </Form>
                </Col>
            </Row>

            <h1>Product List</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Current Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => (
                    <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price} đ</td>
                        <td>{product.currentPrice} đ</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEditClick(product)}>
                                Edit
                            </Button>{' '}
                            <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {editingProduct && (
                <Modal show={true} onHide={handleCancelEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleUpdateProduct}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={editingProduct.name}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    value={editingProduct.description}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    placeholder="Price"
                                    value={editingProduct.price}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="currentPrice">
                                <Form.Label>Current Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="currentPrice"
                                    placeholder="Current Price"
                                    value={editingProduct.currentPrice}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="image"
                                    placeholder="Image"
                                    value={editingProduct.image}
                                    onChange={handleEditInputChange}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3">
                                Update Product
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancelEdit}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default ProductList;
