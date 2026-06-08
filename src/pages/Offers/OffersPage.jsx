import React, { useState } from 'react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import Table from '../../components/common/Table/Table';
import Pagination from '../../components/common/Pagination/Pagination';
import Tabs from '../../components/shared/Tabs/Tabs';
import FormInput from '../../components/common/Input/FormInput';
import SelectInput from '../../components/common/Input/SelectInput';
import TextArea from '../../components/common/Input/TextArea';
import { offers, coupons } from '../../services/api';
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge';
import './OffersPage.css';

const OffersPage = () => {
  const [activeTab, setActiveTab] = useState('details');

  const offerColumns = [
    { key: 'id', title: 'Offer ID', dataIndex: 'id' },
    { key: 'title', title: 'Title', dataIndex: 'title' },
    { key: 'status', title: 'Status', render: (row) => <StatusBadge label={row.status} variant={row.status === 'Active' ? 'success' : 'warning'} /> },
    { key: 'discount', title: 'Discount', dataIndex: 'discount' },
    { key: 'valid', title: 'Valid Until', dataIndex: 'valid' }
  ];

  const couponColumns = [
    { key: 'id', title: 'Coupon', dataIndex: 'id' },
    { key: 'code', title: 'Code', dataIndex: 'code' },
    { key: 'type', title: 'Type', dataIndex: 'type' },
    { key: 'value', title: 'Value', dataIndex: 'value' },
    { key: 'valid', title: 'Valid Until', dataIndex: 'valid' }
  ];

  return (
    <div className="offers-page">
      <PageHeader title="Offers & Coupons" subtitle="Create and manage promotional campaigns with live preview, limits and coupon settings." />
      <div className="offers-grid">
        <div className="offers-left">
          <div className="offer-summary-row">
            <div className="offer-card offer-card-primary">
              <span>Total Offers</span>
              <strong>{offers.length}</strong>
            </div>
            <div className="offer-card offer-card-secondary">
              <span>Active Coupons</span>
              <strong>{coupons.length}</strong>
            </div>
          </div>
          <div className="offers-data-card">
            <div className="data-card-title">
              <h3>Offer List</h3>
            </div>
            <Table columns={offerColumns} data={offers} />
            <Pagination total={3} onPageChange={() => {}} />
          </div>
          <div className="offers-data-card">
            <div className="data-card-title">
              <h3>Coupon Table</h3>
            </div>
            <Table columns={couponColumns} data={coupons} />
            <Pagination total={2} onPageChange={() => {}} />
          </div>
        </div>
        <aside className="offers-right-panel">
          <div className="offer-form-card">
            <Tabs
              tabs={[
                { key: 'details', label: 'Offer Details' },
                { key: 'coupon', label: 'Coupon Settings' },
                { key: 'usage', label: 'Usage Limits' }
              ]}
              onChange={setActiveTab}
            />
            <div className="offer-form-body">
              <FormInput label="Offer Title" placeholder="Enter offer name" />
              <TextArea label="Offer Description" placeholder="Describe the campaign details." rows={4} />
              <SelectInput label="Offer Type" value="seasonal" onChange={() => {}} options={[{ value: 'seasonal', label: 'Seasonal' }, { value: 'holiday', label: 'Holiday' }]} />
              <SelectInput label="Discount Type" value="percentage" onChange={() => {}} options={[{ value: 'percentage', label: 'Percentage' }, { value: 'fixed', label: 'Fixed Amount' }]} />
              <FormInput label="Discount Value" placeholder="25%" />
              <FormInput label="Minimum Order" placeholder="$30" />
              <FormInput label="Maximum Discount" placeholder="$50" />
              <div className="date-row">
                <input type="date" />
                <input type="date" />
              </div>
              <FormInput label="Offer Image" placeholder="Upload a banner" />
            </div>
            <div className="offer-form-footer">
              <button type="button" className="btn btn-outline">Cancel</button>
              <button type="button" className="btn btn-primary">Save Offer</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OffersPage;
