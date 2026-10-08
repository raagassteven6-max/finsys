// Sample data for the File Manager (same shape as uploaded-files.json: { items: [...] }).
// Loaded as a script so the app also works when index.html is opened straight from disk.
// Swap for fetch('/api/files') when the backend exists.
window.UPLOADED_FILES = {
  items: [
    { name: "ledger.xlsx",              size: "412 KB", uploadedAt: "Mar 1, 2026", updatedAt: "Mar 1, 2026", uploadedBy: "Financial Analyst" },
    { name: "INV-2026-001.pdf",         size: "186 KB", uploadedAt: "Mar 1, 2026", updatedAt: "Feb 27, 2026", uploadedBy: "Financial Analyst" },
    { name: "INV-2026-002.pdf",         size: "203 KB", uploadedAt: "Mar 2, 2026", updatedAt: "Mar 2, 2026", uploadedBy: "Financial Analyst" },
    { name: "bank_statement_march.csv", size: "96 KB",  uploadedAt: "Mar 5, 2026", updatedAt: "Mar 4, 2026", uploadedBy: "Financial Analyst" },
    { name: "vendor_master.json",       size: "38 KB",  uploadedAt: "Mar 5, 2026", updatedAt: "Mar 5, 2026", uploadedBy: "Financial Analyst" }
  ]
};
