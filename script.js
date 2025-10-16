// Example weapon + attachments data (you’ll need to fill this out)
const weapons = [
  {
    id: 'm4',
    name: 'M4',
    base: {
      damage: 35,
      fireRate: 800,
      accuracy: 70,
      recoil: 50
    },
    attachments: {
      Optic: [
        { name: 'Red Dot', accuracyMod: +5, recoilMod: -2 },
        { name: '4× Scope', accuracyMod: +10, recoilMod: +3 }
      ],
      Muzzle: [
        { name: 'Suppressor', accuracyMod: +3, damageMod: -2 },
        { name: 'Compensator', recoilMod: -10 }
      ]
      // add more slots ...
    }
  },
  {
    id: 'taq56',
    name: 'TAQ-56',
    base: {
      damage: 38,
      fireRate: 740,
      accuracy: 65,
      recoil: 55
    },
    attachments: {
      Optic: [
        { name: 'Holo', accuracyMod: +4, recoilMod: -1 },
        { name: '8× Scope', accuracyMod: +9, recoilMod: +4 }
      ],
      Muzzle: [
        { name: 'Suppressor', accuracyMod: +2, damageMod: -3 },
        { name: 'Muzzle Brake', recoilMod: -8 }
      ]
    }
  }
  // add all weapons...
];

let currentWeapon = null;
let selectedAttachments = {};

function init() {
  const weaponList = document.getElementById('weaponList');
  weapons.forEach(w => {
    const li = document.createElement('li');
    li.textContent = w.name;
    li.onclick = () => selectWeapon(w.id);
    weaponList.appendChild(li);
  });
}

function selectWeapon(weaponId) {
  const w = weapons.find(x => x.id === weaponId);
  if (!w) return;
  currentWeapon = w;
  // reset attachments
  selectedAttachments = {};
  for (let slot in w.attachments) {
    selectedAttachments[slot] = w.attachments[slot][0].name;  // default first
  }
  renderWeaponEditor();
  updateStats();
}

function renderWeaponEditor() {
  document.getElementById('weaponName').textContent = currentWeapon.name;
  const slotsDiv = document.getElementById('attachmentSlots');
  slotsDiv.innerHTML = '';
  for (let slot in currentWeapon.attachments) {
    const sel = document.createElement('select');
    sel.dataset.slot = slot;
    currentWeapon.attachments[slot].forEach(opt => {
      const o = document.createElement('option');
      o.value = opt.name;
      o.textContent = opt.name;
      sel.appendChild(o);
    });
    sel.onchange = () => {
      selectedAttachments[slot] = sel.value;
      updateStats();
    };
    slotsDiv.appendChild(document.createTextNode(slot + ':'));
    slotsDiv.appendChild(sel);
  }
}

function updateStats() {
  if (!currentWeapon) return;
  const base = currentWeapon.base;
  let damage = base.damage;
  let fireRate = base.fireRate;
  let accuracy = base.accuracy;
  let recoil = base.recoil;

  // Apply attachments
  for (let slot in selectedAttachments) {
    const attName = selectedAttachments[slot];
    const att = currentWeapon.attachments[slot].find(a => a.name === attName);
    if (!att) continue;
    if (att.damageMod) damage += att.damageMod;
    if (att.accuracyMod) accuracy += att.accuracyMod;
    if (att.recoilMod) recoil += att.recoilMod;
    if (att.fireRateMod) fireRate += att.fireRateMod;
  }

  // Calculate an “exactitude / precision” metric
  // (This is just an example formula — you’ll want to adjust to real game logic)
  const precision = (accuracy * 2) - recoil * 0.5;

  document.getElementById('stat-damage').textContent = damage.toFixed(1);
  document.getElementById('stat-fireRate').textContent = fireRate.toFixed(1);
  document.getElementById('stat-accuracy').textContent = accuracy.toFixed(1);
  document.getElementById('stat-recoil').textContent = recoil.toFixed(1);
  document.getElementById('stat-precision').textContent = precision.toFixed(1);
}

// Start
window.onload = init;
