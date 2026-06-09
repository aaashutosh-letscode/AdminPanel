import React, { useState } from 'react';
import { Store, User, Palette, Sun, Moon, LogOut, Trash2, Pencil, X, Lock, Upload, Zap } from 'lucide-react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import FormInput from '../../components/common/Input/FormInput';
import Button from '../../components/common/Button/Button';
import { useSettings } from '../../contexts/SettingsContext';
import './SettingsPage.css';

const SettingsPage = () => {
  const { settings, updateSettings } = useSettings();
  const [editingSection, setEditingSection] = useState(null);
  const [draft, setDraft] = useState({});

  const startEdit = (section) => {
    setDraft({ ...settings[section] });
    setEditingSection(section);
  };

  const cancelEdit = () => {
    setDraft({});
    setEditingSection(null);
  };

  const saveEdit = (section) => {
    updateSettings(section, draft);
    setEditingSection(null);
    setDraft({});
  };

  const updateDraft = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const getInitials = (name) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const isEditing = (section) => editingSection === section;

  return (
    <div className="settings-page">
      <PageHeader title="Settings" subtitle="Manage your restaurant, account and preferences." />

      <div className="settings-grid-layout">
        {/* ── Restaurant ── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon restaurant"><Store /></div>
            <h3>Restaurant</h3>
            <button className="settings-edit-btn" onClick={() => isEditing('restaurant') ? cancelEdit() : startEdit('restaurant')}>
              {isEditing('restaurant') ? <><X /> Cancel</> : <><Pencil /> Edit</>}
            </button>
          </div>

          {!isEditing('restaurant') ? (
            <div className="settings-section-body">
              <div className="settings-logo-row">
                <div className="settings-avatar">
                  {settings.restaurant.logo
                    ? <img src={settings.restaurant.logo} alt="Logo" />
                    : getInitials(settings.restaurant.name)}
                </div>
                <div className="settings-info-stack">
                  <span className="settings-info-name">{settings.restaurant.name}</span>
                  <span className="settings-info-detail">{settings.restaurant.phone}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="settings-section-body">
              <FormInput
                label="Restaurant Name"
                value={draft.name || ''}
                onChange={(e) => updateDraft('name', e.target.value)}
              />
              <FormInput
                label="Phone Number"
                type="tel"
                value={draft.phone || ''}
                onChange={(e) => updateDraft('phone', e.target.value)}
              />
              <div className="settings-logo-upload">
                <span className="settings-upload-label">Logo</span>
                <label className="settings-upload-trigger">
                  <Upload /> Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) updateDraft('logo', URL.createObjectURL(file));
                    }}
                  />
                </label>
              </div>
              <div className="settings-inline-actions">
                <Button variant="primary" size="small" onClick={() => saveEdit('restaurant')}>Save</Button>
                <Button variant="ghost" size="small" onClick={cancelEdit}>Cancel</Button>
              </div>
            </div>
          )}
        </div>

        {/* ── Admin ── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon admin"><User /></div>
            <h3>Admin</h3>
            <button className="settings-edit-btn" onClick={() => isEditing('admin') ? cancelEdit() : startEdit('admin')}>
              {isEditing('admin') ? <><X /> Cancel</> : <><Pencil /> Edit</>}
            </button>
          </div>

          {!isEditing('admin') ? (
            <div className="settings-section-body">
              <div className="settings-value-row">
                <span className="settings-label">Name</span>
                <span className="settings-value">{settings.admin.name}</span>
              </div>
              <div className="settings-value-row">
                <span className="settings-label">Email</span>
                <span className="settings-value">{settings.admin.email}</span>
              </div>
              <button className="settings-text-btn" type="button">
                <Lock /> Change Password
              </button>
            </div>
          ) : (
            <div className="settings-section-body">
              <FormInput
                label="Name"
                value={draft.name || ''}
                onChange={(e) => updateDraft('name', e.target.value)}
              />
              <FormInput
                label="Email"
                type="email"
                value={draft.email || ''}
                onChange={(e) => updateDraft('email', e.target.value)}
              />
              <div className="settings-inline-actions">
                <Button variant="primary" size="small" onClick={() => saveEdit('admin')}>Save</Button>
                <Button variant="ghost" size="small" onClick={cancelEdit}>Cancel</Button>
              </div>
            </div>
          )}
        </div>

        {/* ── Theme ── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon theme"><Palette /></div>
            <h3>Theme</h3>
          </div>
          <div className="settings-section-body">
            <div className="theme-toggle-group">
              <button
                type="button"
                className={`theme-toggle-btn ${settings.theme === 'light' ? 'active' : ''}`}
                onClick={() => updateSettings('theme', 'light')}
              >
                <Sun /> Light
              </button>
              <button
                type="button"
                className={`theme-toggle-btn ${settings.theme === 'dark' ? 'active' : ''}`}
                onClick={() => updateSettings('theme', 'dark')}
              >
                <Moon /> Dark
              </button>
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon actions"><Zap /></div>
            <h3>Actions</h3>
          </div>
          <div className="settings-section-body">
            <div className="settings-actions-stack">
              <Button variant="primary" size="small">Save Changes</Button>
              <Button variant="outline" size="small" icon={LogOut}>Logout</Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Danger Zone ── */}
      <div className="settings-danger-zone">
        <div className="settings-danger-content">
          <div>
            <h4>Danger Zone</h4>
            <p>Permanently delete your account and all data. This cannot be undone.</p>
          </div>
          <Button variant="danger" size="small" icon={Trash2}>Delete Account</Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
