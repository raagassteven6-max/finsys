// FinSys VA — footer navigation + legal modal
(function () {
  const LEGAL = {
    terms: ['Terms of Use', [
      'By using FinSys VA you agree to these terms. The software is provided for internal financial reconciliation and review purposes.',
      'You are responsible for the accuracy of the data you import and for verifying all results before relying on them in financial reporting, payments or filings.',
      'You agree not to misuse the system, attempt to bypass its safeguards, or use it in violation of applicable law.',
      'The service is provided "as is", without warranties of any kind, and may be updated or changed at any time.'
    ]],
    privacy: ['Privacy Policy', [
      'FinSys VA processes the files and records you import in order to run reconciliation, matching, duplicate and discrepancy analysis.',
      'Imported financial data is used only to provide these functions. Data is not sold or shared with third parties for advertising.',
      'Audit logs record engine runs and patches so changes can be reviewed and undone.',
      'You may request removal of your imported data at any time through the File Manager or by contacting the owner.'
    ]],
    disclaimer: ['Disclaimer', [
      'FinSys VA is an analytical tool and does not provide accounting, tax, audit or legal advice.',
      'Match, duplicate and discrepancy results are suggestions generated from the data supplied and must be reviewed by a qualified person before action is taken.',
      'The owner is not liable for losses or decisions arising from use of, or reliance on, the output of this system.'
    ]],
    cookies: ['Cookie Notice', [
      'FinSys VA uses only essential browser storage needed for the interface to work, such as UI preferences.',
      'No advertising or cross-site tracking cookies are used.'
    ]]
  };

  function openLegal(key) {
    const item = LEGAL[key]; if (!item) return;
    document.getElementById('legal-title').textContent = item[0];
    document.getElementById('legal-body').innerHTML =
      item[1].map(p => '<p>' + p + '</p>').join('') +
      '<p class="text-xs pt-2 border-t border-m3-surfaceVariant">©2026 Steven Edward R. All rights reserved.</p>';
    openModal('legal-modal');
  }

  document.addEventListener('click', function (e) {
    const legal = e.target.closest('[data-legal]');
    if (legal) { openLegal(legal.dataset.legal); return; }
    const nav = e.target.closest('[data-nav]');
    if (nav) {
      const btn = document.getElementById('nav-' + nav.dataset.nav);
      if (btn) btn.click();               // reuse the drawer's own handler
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal('legal-modal');
  });
})();
