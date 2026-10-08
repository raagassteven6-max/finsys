// FinSys VA — UI shell: drawer, closable tabs, sidebar sync, modals
// DRAWER LOGIC
function toggleDrawer() {
  const drawer = document.getElementById('engine-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const isClosed = drawer.classList.contains('-translate-x-full');
  
  if (isClosed) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('opacity-0');
      drawer.classList.remove('-translate-x-full');
    }, 10);
  } else {
    overlay.classList.add('opacity-0');
    drawer.classList.add('-translate-x-full');
    setTimeout(() => overlay.classList.add('hidden'), 300);
  }
}

// =========================================================================
// DYNAMIC CLOSABLE TAB SYSTEM LOGIC (Web Awesome / Shoelace Core)
// =========================================================================
function handleNavClick(btnElement, engineId) {
  const svgHTML = btnElement.querySelector('svg').outerHTML;
  const engineName = btnElement.querySelector('span').innerText;
  
  const tabGroup = document.getElementById('main-tab-group');
  
  if (engineId === 'overview') {
      tabGroup.show('overview');
  } else {
      openEngineTab(engineId, engineName, svgHTML);
  }

  // Auto close drawer on mobile screens after selection
  if (window.innerWidth < 1024) toggleDrawer();
}

function openEngineTab(engineId, engineName, iconSvg) {
  const tabGroup = document.getElementById('main-tab-group');
  
  // Check if tab already exists in nav
  let existingTab = tabGroup.querySelector(`sl-tab[panel="${engineId}"]`);
  
  if (!existingTab) {
    // Create new tab element
    const newTab = document.createElement('sl-tab');
    newTab.setAttribute('slot', 'nav');
    newTab.setAttribute('panel', engineId);
    
    // Define tab content (Icon + Name + Close Button)
    newTab.innerHTML = `
      <div class="flex items-center gap-2">
        ${iconSvg}
        <span class="whitespace-nowrap">${engineName}</span>
        <sl-icon-button name="x-lg" class="close-tab-btn ml-1 hover:text-red-500 transition-colors" style="font-size: 14px;" label="Close tab"></sl-icon-button>
      </div>
    `;

    // Handle Close Event
    const closeBtn = newTab.querySelector('.close-tab-btn');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop tab from activating on close click
      const wasActive = newTab.active;
      newTab.remove(); // Removes tab from navigation slot
      
      if (wasActive) {
        tabGroup.show('overview'); // Fallback to main dashboard
      }
    });

    // Append to the DOM (Group automatically puts it in the 'nav' slot)
    tabGroup.appendChild(newTab);
  }

  // Switch view to the selected tab
  setTimeout(() => tabGroup.show(engineId), 10);
}

// SYNC ACTIVE SIDEBAR NAV WITH ACTIVE TAB
document.addEventListener('DOMContentLoaded', () => {
  const tabGroup = document.getElementById('main-tab-group');
  
  tabGroup.addEventListener('sl-tab-show', (event) => {
    const panelName = event.detail.name;
    
    // Reset all sidebar buttons
    document.querySelectorAll('.drawer-nav-item').forEach(btn => {
      btn.classList.remove('bg-m3-secondaryContainer', 'text-m3-onSecondaryContainer');
      btn.classList.add('text-m3-onSurfaceVariant', 'hover:bg-m3-onSurfaceVariant/10');
    });
    
    // Highlight active sidebar button
    const activeBtn = document.getElementById(`nav-${panelName}`);
    if (activeBtn) {
      activeBtn.classList.add('bg-m3-secondaryContainer', 'text-m3-onSecondaryContainer');
      activeBtn.classList.remove('text-m3-onSurfaceVariant', 'hover:bg-m3-onSurfaceVariant/10');
    }
  });
});

// MODALS & MOCKS
function openModal(modalId) {
  const m = document.getElementById(modalId); m.classList.remove('hidden'); setTimeout(() => m.classList.remove('opacity-0'), 10);
}
function closeModal(modalId) {
  const m = document.getElementById(modalId); m.classList.add('opacity-0'); setTimeout(() => m.classList.add('hidden'), 300);
}
function simulateFileUpload() {
  const msg = document.getElementById('upload-status-msg');
  msg.classList.remove('hidden');
  msg.innerHTML = `✓ Parsed 'ledger.xlsx' (4,280 rows). Convered to integer cents.`;
  setTimeout(() => { closeModal('upload-modal'); msg.classList.add('hidden'); }, 2000);
}
