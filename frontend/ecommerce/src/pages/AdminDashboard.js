import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form } from 'react-bootstrap';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
import { getAllOrders, updateOrderStatus } from '../services/orderService';
import { getAllUsers, createUser, updateUser } from '../services/userService';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setProducts(await getProducts());
    setCategories(await getCategories());
    setOrders(await getAllOrders());
    setUsers(await getAllUsers());
  };

  const handleShowModal = (type, item = {}) => {
    setModalType(type);
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (modalType === 'product') {
      if (currentItem.id) {
        await updateProduct(currentItem.id, currentItem);
      } else {
        await createProduct(currentItem);
      }
    } else if (modalType === 'category') {
      if (currentItem.id) {
        await updateCategory(currentItem.id, currentItem);
      } else {
        await createCategory(currentItem);
      }
    } else if (modalType === 'user') {
      if (currentItem.id) {
        await updateUser(currentItem.id, currentItem);
      } else {
        await createUser(currentItem);
      }
    }
    setShowModal(false);
    fetchData();
  };

  const handleDelete = async (type, id) => {
    if (type === 'product') await deleteProduct(id);
    else if (type === 'category') await deleteCategory(id);
    fetchData();
  };

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    fetchData();
  };

  // Statistics
  const stats = {
    totalUsers: users.length,
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
  };

  return (
    <Container>
      <h2>Admin Dashboard</h2>
      <Row>
        <Col md={3}><Card><Card.Body><Card.Title>Users</Card.Title><h3>{stats.totalUsers}</h3></Card.Body></Card></Col>
        <Col md={3}><Card><Card.Body><Card.Title>Products</Card.Title><h3>{stats.totalProducts}</h3></Card.Body></Card></Col>
        <Col md={3}><Card><Card.Body><Card.Title>Orders</Card.Title><h3>{stats.totalOrders}</h3></Card.Body></Card></Col>
        <Col md={3}><Card><Card.Body><Card.Title>Revenue</Card.Title><h3>${stats.totalRevenue}</h3></Card.Body></Card></Col>
      </Row>

      <h3>Products</h3>
      <Button onClick={() => handleShowModal('product')}>Add Product</Button>
      <Table striped bordered hover>
        <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.name}</td><td>${p.price}</td>
              <td>
                <Button onClick={() => handleShowModal('product', p)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete('product', p.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Categories</h3>
      <Button onClick={() => handleShowModal('category')}>Add Category</Button>
      <Table striped bordered hover>
        <thead><tr><th>ID</th><th>Name</th><th>Actions</th></tr></thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.name}</td>
              <td>
                <Button onClick={() => handleShowModal('category', c)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete('category', c.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Orders</h3>
      <Table striped bordered hover>
        <thead><tr><th>ID</th><th>User ID</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td><td>{o.user_id}</td><td>${o.total}</td><td>{o.status}</td>
              <td>
                <Form.Select onChange={(e) => handleStatusChange(o.id, e.target.value)} value={o.status}>
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Users</h3>
      <Button onClick={() => handleShowModal('user')}>Add User</Button>
      <Table striped bordered hover>
        <thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td><td>{u.username}</td><td>{u.email}</td><td>{u.role}</td>
              <td>
                <Button onClick={() => handleShowModal('user', u)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem.id ? 'Edit' : 'Add'} {modalType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {modalType === 'user' ? (
              <>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control value={currentItem.username || ''} onChange={(e) => setCurrentItem({ ...currentItem, username: e.target.value })} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={currentItem.email || ''} onChange={(e) => setCurrentItem({ ...currentItem, email: e.target.value })} />
                </Form.Group>
                {!currentItem.id && (
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={currentItem.password || ''} onChange={(e) => setCurrentItem({ ...currentItem, password: e.target.value })} />
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select value={currentItem.role || 'user'} onChange={(e) => setCurrentItem({ ...currentItem, role: e.target.value })}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control value={currentItem.name || ''} onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} />
                </Form.Group>
                {modalType === 'product' ? (
                  <>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control value={currentItem.description || ''} onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Price</Form.Label>
                      <Form.Control type="number" value={currentItem.price || ''} onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Stock</Form.Label>
                      <Form.Control type="number" value={currentItem.stock || ''} onChange={(e) => setCurrentItem({ ...currentItem, stock: e.target.value })} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Category ID</Form.Label>
                      <Form.Control value={currentItem.category_id || ''} onChange={(e) => setCurrentItem({ ...currentItem, category_id: e.target.value })} />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Image URL</Form.Label>
                      <Form.Control value={currentItem.image_url || ''} onChange={(e) => setCurrentItem({ ...currentItem, image_url: e.target.value })} />
                    </Form.Group>
                  </>
                ) : (
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control value={currentItem.description || ''} onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })} />
                  </Form.Group>
                )}
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;