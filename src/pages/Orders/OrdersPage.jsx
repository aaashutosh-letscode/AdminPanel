import React, { useState } from 'react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import SearchBar from '../../components/shared/SearchBar/SearchBar';
import Table from '../../components/common/Table/Table';
import Pagination from '../../components/common/Pagination/Pagination';
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge';
import Modal from '../../components/common/Modal/Modal';
import { User, MapPin, List, DollarSign, ClipboardCheck, CreditCard } from 'lucide-react';
import { orderStats, orders } from '../../services/api';
import './OrdersPage.css';

const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  if (typeof value === 'number') {
    return formatter.format(value);
  }

  if (typeof value === 'string') {
    const numeric = Number(value.replace(/[^\\d.-]/g, ''));
    return Number.isNaN(numeric) ? value : formatter.format(numeric);
  }

  return value;
};

const statusVariant = (status) => {
  const normalized = String(status).toLowerCase();
  if (normalized === 'pending') return 'warning';
  if (normalized === 'confirmed' || normalized === 'completed' || normalized === 'delivered' || normalized === 'preparing') return 'success';
  if (normalized === 'cancelled') return 'danger';
  return 'default';
};

const orderDetails = {
  id: 'OR-2102',
  customer: 'Olivia M.',
  email: 'olivia.m@example.com',
  phone: '+91 98765 43210',
  address: {
    line1: '742 Maple Street',
    line2: 'San Francisco, CA 94107',
    country: 'India'
  },
  items: [
    { name: 'Truffle Burger', qty: 1, amount: 895.5 },
    { name: 'Margherita Pizza', qty: 1, amount: 520 },
    { name: 'Cotton Candy Shake', qty: 2, amount: 452 }
  ],
  subtotal: 1868,
  delivery: 120,
  discount: 0,
  total: 1988,
  status: 'Pending',
  paymentMethod: 'Card',
  transactionId: 'TXN-9487'
};

const OrdersPage = () => {
  const [status, setStatus] = useState('all');
  const [payment, setPayment] = useState('all');
  const [orderStatus, setOrderStatus] = useState(orderDetails.status);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const columns = [
    { key: 'id', title: 'Order ID', dataIndex: 'id' },
    { key: 'customer', title: 'Customer', dataIndex: 'customer' },
    { key: 'date', title: 'Date', dataIndex: 'date' },
    {
      key: 'amount',
      title: 'Amount',
      render: (row) => <span>{formatCurrency(row.amount)}</span>,
      align: 'right'
    },
    { key: 'payment', title: 'Payment', dataIndex: 'payment' },
    {
      key: 'status',
      title: 'Status',
      render: (row) => <StatusBadge label={row.status} variant={statusVariant(row.status)} />
    },
    {
      key: 'actions',
      title: 'Actions',
      render: () => (
        <button className="ghost-button small" type="button" onClick={() => setDetailsOpen(true)}>
          View
        </button>
      )
    }
  ];

  const filtered = orders.filter((order) =>
    (status === 'all' || order.status.toLowerCase() === status) && (payment === 'all' || order.payment.toLowerCase() === payment)
  );

  const itemsCount = orderDetails.items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="orders-page">
      <PageHeader title="Orders" subtitle="Review orders quickly and surface full order context only when needed." />

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
                <option value="preparing">Preparing</option>
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
            <div className="table-card-header">
              <div>
                <span className="table-card-label">Orders</span>
                <h3>Active restaurant requests</h3>
              </div>
              <button type="button" className="secondary-button small" onClick={() => setDetailsOpen(true)}>
                View sample details
              </button>
            </div>
            <Table columns={columns} data={filtered} />
            <Pagination total={4} onPageChange={() => {}} />
          </div>
        </div>

        <aside className="orders-right-panel">
          <div className="compact-order-card">
            <div className="compact-header">
              <div>
                <span className="section-label">Order ID</span>
                <strong>{orderDetails.id}</strong>
              </div>
              <StatusBadge label={orderStatus} variant={statusVariant(orderStatus)} />
            </div>

            <div className="compact-grid">
              <div className="compact-item">
                <span className="section-label">Customer</span>
                <strong>{orderDetails.customer}</strong>
                <p>{orderDetails.phone}</p>
              </div>
              <div className="compact-item">
                <span className="section-label">Address</span>
                <strong>{orderDetails.address.line1}</strong>
                <p>{orderDetails.address.line2}</p>
              </div>
              <div className="compact-item">
                <span className="section-label">Items</span>
                <strong>{itemsCount} items</strong>
              </div>
              <div className="compact-item">
                <span className="section-label">Amount</span>
                <strong>{formatCurrency(orderDetails.total)}</strong>
              </div>
              <div className="compact-item">
                <span className="section-label">Payment</span>
                <strong>{orderDetails.paymentMethod}</strong>
              </div>
            </div>

            <div className="section-divider" />

            <div className="status-update compact-status">
              <label htmlFor="order-status">Update status</label>
              <select id="order-status" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
                <option>Pending</option>
                <option>Preparing</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <button className="primary-button full-width" type="button" onClick={() => setDetailsOpen(true)}>
              View Full Details
            </button>
          </div>
        </aside>
      </div>

      <div className="mobile-order-summary">
        <div className="mobile-summary-row">
          <div>
            <span>Order ID</span>
            <strong>{orderDetails.id}</strong>
          </div>
          <StatusBadge label={orderStatus} variant={statusVariant(orderStatus)} />
        </div>
        <div className="mobile-summary-grid">
          <div>
            <p className="section-label">Customer</p>
            <strong>{orderDetails.customer}</strong>
            <p>{orderDetails.phone}</p>
          </div>
          <div>
            <p className="section-label">Amount</p>
            <strong>{formatCurrency(orderDetails.total)}</strong>
          </div>
        </div>
        <button className="primary-button full-width" type="button" onClick={() => setDetailsOpen(true)}>
          View Full Details
        </button>
      </div>

      <Modal open={detailsOpen} title={`Order ${orderDetails.id} details`} onClose={() => setDetailsOpen(false)}>
        <div className="modal-order-summary">
          <div className="modal-order-row">
            <div>
              <span className="section-label">Customer</span>
              <strong>{orderDetails.customer}</strong>
              <p>{orderDetails.email}</p>
              <p>{orderDetails.phone}</p>
            </div>
            <StatusBadge label={orderStatus} variant={statusVariant(orderStatus)} />
          </div>
          <div className="modal-section">
            <span className="section-label">Delivery Address</span>
            <p>{orderDetails.address.line1}</p>
            <p>{orderDetails.address.line2}</p>
            <p>{orderDetails.address.country}</p>
          </div>
          <div className="modal-section">
            <div className="modal-section-header">
              <span>Items</span>
              <p>{itemsCount} items</p>
            </div>
            <ul className="modal-item-list">
              {orderDetails.items.map((item) => (
                <li key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>Qty {item.qty}</p>
                  </div>
                  <span>{formatCurrency(item.amount)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-summary-card">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatCurrency(orderDetails.subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <strong>{formatCurrency(orderDetails.delivery)}</strong>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <strong>{formatCurrency(orderDetails.discount)}</strong>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <strong>{formatCurrency(orderDetails.total)}</strong>
            </div>
          </div>
          <div className="modal-section">
            <span className="section-label">Payment</span>
            <p>{orderDetails.paymentMethod}</p>
            <p className="info-label">Transaction ID</p>
            <p>{orderDetails.transactionId}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrdersPage;
