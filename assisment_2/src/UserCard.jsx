import React from 'react';
import { Card } from 'antd';

const UserCard = ({ user }) => (
  <Card
    cover={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, background: '#f5f5f5' }}>
        <img
          alt={user.username}
          src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
          style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'contain' }}
          onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/180x180?text=No+Avatar'; }}
        />
      </div>
    }
    title={user.name || 'No Name'}
    bordered={false}
  >
    <p><b>Email:</b> {user.email || 'N/A'}</p>
    <p><b>Phone:</b> {user.phone || 'N/A'}</p>
    <p><b>Address:</b> {user.address ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}` : 'N/A'}</p>
    <p><b>Website:</b> {user.website ? <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a> : 'N/A'}</p>
    <p><b>Company:</b> {user.company?.name || 'N/A'}</p>
  </Card>
);

export default UserCard;
