export default function ArticlePage() {
  return (
    <div style={{ background: '#111', minHeight: '100vh', fontFamily: 'Georgia, serif', paddingTop: 60 }}>
      <div style={{
        margin: '40px auto',
        maxWidth: 900,
        padding: '32px 40px',
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid #3a3a50',
        borderRadius: 8,
      }}>
        <h1 style={{ color: '#c9a84c', letterSpacing: '0.15em', marginBottom: 24 }}>Article Maker</h1>
        <button style={{
          color: '#c9a84c',
          background: 'rgba(0,0,0,0.5)',
          border: '1px solid #3a3a50',
          borderRadius: 4,
          padding: '6px 16px',
          fontFamily: 'Georgia, serif',
          fontSize: '0.85rem',
          cursor: 'pointer',
        }}>
          Add Paragraph
        </button>
      </div>
    </div>
  );
}
