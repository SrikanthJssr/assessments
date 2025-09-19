import React from 'react';
import { Card, Button } from 'antd';
import { InfoCircleOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, HomeOutlined, ApartmentOutlined } from '@ant-design/icons';
import './UserCard.css';

const UserCard = ({ user, onView }) => (
  <Card
    className="user-card"
    cover={
      <img
        className="user-avatar"
        alt={user.username}
        src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
        onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/80x80?text=No+Avatar'; }}
      />
    }
    actions={[
      <Button type="primary" icon={<InfoCircleOutlined />} onClick={() => onView(user)}>
        View Details
      </Button>
    ]}
    bordered={false}
  >
    <div className="user-info">
      <p><MailOutlined /> <b>Email:</b> {user.email || 'N/A'}</p>
      <p><PhoneOutlined /> <b>Phone:</b> {user.phone || 'N/A'}</p>
      <p><ApartmentOutlined /> <b>Company:</b> {user.company?.name || 'N/A'}</p>
      <p><GlobalOutlined /> <b>Website:</b> {user.website ? <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a> : 'N/A'}</p>
      <p><HomeOutlined /> <b>Address:</b> {user.address ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}` : 'N/A'}</p>
    </div>
  </Card>
);

export default UserCard;
