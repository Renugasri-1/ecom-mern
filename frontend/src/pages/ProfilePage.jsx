import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch profile.");
        setLoading(false);
      });
  }, []);

  if (error) return <p className='error-text'>{error}</p>;
  if (loading) return <p className='loading-text'>Loading your profile...</p>;

  return (
    <div className="profile-container">
      <h2 className='profile-title'>Welcome, {profile.name}</h2>
      <p className='profile-email'>Email: {profile.email}</p>
      <div className="profile-section">
        <h3>Past Orders</h3>
        {profile.orders && profile.orders.length > 0 ? (
          <ul className="orders-list">
            {profile.orders.map((order, index) => (
              <li key={index}>
                <strong>{order.itemName}</strong> - {order.date} - ₹{order.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No past orders found.</p>
        )}
      </div>

      <div className="profile-section">
        <h3>Payment Method</h3>
        <p>{profile.paymentMethod || "No payment method saved."}</p>
      </div>

    </div>
  );
};

export default ProfilePage;
