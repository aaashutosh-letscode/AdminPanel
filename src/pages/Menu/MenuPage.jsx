import React, { useState } from 'react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import SearchBar from '../../components/shared/SearchBar/SearchBar';
import Table from '../../components/common/Table/Table';
import Pagination from '../../components/common/Pagination/Pagination';
import Tabs from '../../components/shared/Tabs/Tabs';
import FormInput from '../../components/common/Input/FormInput';
import SelectInput from '../../components/common/Input/SelectInput';
import TextArea from '../../components/common/Input/TextArea';
import ImageUploader from '../../components/common/ImageUploader/ImageUploader';
import StatusBadge from '../../components/shared/StatusBadge/StatusBadge';
import { menuCategories, menuItems } from '../../services/api';
import './MenuPage.css';

const MenuPage = () => {
  const [category, setCategory] = useState('all');
  const [tab, setTab] = useState('general');

  const columns = [
    { key: 'image', title: 'Image', render: () => <div className="menu-image">🍔</div> },
    { key: 'name', title: 'Name', dataIndex: 'name' },
    { key: 'category', title: 'Category', dataIndex: 'category' },
    { key: 'price', title: 'Price', dataIndex: 'price' },
    { key: 'status', title: 'Status', render: (row) => <StatusBadge label={row.status} variant={row.status === 'Active' ? 'success' : 'danger'} /> },
    { key: 'available', title: 'Availability', dataIndex: 'available' },
    { key: 'actions', title: 'Actions', render: () => <button className="ghost-button">Edit</button> }
  ];

  const filtered = category === 'all' ? menuItems : menuItems.filter((item) => item.category.toLowerCase() === category);

  return (
    <div className="menu-page">
      <PageHeader title="Menu Management" subtitle="Manage your menu categories, pricing and availability with real-time admin controls." />
      <div className="menu-grid">
        <div className="menu-left">
          <div className="menu-toolbar">
            <SearchBar placeholder="Search menu items" />
            <div className="menu-actions">
              <button type="button" className="btn btn-outline">Add Category</button>
              <button type="button" className="btn btn-primary">Add New Item</button>
            </div>
          </div>
          <div className="menu-filters">
            {menuCategories.map((item) => (
              <button key={item.key} type="button" className={item.key === category ? 'filter-pill active' : 'filter-pill'} onClick={() => setCategory(item.key)}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="menu-table-card">
            <Table columns={columns} data={filtered} />
            <Pagination total={5} onPageChange={() => {}} />
          </div>
        </div>
        <aside className="menu-right-panel">
          <div className="editor-card">
            <Tabs
              tabs={[
                { key: 'general', label: 'General' },
                { key: 'images', label: 'Images' },
                { key: 'seo', label: 'SEO & Meta' }
              ]}
              onChange={setTab}
            />
            <div className="editor-body">
              <FormInput label="Item Name" placeholder="Enter menu title" />
              <SelectInput label="Category" value="pizza" onChange={() => {}} options={menuCategories.map((item) => ({ value: item.key, label: item.label }))} />
              <FormInput label="Price" placeholder="$12.00" />
              <SelectInput label="Availability" value="yes" onChange={() => {}} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
              <TextArea label="Short Description" placeholder="Add a short item description." />
              <TextArea label="Full Description" placeholder="Add detailed menu information." rows={6} />
              <ImageUploader label="Item Images" />
            </div>
            <div className="editor-footer">
              <button type="button" className="btn btn-outline">Cancel</button>
              <button type="button" className="btn btn-primary">Update Item</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MenuPage;
