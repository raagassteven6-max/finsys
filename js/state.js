// FinSys VA — pre-loaded dataset state
const SYSTEM_STATE = {
  ledger: [
    { record_id: "ledger.xlsx!R2", invoice_number: "INV-2026-001", client: "Acme Logistics Corp", date: "2026-03-01", amount_minor: 125000, sheet_name: "Ledger", status: "reconciled" },
    { record_id: "ledger.xlsx!R3", invoice_number: "INV-2026-002", client: "Beta Tech Solutions", date: "2026-03-02", amount_minor: 340050, sheet_name: "Ledger", status: "reconciled" },
    { record_id: "ledger.xlsx!R4", invoice_number: "INV-2026-001", client: "Acme Logistics Corp", date: "2026-03-01", amount_minor: 125000, sheet_name: "Ledger", status: "duplicate_flagged" },
    { record_id: "ledger.xlsx!R5", invoice_number: "INV-2026-003", client: "Crescent Hotels", date: "2026-03-05", amount_minor: 89000, sheet_name: "Ledger", status: "pending" }
  ],
  invoices: [
    { doc_id: "doc_inv_001", vendor: "Acme Logistics Corp LLC", invoice_number: "INV-2026-001", total_minor: 125000 },
    { doc_id: "doc_inv_002", vendor: "Beta Tech Solutions", invoice_number: "INV-2026-002", total_minor: 340050 }
  ],
  patchQueue: []
};
