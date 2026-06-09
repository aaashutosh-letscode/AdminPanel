import React, { useState } from 'react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import SearchBar from '../../components/shared/SearchBar/SearchBar';
import Table from '../../components/common/Table/Table';
import Pagination from '../../components/common/Pagination/Pagination';
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge';
import { User, MapPin, ShoppingBag, CreditCard, ClipboardList, Receipt } from 'lucide-react';
import { orderStats, orders } from '../../services/api';
import './OrdersPage.css';

const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  if (typeof value === 'number') return formatter.format(value);

  if (typeof value === 'string') {
    const numeric = Number(value.replace(/[^\d.-]/g, ''));
    return Number.isNaN(numeric) ? value : formatter.format(numeric);
  }

  return value;
};

const statusVariant = (status) => {
  const n = String(status).toLowerCase();
  if (n === 'pending') return 'warning';
  if (['confirmed', 'completed', 'delivered', 'preparing'].includes(n)) return 'success';
  if (n === 'cancelled') return 'danger';
  return 'default';
};

const OrdersPage = () => {
  const [status, setStatus] = useState('all');
  const [payment, setPayment] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setOrderStatus(order.status);
  };

  const columns = [
    {
      key: 'id',
      title: 'Order ID',
      render: (row) => (
        <span className={selectedOrder?.id === row.id ? 'order-id-active' : ''}>
          {row.id}
        </span>
      )
    },
    { key: 'customer', title: 'Customer', dataIndex: 'customer' },
    { key: 'date', title: 'Date', dataIndex: 'date' },
    {
      key: 'amount',
      title: 'Amount',
      render: (row) => <span>{row.amount}</span>,
      align: 'right'
    },
    { key: 'payment', title: 'Payment', dataIndex: 'payment' },
    {
      key: 'status',
      title: 'Status',
      render: (row) => <StatusBadge label={row.status} variant={statusVariant(row.status)} />
    }
  ];

  const filtered = orders.filter((order) =>
    (status === 'all' || order.status.toLowerCase() === status) &&
    (payment === 'all' || order.payment.toLowerCase() === payment)
  );

  return (
    <div className="orders-page">
      <PageHeader title="Orders" subtitle="Track and manage all restaurant orders." />

      <div className="orders-grid">
        {/* ── Left: Stats + Controls + Table ── */}
        <div className="orders-left">
          <div className="orders-stats">
            {orderStats.map((stat) => (
              <div key={stat.label} className="orders-stat-card" style={{ borderLeftColor: stat.color }}>
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
            <Table columns={columns} data={filtered} onView={handleSelectOrder} />
            <Pagination total={4} onPageChange={() => {}} />
          </div>
        </div>

        {/* ── Right: Order Details Panel ── */}
        <aside className="orders-right-panel">
          <div className="order-panel">
            <div className="panel-header">
              <h3>Order Details</h3>
            </div>

            {!selectedOrder ? (
              <div className="panel-empty">
                <ClipboardList className="panel-empty-icon" />
                <p className="panel-empty-title">No order selected</p>
                <p className="panel-empty-desc">Click the view icon on any order to see details</p>
              </div>
            ) : (
              <>
                {/* ID + Status */}
                <div className="panel-section">
                  <div className="panel-order-header">
                    <span className="panel-order-id">{selectedOrder.id}</span>
                    <StatusBadge label={orderStatus} variant={statusVariant(orderStatus)} />
                  </div>
                </div>

                {/* Customer */}
                <div className="panel-section">
                  <div className="panel-section-title">
                    <User size={12} />
                    <span>Customer</span>
                  </div>
                  <p className="panel-field-value">{selectedOrder.customer}</p>
                  <p className="panel-field-sub">{selectedOrder.email}</p>
                  <p className="panel-field-sub">{selectedOrder.phone}</p>
                </div>

                {/* Address */}
                <div className="panel-section">
                  <div className="panel-section-title">
                    <MapPin size={12} />
                    <span>Delivery Address</span>
                  </div>
                  <p className="panel-field-value">{selectedOrder.address.line1}</p>
                  <p className="panel-field-sub">{selectedOrder.address.line2}</p>
                </div>

                {/* Items */}
                <div className="panel-section">
                  <div className="panel-section-title">
                    <ShoppingBag size={12} />
                    <span>Items</span>
                  </div>
                  <div className="panel-items">
                    {selectedOrder.items.map((item) => (
                      <div key={item.name} className="panel-item-row">
                        <span className="panel-item-name">{item.name}</span>
                        <span className="panel-item-qty">×{item.qty}</span>
                        <span className="panel-item-price">{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="panel-section">
                  <div className="panel-section-title">
                    <Receipt size={12} />
                    <span>Summary</span>
                  </div>
                  <div className="panel-summary">
                    <div className="panel-summary-row">
                      <span>Subtotal</span>
                      <span>{formatCurrency(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="panel-summary-row">
                      <span>Delivery</span>
                      <span>{formatCurrency(selectedOrder.delivery)}</span>
                    </div>
                    <div className="panel-summary-row panel-summary-total">
                      <span>Total</span>
                      <span>{formatCurrency(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="panel-section">
                  <div className="panel-section-title">
                    <CreditCard size={12} />
                    <span>Payment</span>
                  </div>
                  <div className="panel-field-row">
                    <span className="panel-field-label">Method</span>
                    <span className="panel-field-value">{selectedOrder.payment}</span>
                  </div>
                  <div className="panel-field-row">
                    <span className="panel-field-label">Transaction</span>
                    <span className="panel-field-value">{selectedOrder.transactionId}</span>
                  </div>
                </div>

                {/* Status Update */}
                <div className="panel-section">
                  <label className="panel-status-label" htmlFor="panel-order-status">Update Status</label>
                  <select
                    id="panel-order-status"
                    className="panel-status-select"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OrdersPage;
