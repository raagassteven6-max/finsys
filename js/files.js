// FinSys VA — File Manager (upload / download / selectable table)
// Vanilla port of the Untitled UI "Files uploaded" table (Table04DividerLine).

const FILES_USER = "Financial Analyst";
const FILES_STATE = { items: [], selected: new Set(), nextId: 1 };

const FILE_TYPE_COLORS = {
  pdf: '#BA1A1A', xlsx: '#1B6E3A', xls: '#1B6E3A', csv: '#1B6E3A',
  json: '#8A5A00', docx: '#00629D', txt: '#51606F'
};

/* ---------- helpers ---------- */
function fileExt(name) { const i = name.lastIndexOf('.'); return i > 0 ? name.slice(i + 1).toLowerCase() : ''; }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function formatBytes(b) { return b < 1024 ? b + ' B' : b < 1048576 ? Math.round(b / 1024) + ' KB' : (b / 1048576).toFixed(1) + ' MB'; }
function formatDate(d) { return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }

function fileIconSvg(ext) {
  const color = FILE_TYPE_COLORS[ext] || '#73777F';
  return `<svg class="w-10 h-10 shrink-0" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <path d="M10 4h14l8 8v22a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#F2F4F7" stroke="#DFE2E6"/>
    <path d="M24 4v6a2 2 0 0 0 2 2h6" fill="#DFE2E6"/>
    <rect x="4" y="20" width="22" height="11" rx="2" fill="${color}"/>
    <text x="15" y="28.2" text-anchor="middle" font-family="Roboto, sans-serif" font-size="7" font-weight="700" fill="#fff">${esc((ext || 'file').slice(0, 4).toUpperCase())}</text>
  </svg>`;
}

/* ---------- rendering ---------- */
function fileRowHtml(item) {
  const ext = fileExt(item.name);
  const checked = FILES_STATE.selected.has(item.id);
  return `
  <tr class="m3-table-row hover:bg-m3-surfaceContainerLowest transition-colors" data-id="${item.id}" data-selected="${checked}">
    <td class="p-4 pl-6"><input type="checkbox" class="files-check" data-role="row-check" ${checked ? 'checked' : ''} aria-label="Select ${esc(item.name)}"></td>
    <td class="p-4">
      <div class="flex items-center gap-3">
        ${fileIconSvg(ext)}
        <div class="whitespace-nowrap">
          <p class="text-sm font-medium text-m3-onSurface">${esc(item.name)}</p>
          <p class="text-sm text-m3-onSurfaceVariant">${esc(item.size)}</p>
        </div>
      </div>
    </td>
    <td class="p-4 whitespace-nowrap">${esc(item.size)}</td>
    <td class="p-4 whitespace-nowrap">${esc(item.uploadedAt)}</td>
    <td class="p-4 whitespace-nowrap md:hidden xl:table-cell">${esc(item.updatedAt)}</td>
    <td class="p-4 whitespace-nowrap">${esc(item.uploadedBy)}</td>
    <td class="p-4 pr-4">
      <div class="flex items-center justify-end">
        <sl-dropdown hoist placement="bottom-end">
          <sl-icon-button slot="trigger" name="three-dots-vertical" label="File actions"></sl-icon-button>
          <sl-menu>
            <sl-menu-item value="download" ${item.file ? '' : 'disabled'}>Download</sl-menu-item>
            <sl-menu-item value="delete">Delete</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </div>
    </td>
  </tr>`;
}

function renderFilesTable() {
  const body = document.getElementById('files-table-body');
  body.innerHTML = FILES_STATE.items.length
    ? FILES_STATE.items.map(fileRowHtml).join('')
    : `<tr><td colspan="7" class="p-10 text-center text-m3-onSurfaceVariant">No files yet. Select <strong>Upload</strong> to add .xlsx, .csv, .json or .pdf files.</td></tr>`;
  syncSelectionUi();
}

function syncSelectionUi() {
  const total = FILES_STATE.items.length;
  const n = FILES_STATE.selected.size;
  const all = document.getElementById('files-select-all');
  all.checked = total > 0 && n === total;
  all.indeterminate = n > 0 && n < total;
  document.getElementById('files-download-all').textContent = n ? `Download (${n})` : 'Download all';
}

/* ---------- actions ---------- */
function addFiles(fileList) {
  const now = new Date();
  fileList.forEach(f => {
    FILES_STATE.items.unshift({
      id: 'f' + FILES_STATE.nextId++, name: f.name, size: formatBytes(f.size),
      uploadedAt: formatDate(now), updatedAt: formatDate(new Date(f.lastModified || now)),
      uploadedBy: FILES_USER, file: f
    });
  });
  renderFilesTable();
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Downloads the selected rows (or every row when nothing is selected).
// Real uploaded files come back as-is; demo rows have no content, so they export a CSV manifest.
function downloadFiles() {
  const targets = FILES_STATE.selected.size
    ? FILES_STATE.items.filter(i => FILES_STATE.selected.has(i.id))
    : FILES_STATE.items;
  if (!targets.length) return;

  const real = targets.filter(i => i.file);
  if (real.length) { real.forEach((i, n) => setTimeout(() => triggerDownload(i.file, i.name), n * 250)); return; }

  const q = v => `"${String(v).replace(/"/g, '""')}"`;
  const rows = [['File name', 'File size', 'Date uploaded', 'Last updated', 'Uploaded by']]
    .concat(targets.map(i => [i.name, i.size, i.uploadedAt, i.updatedAt, i.uploadedBy]));
  triggerDownload(new Blob([rows.map(r => r.map(q).join(',')).join('\n')], { type: 'text/csv' }), 'files-manifest.csv');
}

function deleteFile(id) {
  FILES_STATE.items = FILES_STATE.items.filter(i => i.id !== id);
  FILES_STATE.selected.delete(id);
  renderFilesTable();
}

/* ---------- init ---------- */
function initFileManager() {
  const seed = (window.UPLOADED_FILES && window.UPLOADED_FILES.items) || [];
  FILES_STATE.items = seed.map(it => ({ ...it, id: 'f' + FILES_STATE.nextId++ }));

  const input = document.getElementById('files-input');
  document.getElementById('files-upload-btn').addEventListener('click', () => input.click());
  input.addEventListener('change', () => { addFiles([...input.files]); input.value = ''; });
  document.getElementById('files-download-all').addEventListener('click', downloadFiles);

  document.getElementById('files-select-all').addEventListener('change', e => {
    FILES_STATE.selected = e.target.checked ? new Set(FILES_STATE.items.map(i => i.id)) : new Set();
    renderFilesTable();
  });

  const body = document.getElementById('files-table-body');
  body.addEventListener('change', e => {
    if (e.target.dataset.role !== 'row-check') return;
    const tr = e.target.closest('tr');
    e.target.checked ? FILES_STATE.selected.add(tr.dataset.id) : FILES_STATE.selected.delete(tr.dataset.id);
    tr.dataset.selected = e.target.checked;
    syncSelectionUi();
  });
  body.addEventListener('sl-select', e => {
    const id = e.target.closest('tr').dataset.id;
    const action = e.detail.item.value;
    if (action === 'delete') deleteFile(id);
    if (action === 'download') {
      const item = FILES_STATE.items.find(i => i.id === id);
      if (item && item.file) triggerDownload(item.file, item.name);
    }
  });

  renderFilesTable();
}
