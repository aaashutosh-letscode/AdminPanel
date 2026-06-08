import React from 'react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import StatCard from '../../components/shared/StatCard/StatCard';
import ChartCard from '../../components/shared/ChartCard/ChartCard';
import Table from '../../components/common/Table/Table';
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge';
import { dashboardStats, recentOrders } from '../../services/api';
import './DashboardPage.css';

const DashboardPage = () => {
  const orderColumns = [
    { key: 'id', title: 'Order ID', dataIndex: 'id' },
    { key: 'customer', title: 'Customer', dataIndex: 'customer' },
    { key: 'date', title: 'Date', dataIndex: 'date' },
    { key: 'amount', title: 'Amount', dataIndex: 'amount' },
    { key: 'payment', title: 'Payment', dataIndex: 'payment' },
    {
      key: 'status',
      title: 'Status',
      render: (row) => <StatusBadge label={row.status} variant={row.status === 'Delivered' ? 'success' : row.status === 'Pending' ? 'warning' : row.status === 'Cancelled' ? 'danger' : 'default'} />
    }
  ];

  return (
    <div className="dashboard-page">
      <PageHeader title="Dashboard" subtitle="Monitor core operations, orders and campaign health from one premium admin console." />
      <div className="dashboard-grid">
        <div className="dashboard-left">
          <div className="stats-row">
            {dashboardStats.map((stat) => (
              <StatCard key={stat.label} title={stat.label} value={stat.value} badge={stat.change} color={stat.color} detail={stat.trend === 'up' ? 'Growth over last 24 hours' : 'Recent change in performance'} />
            ))}
          </div>
          <div className="dashboard-cards">
            <div className="sales-card">
              <div className="card-title-row">
                <div>
                  <span>Recent Orders</span>
                  <h2>Latest restaurant bookings</h2>
                </div>
                <button type="button" className="secondary-button">View all</button>
              </div>
              <Table columns={orderColumns} data={recentOrders} />
            </div>
            <div className="insights-row">
              <ChartCard title="Order Status" value="82%" chartLabel="Doughnut" percent={82} progress={82} />
              <div className="completion-card">
                <div className="completion-top">
                  <span>Completion Rate</span>
                  <strong>94%</strong>
                </div>
                <p>Operations efficiency from accepted orders and fulfilled deliveries.</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '94%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="dashboard-right-panel">
          <div className="right-panel-card">
            <div className="panel-heading">
              <span>Performance</span>
              <strong>Daily snapshot</strong>
            </div>
            <div className="stat-block">
              <span>Order volume</span>
              <strong>14.2k</strong>
            </div>
            <div className="stat-block">
              <span>Conversion rate</span>
              <strong>67%</strong>
            </div>
            <div className="stat-block">
              <span>Customer satisfaction</span>
              <strong>4.9 / 5.0</strong>
            </div>
            <div className="date-picker">
              <label>Date range</label>
              <input type="date" />
              <input type="date" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardPage;
