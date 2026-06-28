"use client";

import { useState } from "react";

export interface SettingItem {
  key: string;
  value: string;
  note?: string;
}

export interface SettingGroup {
  label: string;
  items: SettingItem[];
}

interface NoteSettingsProps {
  groups: SettingGroup[];
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 9.5V2.5A1 1 0 0 1 3 1.5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SettingRow({ item }: { item: SettingItem }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(item.value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div className="ns-row">
      <span className="ns-key">{item.key}</span>
      <span className="ns-value">{item.value}</span>
      {item.note && <span className="ns-note">{item.note}</span>}
      <button
        onClick={handleCopy}
        className="ns-copy"
        aria-label={`複製 ${item.key}`}
        title="複製"
      >
        {copied ? (
          <span className="ns-copied">✓</span>
        ) : (
          <CopyIcon />
        )}
      </button>
    </div>
  );
}

export default function NoteSettings({ groups }: NoteSettingsProps) {
  return (
    <div className="ns-root">
      {groups.map((group) => (
        <div key={group.label} className="ns-group">
          <div className="ns-group-label">
            <span>{group.label}</span>
          </div>
          <div className="ns-table">
            {group.items.map((item) => (
              <SettingRow key={item.key} item={item} />
            ))}
          </div>
        </div>
      ))}

      <style>{`
        .ns-root { display: flex; flex-direction: column; gap: 28px; }
        .ns-group { }
        .ns-group-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .ns-group-label span {
          font-family: var(--font-space-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .ns-table {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          overflow: hidden;
        }
        .ns-row {
          display: grid;
          grid-template-columns: 120px 1fr auto auto;
          align-items: center;
          gap: 12px;
          padding: 11px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.15s;
        }
        .ns-row:last-child { border-bottom: none; }
        .ns-row:hover { background: rgba(255,255,255,0.035); }
        .ns-key {
          font-family: var(--font-space-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.5);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .ns-value {
          font-family: var(--font-space-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.92);
          font-weight: 700;
        }
        .ns-note {
          font-family: var(--font-readex), sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.38);
          white-space: nowrap;
        }
        .ns-copy {
          background: none;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 5px;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          padding: 5px 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
          flex-shrink: 0;
        }
        .ns-copy:hover {
          color: rgba(255,225,140,0.9);
          border-color: rgba(255,225,140,0.35);
          background: rgba(255,225,140,0.06);
        }
        .ns-copied {
          font-size: 12px;
          color: rgba(140,255,180,0.9);
        }
        @media (max-width: 500px) {
          .ns-row {
            grid-template-columns: 100px 1fr auto;
          }
          .ns-note { display: none; }
        }
      `}</style>
    </div>
  );
}
