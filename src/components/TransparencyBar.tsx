'use client';

export default function TransparencyBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 z-50"
      style={{
        backgroundColor: 'var(--accent)',
        boxShadow: '0 0 20px rgba(196, 93, 62, 0.5)',
        animation: 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }}
    />
  );
}
