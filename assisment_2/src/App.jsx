import React, { useEffect, useState } from 'react';
import { Spin, Row, Col, Modal } from 'antd';
import 'antd/dist/reset.css';
import './App.css';
import UserCard from './components/UserCard';
import { MailOutlined, PhoneOutlined, GlobalOutlined, HomeOutlined, ApartmentOutlined } from '@ant-design/icons';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto', minHeight: '100vh' }}>
      <Row gutter={[24, 24]} justify="center">
        {users.map(user => (
          <Col
            xs={24} sm={12} md={8} lg={6} xl={6}
            key={user.id}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <UserCard user={user} onView={handleViewDetails} />
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedUser?.name}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
        bodyStyle={{ padding: 24 }}
        className="modal-user-card"
      >
        {selectedUser && (
          <div className="user-card" style={{ maxWidth: 320, margin: '0 auto', boxShadow: 'none', minHeight: 'unset', padding: 0 }}>
            <img
              className="user-avatar"
              src={`https://avatars.dicebear.com/v2/avataaars/${selectedUser.username}.svg?options[mood][]=happy`}
              alt={selectedUser.username}
              onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/80x80?text=No+Avatar'; }}
            />
            <div className="user-info">
              <p><MailOutlined /> <b>Email:</b> {selectedUser.email || 'N/A'}</p>
              <p><PhoneOutlined /> <b>Phone:</b> {selectedUser.phone || 'N/A'}</p>
              <p><ApartmentOutlined /> <b>Company:</b> {selectedUser.company?.name || 'N/A'}</p>
              <p><GlobalOutlined /> <b>Website:</b> {selectedUser.website ? <a href={`http://${selectedUser.website}`} target="_blank" rel="noopener noreferrer">{selectedUser.website}</a> : 'N/A'}</p>
              <p><HomeOutlined /> <b>Address:</b> {selectedUser.address ? `${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}, ${selectedUser.address.zipcode}` : 'N/A'}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
