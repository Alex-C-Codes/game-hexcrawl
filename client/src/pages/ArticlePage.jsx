import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { upsert, getById } from '../lib/storage';
import './article.css';

function wordCount(el) {
  return (el?.innerText || '').trim().split(/\s+/).filter(Boolean).length;
}

const TOOLBAR = [
  { label: 'B',  cls: 'art-bold',   title: 'Bold (Ctrl+B)',    cmd: 'bold' },
  { label: 'I',  cls: 'art-italic', title: 'Italic (Ctrl+I)',  cmd: 'italic' },
  null,
  { label: 'H1', title: 'Heading 1', cmd: 'formatBlock', val: 'h1' },
  { label: 'H2', title: 'Heading 2', cmd: 'formatBlock', val: 'h2' },
  { label: 'H3', title: 'Heading 3', cmd: 'formatBlock', val: 'h3' },
  { label: 'P',  title: 'Normal paragraph', cmd: 'formatBlock', val: 'p' },
  null,
  { label: '"',  title: 'Block quote',    cmd: 'formatBlock', val: 'blockquote' },
  { label: '•',  title: 'Bullet list',    cmd: 'insertUnorderedList' },
  { label: '1.', title: 'Numbered list',  cmd: 'insertOrderedList' },
  null,
  { label: '—',  title: 'Horizontal rule', cmd: 'insertHorizontalRule' },
];

export default function ArticlePage() {
  const [searchParams] = useSearchParams();
  const contentId = searchParams.get('id') || null;

  const [title,   setTitle]   = useState('Untitled Article');
  const [saved,   setSaved]   = useState(true);
  const [words,   setWords]   = useState(0);
  const editorRef = useRef(null);
  const savedId   = useRef(contentId);

  // Load existing article on mount
  useEffect(() => {
    if (!contentId) return;
    const item = getById(contentId);
    if (!item) return;
    setTitle(item.name || 'Untitled Article');
    if (editorRef.current && item.data?.html) {
      editorRef.current.innerHTML = item.data.html;
      setWords(wordCount(editorRef.current));
    }
  }, [contentId]);

  function save() {
    const editor = editorRef.current;
    if (!editor) return;
    const id = savedId.current || crypto.randomUUID();
    savedId.current = id;
    upsert({ id, type: 'article', name: title, data: { html: editor.innerHTML, text: editor.innerText } });
    setSaved(true);
  }

  function exportTxt() {
    const text = editorRef.current?.innerText || '';
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (title || 'article') + '.txt';
    a.click();
  }

  function onInput() {
    setSaved(false);
    setWords(wordCount(editorRef.current));
  }

  function fmt(cmd, val) {
    document.execCommand(cmd, false, val ?? null);
    editorRef.current?.focus();
    setSaved(false);
  }

  return (
    <div id="article-root">
      {/* Header */}
      <div id="art-header">
        <h1>Article Editor</h1>
        <div className="art-sep" />
        <span className="art-label">Title</span>
        <input
          id="art-input-title"
          type="text"
          value={title}
          onChange={e => { setTitle(e.target.value); setSaved(false); }}
          maxLength={120}
          spellCheck={false}
        />
        <div className="art-sep" />
        <button className="art-btn primary" onClick={save}>Save</button>
        <button className="art-btn" onClick={exportTxt}>Export .txt</button>
      </div>

      {/* Toolbar */}
      <div id="art-toolbar">
        {TOOLBAR.map((item, i) =>
          item === null
            ? <div key={i} className="art-tbsep" />
            : (
              <button
                key={i}
                className={`art-tool-btn${item.cls ? ' ' + item.cls : ''}`}
                title={item.title}
                onMouseDown={e => { e.preventDefault(); fmt(item.cmd, item.val); }}
              >
                {item.label}
              </button>
            )
        )}
      </div>

      {/* Editor */}
      <div id="art-content">
        <div
          id="art-editor"
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Begin writing your article..."
          onInput={onInput}
          onKeyDown={e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); save(); }
          }}
        />
      </div>

      {/* Status bar */}
      <div id="art-statusbar">
        <span>{words} {words === 1 ? 'word' : 'words'}</span>
        <span className="art-sbsep">|</span>
        <span style={{ color: saved ? '#3a3830' : '#c9a84c' }}>
          {saved ? 'Saved' : 'Unsaved changes'}
        </span>
        <span id="art-status-hint">Ctrl+S to save · Ctrl+B bold · Ctrl+I italic</span>
      </div>
    </div>
  );
}
