// MWII DMZ Loadout Editor - script.js
// Representative full roster (many common MWII weapons included).
// Attachments are representative modifiers (positive/negative) for each stat.
// Stats: damage, fireRate, accuracy, recoil, range, mobility, control
// Bars are normalized for visualization (max expected values used for mapping).

// -------------------------
// Weapon database (representative)
// -------------------------
const WEAPONS = [
  // ASSAULT RIFLES
  { id:'m4', name:'M4', category:'assault', platform:'Assault Rifle',
    base:{damage:35, fireRate:800, accuracy:70, recoil:50, range:68, mobility:66, control:65},
    attachments:{
      Optic:[{name:'None'},{name:'Red Dot',accuracy:4},{name:'Holo',accuracy:5}],
      Muzzle:[{name:'None'},{name:'Monolithic Suppressor',accuracy:2,damage:-1},{name:'Compensator',recoil:-8}],
      Barrel:[{name:'Default'},{name:'Heavy Barrel',accuracy:6,recoil:6}],
      Underbarrel:[{name:'None'},{name:'Grip',recoil:-6,accuracy:2}],
      Stock:[{name:'Standard'},{name:'Skeletal Stock',mobility:6,control:-4}]
    }
  },
  { id:'taq56', name:'TAQ-56', category:'assault', platform:'Assault Rifle',
    base:{damage:38, fireRate:740, accuracy:66, recoil:54, range:72, mobility:63, control:61},
    attachments:{
      Optic:[{name:'None'},{name:'Holo',accuracy:4}],
      Muzzle:[{name:'None'},{name:'Suppressor',accuracy:2,damage:-2}],
      Underbarrel:[{name:'None'},{name:'Grip',recoil:-7}]
    }
  },
  { id:'kastov762', name:'Kastov-762', category:'assault', platform:'Assault Rifle',
    base:{damage:45, fireRate:620, accuracy:63, recoil:64, range:80, mobility:58, control:52},
    attachments:{
      Optic:[{name:'None'},{name:'3x Scope',accuracy:8}],
      Muzzle:[{name:'None'},{name:'Muzzle Brake',recoil:-10}],
      Underbarrel:[{name:'None'},{name:'Bipod',recoil:-14,accuracy:6}]
    }
  },
  { id:'iso_hemlock', name:'ISO Hemlock', category:'assault', platform:'Assault Rifle',
    base:{damage:40, fireRate:740, accuracy:68, recoil:56, range:70, mobility:64, control:60},
    attachments:{
      Optic:[{name:'None'},{name:'Reflex',accuracy:3}],
      Muzzle:[{name:'None'},{name:'Suppressor',accuracy:2,damage:-1}],
      Barrel:[{name:'Default'},{name:'Long Barrel',range:6,accuracy:4}]
    }
  },
  { id:'stb556', name:'STB 556', category:'assault', platform:'Assault Rifle',
    base:{damage:36, fireRate:790, accuracy:69, recoil:52, range:68, mobility:65, control:64},
    attachments:{
      Optic:[{name:'None'},{name:'1x Optic',accuracy:3}],
      Underbarrel:[{name:'None'},{name:'Grip',recoil:-6}],
      Stock:[{name:'Default'},{name:'Tactical Stock',accuracy:4,mobility:-3}]
    }
  },

  // SMGs
  { id:'vel46', name:'Vel 46', category:'smg', platform:'SMG',
    base:{damage:26, fireRate:950, accuracy:60, recoil:40, range:54, mobility:80, control:62},
    attachments:{
      Optic:[{name:'None'},{name:'Reflex',accuracy:3}],
      Muzzle:[{name:'None'},{name:'Suppressor',accuracy:2}],
      Underbarrel:[{name:'None'},{name:'Foregrip',recoil:-6,control:4}]
    }
  },
  { id:'lachmann_sub', name:'Lachmann Sub', category:'smg', platform:'SMG',
    base:{damage:28, fireRate:880, accuracy:61, recoil:42, range:56, mobility:78, control:60},
    attachments:{
      Optic:[{name:'None'},{name:'Red Dot',accuracy:3}],
      Muzzle:[{name:'None'},{name:'Compensator',recoil:-8}],
      Underbarrel:[{name:'None'},{name:'Grip',recoil:-5}]
    }
  },
  { id:'fennec', name:'Fennec 45', category:'smg', platform:'SMG',
    base:{damage:30, fireRate:1200, accuracy:57, recoil:46, range:50, mobility:84, control:56},
    attachments:{
      Muzzle:[{name:'None'},{name:'Suppressor',accuracy:2}],
      Barrel:[{name:'Default'},{name:'Short Barrel',mobility:6,range:-5}]
    }
  },

  // LMGs
  { id:'raal_mg', name:'Raal MG', category:'lmg', platform:'LMG',
    base:{damage:48, fireRate:560, accuracy:58, recoil:70, range:82, mobility:44, control:48},
    attachments:{
      Optic:[{name:'None'},{name:'2x Scope',accuracy:7}],
      Underbarrel:[{name:'None'},{name:'Bipod',recoil:-18,accuracy:8}],
      Muzzle:[{name:'None'},{name:'Brake',recoil:-8}]
    }
  },
  { id:'pkm', name:'PKM', category:'lmg', platform:'LMG',
    base:{damage:50, fireRate:560, accuracy:56, recoil:72, range:84, mobility:40, control:46},
    attachments:{
      Muzzle:[{name:'None'},{name:'Muzzle Brake',recoil:-10}],
      Barrel:[{name:'Default'},{name:'Long Barrel',range:6}]
    }
  },

  // MARKSMAN / SNIPERS
  { id:'spx80', name:'SP-X 80', category:'marksman', platform:'Sniper',
    base:{damage:95, fireRate:40, accuracy:92, recoil:20, range:98, mobility:30, control:78},
    attachments:{
      Optic:[{name:'Default Scope'},{name:'16x Scope',accuracy:4}],
      Muzzle:[{name:'None'},{name:'Suppressor',accuracy:2}]
    }
  },
  { id:'lockwood_mk2', name:'Lockwood MK2', category:'marksman', platform:'Marksman Rifle',
    base:{damage:78, fireRate:200, accuracy:86, recoil:34, range:90, mobility:44, control:70},
    attachments:{
      Optic:[{name:'Default'},{name:'8x',accuracy:5}],
      Muzzle:[{name:'None'},{name:'Muzzle Brake',recoil:-10}]
    }
  },

  // SHOTGUNS
  { id:'lockwood_300', name:'Lockwood 300', category:'shotgun', platform:'Shotgun',
    base:{damage:95, fireRate:85, accuracy:44, recoil:60, range:24, mobility:58, control:50},
    attachments:{
      Barrel:[{name:'Default'},{name:'Long Barrel',range:6,accuracy:6}],
      Muzzle:[{name:'None'},{name:'Choke',accuracy:8}]
    }
  },

  // HANDGUNS
  { id:'x12', name:'X12', category:'handgun', platform:'Handgun',
    base:{damage:28, fireRate:420, accuracy:66, recoil:38, range:36, mobility:86, control:64},
    attachments:{
      Muzzle:[{name:'None'},{name:'Suppressor',accuracy:2}],
      Optic:[{name:'Iron Sights'},{name:'Micro Reflex',accuracy:3}]
    }
  },

  // LAUNCHERS / MELEE (small set)
  { id:'kar98', name:'Kar98 (classic placeholder)', category:'marksman', platform:'Marksman',
    base:{damage:82, fireRate:50, accuracy:85, recoil:28, range:92, mobility:42, control:68},
    attachments:{ Optic:[{name:'Scope'}], Muzzle:[{name:'None'}] }
  },
  { id:'combat_knife', name:'Combat Knife', category:'launchers', platform:'Melee',
    base:{damage:120, fireRate:0, accuracy:100, recoil:0, range:1, mobility:100, control:100},
    attachments:{}
  }
];

// -------------------------
// Normalization maxima for visual bars (tweak for appearance).
// These are used to map stat numeric values to bar %.
// Choose maxima slightly above the highest expected stat.
const MAX = {
  damage: 120,       // headshot extremes / sniper ceilings
  fireRate: 1400,    // rpm
  accuracy: 100,
  recoil: 100,       // higher is worse (we invert visually)
  range: 100,
  mobility: 100,
  control: 100
};

// -------------------------
// DOM references
// -------------------------
const weaponListEl = document.getElementById('weaponList');
const weaponNameEl = document.getElementById('weaponName');
const weaponMetaEl = document.getElementById('weaponMeta');
const attachmentSlotsEl = document.getElementById('attachmentSlots');
const previewListEl = document.getElementById('previewList');
const savedBuildsEl = document.getElementById('savedBuilds');

const bars = {
  damage: document.getElementById('bar-damage'),
  fireRate: document.getElementById('bar-fireRate'),
  accuracy: document.getElementById('bar-accuracy'),
  recoil: document.getElementById('bar-recoil'),
  range: document.getElementById('bar-range'),
  mobility: document.getElementById('bar-mobility'),
  control: document.getElementById('bar-control')
};
const nums = {
  damage: document.getElementById('num-damage'),
  fireRate: document.getElementById('num-fireRate'),
  accuracy: document.getElementById('num-accuracy'),
  recoil: document.getElementById('num-recoil'),
  range: document.getElementById('num-range'),
  mobility: document.getElementById('num-mobility'),
  control: document.getElementById('num-control')
};

const viewStyleEl = document.getElementById('viewStyle');
const saveBtn = document.getElementById('saveBuild');
const loadBtn = document.getElementById('loadBuild');
const resetBtn = document.getElementById('resetBuild');

let currentCategory = 'assault';
let currentWeapon = null;
let selectedAttachments = {}; // {slotName: attachmentObject}

// -------------------------
// Helpers
// -------------------------
function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
function percent(value, max){ return clamp((value / max) * 100, 0, 100); }
function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

// Create tooltip element for attachment hover
let tooltipEl = null;
function showTooltip(html, x, y){
  hideTooltip();
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'tooltip';
  tooltipEl.innerHTML = html;
  document.body.appendChild(tooltipEl);
  // position (keep on-screen)
  const pad = 8;
  const rect = tooltipEl.getBoundingClientRect();
  let left = x + 12;
  let top = y + 12;
  if(left + rect.width + pad > window.innerWidth) left = window.innerWidth - rect.width - pad;
  if(top + rect.height + pad > window.innerHeight) top = window.innerHeight - rect.height - pad;
  tooltipEl.style.left = left + 'px';
  tooltipEl.style.top = top + 'px';
}
function hideTooltip(){ if(tooltipEl){ tooltipEl.remove(); tooltipEl = null; } }

// -------------------------
// Render weapon list by category
// -------------------------
function renderWeaponList(){
  weaponListEl.innerHTML = '';
  WEAPONS.filter(w => w.category === currentCategory).forEach(w => {
    const el = document.createElement('div');
    el.className = 'weapon-item';
    el.tabIndex = 0;
    el.innerHTML = `<strong>${w.name}</strong><div style="font-size:12px;color:rgba(158,241,120,0.12)">${w.platform}</div>`;
    el.onclick = () => selectWeapon(w.id, el);
    el.onkeydown = (e) => { if(e.key === 'Enter') selectWeapon(w.id, el); };
    weaponListEl.appendChild(el);
  });
}

// -------------------------
// Select weapon
// -------------------------
function selectWeapon(id, node){
  const w = WEAPONS.find(x => x.id === id);
  if(!w) return;
  // highlight
  document.querySelectorAll('.weapon-item').forEach(e => e.classList.remove('active'));
  if(node) node.classList.add('active');

  // deep copy to avoid mutating master data
  currentWeapon = JSON.parse(JSON.stringify(w));

  // default attachments (first option or placeholder)
  selectedAttachments = {};
  for(const slot in currentWeapon.attachments){
    const opts = currentWeapon.attachments[slot];
    selectedAttachments[slot] = opts && opts[0] ? opts[0] : {name:'None'};
  }

  renderWeaponEditor();
  updateStatsAndPreview();
}

// -------------------------
// Render attachments UI
// -------------------------
function renderWeaponEditor(){
  weaponNameEl.textContent = currentWeapon.name;
  weaponMetaEl.textContent = `${currentWeapon.platform} • ${capitalize(currentWeapon.category)}`;

  attachmentSlotsEl.innerHTML = '';
  if(!currentWeapon.attachments || Object.keys(currentWeapon.attachments).length === 0){
    attachmentSlotsEl.innerHTML = '<div style="color:var(--muted)">No attachments available.</div>';
    return;
  }

  for(const slot in currentWeapon.attachments){
    const slotDiv = document.createElement('div');
    slotDiv.className = 'slot';

    const label = document.createElement('label');
    label.textContent = slot;
    label.htmlFor = `sel-${slot}`;

    const sel = document.createElement('select');
    sel.id = `sel-${slot}`;
    sel.dataset.slot = slot;

    currentWeapon.attachments[slot].forEach((opt, idx) => {
      const o = document.createElement('option');
      o.value = idx;
      o.textContent = opt.name;
      sel.appendChild(o);
    });

    sel.value = 0;
    sel.onchange = (e) => {
      const idx = parseInt(e.target.value,10);
      selectedAttachments[slot] = currentWeapon.attachments[slot][idx];
      updateStatsAndPreview();
    };

    // mouseover to show tooltip with modifiers
    sel.onmousemove = (e) => {
      const idx = parseInt(sel.value,10);
      const opt = currentWeapon.attachments[slot][idx];
      const tooltipHtml = buildAttachmentTooltip(slot, opt);
      showTooltip(tooltipHtml, e.clientX, e.clientY);
    };
    sel.onmouseout = hideTooltip;

    slotDiv.appendChild(label);
    slotDiv.appendChild(sel);
    attachmentSlotsEl.appendChild(slotDiv);
  }
}

// Build tooltip HTML describing attachment stat modifiers
function buildAttachmentTooltip(slot, opt){
  if(!opt) return '<div style="color:var(--muted)">No data</div>';
  const keys = ['damage','fireRate','accuracy','recoil','range','mobility','control'];
  let lines = [`<div style="font-weight:600;margin-bottom:6px">${opt.name}</div>`];
  let any = false;
  keys.forEach(k => {
    if(opt[k] !== undefined){
      any = true;
      const sign = opt[k] >= 0 ? '+' : '';
      lines.push(`<div style="color:var(--muted)">${capitalize(k)}: <strong style="color:var(--accent)">${sign}${opt[k]}</strong></div>`);
    }
  });
  if(!any) lines.push(`<div style="color:var(--muted)">No stat changes (visual/attachment only)</div>`);
  return lines.join('');
}

// -------------------------
// Calculate & update stats + bars
// -------------------------
function updateStatsAndPreview(){
  if(!currentWeapon) return;
  // Start with base values
  const base = currentWeapon.base;
  let damage = base.damage;
  let fireRate = base.fireRate;
  let accuracy = base.accuracy;
  let recoil = base.recoil;
  let range = base.range;
  let mobility = base.mobility;
  let control = base.control;

  // Apply attachments
  for(const slot in selectedAttachments){
    const att = selectedAttachments[slot];
    if(!att) continue;
    if(att.damage) damage = damage + att.damage;
    if(att.fireRate) fireRate = fireRate + att.fireRate;
    if(att.accuracy) accuracy = accuracy + att.accuracy;
    if(att.recoil) recoil = recoil + att.recoil;
    if(att.range) range = range + att.range;
    if(att.mobility) mobility = mobility + att.mobility;
    if(att.control) control = control + att.control;

    // Some attachments in DB use names like accuracyMod or recoilMod; support both
    if(att.accuracyMod) accuracy += att.accuracyMod;
    if(att.recoilMod) recoil += att.recoilMod;
    if(att.damageMod) damage += att.damageMod;
    if(att.fireRateMod) fireRate += att.fireRateMod;
    if(att.rangeMod) range += att.rangeMod;
    if(att.mobilityMod) mobility += att.mobilityMod;
    if(att.controlMod) control += att.controlMod;
  }

  // Clamp reasonable ranges (for display)
  damage = Math.round(clamp(damage, 0, MAX.damage) * 10) / 10;
  fireRate = Math.round(clamp(fireRate, 0, MAX.fireRate) * 10) / 10;
  accuracy = Math.round(clamp(accuracy, 0, MAX.accuracy) * 10) / 10;
  recoil = Math.round(clamp(recoil, 0, MAX.recoil) * 10) / 10;
  range = Math.round(clamp(range, 0, MAX.range) * 10) / 10;
  mobility = Math.round(clamp(mobility, 0, MAX.mobility) * 10) / 10;
  control = Math.round(clamp(control, 0, MAX.control) * 10) / 10;

  // Update numeric readouts
  nums.damage.textContent = damage;
  nums.fireRate.textContent = fireRate;
  nums.accuracy.textContent = accuracy;
  nums.recoil.textContent = recoil;
  nums.range.textContent = range;
  nums.mobility.textContent = mobility;
  nums.control.textContent = control;

  // Bars: for recoil we invert visually (lower recoil = better)
  const barDamage = percent(damage, MAX.damage);
  const barFire = percent(fireRate, MAX.fireRate);
  const barAccuracy = percent(accuracy, MAX.accuracy);
  const barRecoil = percent(MAX.recoil - recoil, MAX.recoil); // invert
  const barRange = percent(range, MAX.range);
  const barMob = percent(mobility, MAX.mobility);
  const barControl = percent(control, MAX.control);

  // apply widths
  bars.damage.style.width = barDamage + '%';
  bars.fireRate.style.width = barFire + '%';
  bars.accuracy.style.width = barAccuracy + '%';
  bars.recoil.style.width = barRecoil + '%';
  bars.range.style.width = barRange + '%';
  bars.mobility.style.width = barMob + '%';
  bars.control.style.width = barControl + '%';

  // apply classes for style
  const style = viewStyleEl.value === 'mono' ? 'mono' : 'green';
  Object.values(bars).forEach(b => {
    b.className = 'bar ' + style;
  });

  // Preview render
  renderPreview();
}

// -------------------------
// Preview render (list attachments)
 // -------------------------
function renderPreview(){
  if(!currentWeapon) { previewListEl.innerHTML = 'No weapon selected.'; return; }
  const parts = [];
  parts.push(`<div style="font-weight:700;color:var(--accent)">${currentWeapon.name}</div>`);
  for(const slot in selectedAttachments){
    const a = selectedAttachments[slot] || {name:'None'};
    parts.push(`<div class="slot-line" style="color:var(--muted);font-size:13px">${slot}: <span style="color:var(--accent)">${a.name}</span></div>`);
  }
  // Show calculated "Precision" line as an extra stat line to help the user
  const accuracy = parseFloat(nums.accuracy.textContent) || 0;
  const recoil = parseFloat(nums.recoil.textContent) || 0;
  const precision = Math.round(((accuracy * 2) - (recoil * 0.5)) * 10) / 10;
  parts.push(`<div style="margin-top:8px;color:var(--muted)">Precision (calc): <strong style="color:var(--accent)">${precision}</strong></div>`);
  previewListEl.innerHTML = parts.join('');
}

// -------------------------
// Save / Load builds (localStorage)
// -------------------------
function saveCurrentBuild(){
  if(!currentWeapon) return alert('Select a weapon first.');
  const build = {
    id: currentWeapon.id,
    name: currentWeapon.name,
    category: currentWeapon.category,
    attachments: selectedAttachments,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem('dmz_last_build', JSON.stringify(build));
  // history (keep last 10)
  const arr = JSON.parse(localStorage.getItem('dmz_build_history') || '[]');
  arr.unshift(build);
  localStorage.setItem('dmz_build_history', JSON.stringify(arr.slice(0,10)));
  loadSavedBuilds();
  alert('Build saved locally.');
}

function loadLastBuild(){
  const raw = localStorage.getItem('dmz_last_build');
  if(!raw) return alert('No saved build.');
  const b = JSON.parse(raw);
  // find weapon and select
  selectWeapon(b.id);
  // try to map attachments by name (best-effort)
  for(const slot in b.attachments){
    const name = b.attachments[slot].name || b.attachments[slot];
    const opts = currentWeapon.attachments[slot] || [];
    const idx = opts.findIndex(o => o.name === name);
    if(idx >= 0){
      selectedAttachments[slot] = opts[idx];
      const sel = document.querySelector(`select[data-slot="${slot}"]`);
      if(sel) sel.value = idx;
    }
  }
  updateStatsAndPreview();
  alert('Build loaded.');
}

function loadSavedBuilds(){
  const arr = JSON.parse(localStorage.getItem('dmz_build_history') || '[]');
  savedBuildsEl.innerHTML = '';
  if(arr.length === 0){ savedBuildsEl.innerHTML = '<div style="color:var(--muted)">No saved builds.</div>'; return; }
  arr.forEach((b, i) => {
    const el = document.createElement('div');
    el.className = 'saved-item';
    el.innerHTML = `<div style="flex:1"><strong>${b.name}</strong><div style="font-size:12px;color:var(--muted)">${new Date(b.timestamp).toLocaleString()}</div></div>`;
    const btn = document.createElement('button'); btn.textContent = 'Load';
    btn.onclick = () => {
      // on load, choose that weapon and try to apply attachments
      selectWeapon(b.id);
      for(const slot in b.attachments){
        const name = b.attachments[slot].name || b.attachments[slot];
        const opts = currentWeapon.attachments[slot] || [];
        const idx = opts.findIndex(o => o.name === name);
        if(idx >= 0){
          selectedAttachments[slot] = opts[idx];
          const sel = document.querySelector(`select[data-slot="${slot}"]`);
          if(sel) sel.value = idx;
        }
      }
      updateStatsAndPreview();
    };
    el.appendChild(btn);
    savedBuildsEl.appendChild(el);
  });
}

// -------------------------
// Event wiring
// -------------------------
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    renderWeaponList();
  });
});

viewStyleEl.addEventListener('change', () => updateStatsAndPreview());
saveBtn.addEventListener('click', saveCurrentBuild);
loadBtn.addEventListener('click', loadLastBuild);
resetBtn.addEventListener('click', () => {
  if(!currentWeapon) return;
  // reset selects to first option
  for(const slot in currentWeapon.attachments){
    const sel = document.querySelector(`select[data-slot="${slot}"]`);
    if(sel) sel.value = 0;
  }
  // reset selectedAttachments
  for(const slot in currentWeapon.attachments){
    selectedAttachments[slot] = currentWeapon.attachments[slot][0];
  }
  updateStatsAndPreview();
});

// init
renderWeaponList();
loadSavedBuilds();

// If you want to auto-select the first weapon in the category by default:
// const first = WEAPONS.find(w => w.category === currentCategory);
// if(first) selectWeapon(first.id);
