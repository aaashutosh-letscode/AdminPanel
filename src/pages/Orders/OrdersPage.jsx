import React, { useState } from 'react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import SearchBar from '../../components/shared/SearchBar/SearchBar';
import Table from '../../components/common/Table/Table';
import Pagination from '../../components/common/Pagination/Pagination';
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge';
import { orderStats, orders } from '../../services/api';
import './OrdersPage.css';

const OrdersPage = () => {
  const [status, setStatus] = useState('all');
  const [payment, setPayment] = useState('all');

  const columns = [
    { key: 'id', title: 'Order ID', dataIndex: 'id' },
    { key: 'customer', title: 'Customer', dataIndex: 'customer' },
    { key: 'date', title: 'Date', dataIndex: 'date' },
    { key: 'amount', title: 'Amount', dataIndex: 'amount' },
    { key: 'payment', title: 'Payment', dataIndex: 'payment' },
    {
      key: 'status',
      title: 'Status',
      render: (row) => <StatusBadge label={row.status} variant={row.status === 'Completed' ? 'success' : row.status === 'Pending' ? 'warning' : row.status === 'Cancelled' ? 'danger' : 'default'} />
    },
    { key: 'actions', title: 'Actions', render: () => <button className="ghost-button">Details</button> }
  ];

  const filtered = orders.filter((order) =>
    (status === 'all' || order.status.toLowerCase() === status) && (payment === 'all' || order.payment.toLowerCase() === payment)
  );

  return (
    <div className="orders-page">
      <PageHeader title="Orders" subtitle="Review order performance, update status and inspect customer details in a unified panel." />
      <div className="orders-grid">
        <div className="orders-left">
          <div className="orders-stats">
            {orderStats.map((stat) => (
              <div key={stat.label} className="orders-stat-card" style={{ borderColor: stat.color }}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
          <div className="orders-controls">
            <SearchBar placeholder="Search orders" />
            <div className="orders-filters">
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select value={payment} onChange={(e) => setPayment(e.target.value)}>
                <option value="all">All Payments</option>
                <option value="card">Card</option>
                <option value="cash">Cash</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>
          </div>
          <div className="orders-table-card">
            <Table columns={columns} data={filtered} />
            <Pagination total={4} onPageChange={() => {}} />
          </div>
        </div>
        <aside className="orders-right-panel">
          <div className="order-detail-card">
            <div className="panel-headline">
              <span>Order Details</span>
              <strong>OR-2102</strong>
            </div>
            <div className="detail-grid">
              <div>
                <p className="detail-label">Customer</p>
                <p>Olivia M.</p>
              </div>
              <div>
                <p className="detail-label">Address</p>
                <p>742 Maple Street, San Francisco</p>
              </div>
            </div>
            <div className="detail-block">
              <p className="detail-label">Ordered Items</p>
              <ul>
                <li>Truffle Burger ×1</li>
                <li>Margherita Pizza ×1</li>
                <li>Cotton Candy Shake ×2</li>
              </ul>
            </div>
            <div className="summary-grid">
              <span>Subtotal</span>
              <strong>$176.70</strong>
            </div>
            <div className="summary-grid">
              <span>Delivery</span>
              <strong>$12.00</strong>
            </div>
            <div className="summary-grid total-row">
              <span>Total</span>
              <strong>$188.70</strong>
            </div>
            <div className="status-update">
              <label htmlFor="order-status">Update Status</label>
              <select id="order-status">
                <option>Pending</option>
                <option>Preparing</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="detail-note">
              <p>Payment: Card</p>
              <p>Transaction ID: TXN-9487</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrdersPage;
