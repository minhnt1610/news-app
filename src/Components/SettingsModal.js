import React, { useState, useEffect } from "react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "vi", label: "Tiếng Việt" },
];

export default function SettingsModal({ show, onClose, settings, onChange }) {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings, show]);

  const handleChange = (key, value) => {
    setLocalSettings({ ...localSettings, [key]: value });
  };

  const handleSave = () => {
    onChange(localSettings);
    onClose();
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.25)", zIndex: 2000,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 28, minWidth: 320, boxShadow: "0 4px 32px rgba(0,0,0,0.18)" }}>
        <h4 style={{ marginBottom: 18 }}>Settings</h4>
        <div style={{ marginBottom: 16 }}>
          <label>Language:</label>
          <select value={localSettings.language} onChange={e => handleChange("language", e.target.value)} className="form-select">
            {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Theme:</label>
          <select value={localSettings.theme} onChange={e => handleChange("theme", e.target.value)} className="form-select">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Font Size:</label>
          <select value={localSettings.fontSize} onChange={e => handleChange("fontSize", e.target.value)} className="form-select">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
