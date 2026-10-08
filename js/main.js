// FinSys VA — bootstrap
window.onload = function() {
  renderOverviewTable();
  runMatchEngine();
  runEntityResolver();
  runDuplicateScan();
  runCalculatorEngine();
  runGapFinderEngine();
  updatePatchView();
  initFileManager();
};
