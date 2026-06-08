import React from 'react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import FormInput from '../../components/common/Input/FormInput';
import SelectInput from '../../components/common/Input/SelectInput';
import TextArea from '../../components/common/Input/TextArea';
import Button from '../../components/common/Button/Button';
import './SettingsPage.css';

const SettingsPage = () => {
  return (
    <div className="settings-page">
      <PageHeader title="Settings" subtitle="Configure restaurant operations, branding and account details from one central hub." />
      <div className="settings-panel">
        <div className="settings-section">
          <h3>Business Settings</h3>
          <div className="settings-grid">
            <FormInput label="Restaurant Name" placeholder="The Rustic Table" />
            <FormInput label="Contact Email" placeholder="support@restaurant.com" type="email" />
            <FormInput label="Phone Number" placeholder="(415) 555-0123" type="tel" />
            <SelectInput label="Default Currency" value="usd" onChange={() => {}} options={[{ value: 'usd', label: 'USD' }, { value: 'eur', label: 'EUR' }]} />
            <TextArea label="Store Address" placeholder="123 Market Street, San Francisco" rows={4} />
          </div>
        </div>
        <div className="settings-footer">
          <Button variant="outline">Discard Changes</Button>
          <Button variant="primary">Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
