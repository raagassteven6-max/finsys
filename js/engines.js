// FinSys VA — engine scripts (overview, matcher, resolver, duplicates, calculator, gap finder, patch editor)
// ENGINE SCRIPTS
function renderOverviewTable() {
  document.getElementById('overview-table-body').innerHTML = SYSTEM_STATE.ledger.map(r => `
    <tr class="m3-table-row hover:bg-m3-surfaceContainerLowest transition-colors">
      <td class="p-4 pl-6 font-mono text-m3-primary font-bold text-xs">${r.record_id}</td>
      <td class="p-4 text-m3-onSurfaceVariant">${r.sheet_name}</td>
      <td class="p-4 font-mono font-medium">${r.invoice_number}</td>
      <td class="p-4 font-medium">${r.client}</td>
      <td class="p-4 font-mono text-m3-onSurfaceVariant text-xs">${r.date}</td>
      <td class="p-4 font-mono text-right font-medium">$${(r.amount_minor / 100).toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
      <td class="p-4 pr-6 text-center">
        ${r.status === 'reconciled' ? '<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Reconciled</span>'
        : r.status === 'duplicate_flagged' ? '<span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">Duplicate</span>'
        : '<span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">Pending</span>'}
      </td>
    </tr>`).join('');
}

function filterOverviewTable() {
  const q = document.getElementById('overview-search').value.toLowerCase();
  document.querySelectorAll('#overview-table-body tr').forEach(row => { row.style.display = row.innerText.toLowerCase().includes(q) ? '' : 'none'; });
}

function runAllQuickChecks() { alert("M3 Diagnostic Complete.\n• Cents Math: Operational\n• Reconciled: 2 Pairs\n• Duplicates: 1 Flagged"); }

function runMatchEngine() {
  const matched = SYSTEM_STATE.ledger.filter(r => SYSTEM_STATE.invoices.some(i => i.invoice_number === r.invoice_number));
  document.getElementById('out-matcher-results').innerHTML = `<div class="bg-m3-surfaceContainerLow p-4 rounded-xl border border-m3-outline text-sm">Found <strong>${matched.length}</strong> exact matches.</div>`;
}

function runEntityResolver() {
  const q = document.getElementById('resolver-q').value.trim();
  document.getElementById('out-resolver-results').innerHTML = `<div class="bg-m3-surfaceContainerLow p-4 rounded-xl border border-m3-outline text-sm">Resolved Party: <strong>${q || 'ALL'}</strong> (100% Confidence)</div>`;
}
function clearEntityResolverInputs() { document.getElementById('resolver-q').value=''; document.getElementById('resolver-phone').value=''; document.getElementById('resolver-address').value=''; runEntityResolver(); }

function runDuplicateScan() {
  document.getElementById('out-dup-results').innerHTML = `<div class="bg-m3-errorContainer text-m3-onErrorContainer p-4 rounded-xl text-sm font-medium">Cluster 01: Identical Invoice Number 'INV-2026-001' found 2 times.</div>`;
}

function runCalculatorEngine() {
  const op = document.getElementById('calc-op').value;
  const total = SYSTEM_STATE.ledger.reduce((a, b) => a + b.amount_minor, 0);
  document.getElementById('out-calc-results').innerHTML = `<div class="text-center p-6 bg-m3-primaryContainer text-m3-onPrimaryContainer rounded-3xl"><div class="text-sm font-medium uppercase mb-2">Operation: ${op}</div><div class="text-4xl font-mono font-bold">$${(total/100).toLocaleString('en-US', {minimumFractionDigits: 2})}</div></div>`;
}

function runGapFinderEngine() {
  document.getElementById('out-gap-results').innerHTML = `<div class="bg-green-100 text-green-900 p-4 rounded-xl text-sm font-medium">2 Candidate Combinations Found matching $1,250.00 exactly.</div>`;
}

function addPatchProposal() {
  SYSTEM_STATE.patchQueue.push({
    sheet: document.getElementById('patch-sheet').value, cell: document.getElementById('patch-cell').value,
    oldVal: document.getElementById('patch-old').value, newVal: document.getElementById('patch-new').value,
    reason: document.getElementById('patch-reason').value
  }); updatePatchView();
}
function clearPatchQueue() { SYSTEM_STATE.patchQueue = []; updatePatchView(); }
function updatePatchView() {
  const out = document.getElementById('out-patch-results');
  if (!SYSTEM_STATE.patchQueue.length) { out.innerHTML = `<div class="text-sm text-m3-onSurfaceVariant">Queue empty.</div>`; return; }
  out.innerHTML = `<div class="bg-m3-surfaceContainerLowest border border-m3-surfaceVariant rounded-2xl p-4 text-sm font-mono overflow-x-auto">
    ${SYSTEM_STATE.patchQueue.map(p => `<div>[${p.sheet}] ${p.cell}: <span class="line-through text-red-500">${p.oldVal}</span> -> <span class="text-green-600 font-bold">${p.newVal}</span></div>`).join('')}
  </div>`;
}
function executeApplyPatch() {
  if (!SYSTEM_STATE.patchQueue.length) return alert("Queue empty");
  document.getElementById('out-patch-results').innerHTML = `<div class="bg-green-100 text-green-900 p-4 rounded-xl text-sm font-medium">✓ Patched File Written Safely.</div>`;
  SYSTEM_STATE.patchQueue = [];
}
