import React, { useEffect } from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth';
import { FaUserEdit, FaHistory, FaShoppingCart } from 'react-icons/fa';
import { getOrders } from '../api/ApiOrder';

const Dashboard = () => {
    useEffect(() => {
        getOrders().then((res) => {
        console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        }
        );

    }, []);

  const { name, email, role } = userInfo();

  const UserLinks = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header bg-primary text-white">User Links</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              <FaShoppingCart className="mr-2" /> My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/profile/update">
              <FaUserEdit className="mr-2" /> Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const PurchaseHistory = () => (
    <div className="card mb-4">
      <h3 className="card-header bg-primary text-white">
        <FaHistory className="mr-2" /> Purchase History
      </h3>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">History</li>
      </ul>
    </div>
  );

  const UserInfo = () => (
    <div className="card mb-4">
      <div className="card-body d-flex align-items-center">
        <img
          src="https://via.placeholder.com/150x100"
          alt="user"
          className="rounded-circle w-20 h-auto"
        />
        <div className="pl-4">
          <h3>{name}</h3>
          <p>{email}</p>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <Layout title="Dashboard" className="container-fluid mx-auto px-8 md:px-16">
      <div className="row py-8 md:py-16">
        <div className="col-md-3">
          <UserLinks />
        </div>
        <div className="col-md-9">
          <UserInfo />
          <PurchaseHistory />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;