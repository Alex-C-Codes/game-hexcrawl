import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Each block represents 5ft × 5ft × 5ft of real space.
export const SCALE_FT = 5;

export const BLOCKS = {
  floor:     { label: 'Floor',     color: '#7a6a58', hex: 0x7a6a58, cat: 'Terrain'   },
  stone:     { label: 'Wall',      color: '#383530', hex: 0x383530, cat: 'Terrain'   },
  corridor:  { label: 'Corridor',  color: '#5a4a38', hex: 0x5a4a38, cat: 'Terrain'   },
  water:     { label: 'Water',     color: '#1a4060', hex: 0x1a4060, cat: 'Terrain'   },
  lava:      { label: 'Lava',      color: '#8a2a0a', hex: 0x8a2a0a, cat: 'Terrain'   },
  pillar:    { label: 'Pillar',    color: '#4a4840', hex: 0x4a4840, cat: 'Structure'  },
  bars:      { label: 'Iron Bars', color: '#585858', hex: 0x585858, cat: 'Structure'  },
  stairs:    { label: 'Stairs',    color: '#8a7050', hex: 0x8a7050, cat: 'Structure'  },
  // Door ― : thin in Z → appears as a horizontal line from above; use in N-S corridors
  door:      { label: 'Door ―',   color: '#8a5530', hex: 0x8a5530, cat: 'Structure', geo: 'door_h' },
  // Door | : thin in X → appears as a vertical line from above; use in E-W corridors
  door_v:    { label: 'Door |',    color: '#8a5530', hex: 0x8a5530, cat: 'Structure', geo: 'door_v' },
  altar:     { label: 'Altar',     color: '#5a3a7a', hex: 0x5a3a7a, cat: 'Feature'   },
  chest:     { label: 'Chest',     color: '#8a7018', hex: 0x8a7018, cat: 'Feature'   },
  trap:      { label: 'Trap',      color: '#7a2a2a', hex: 0x7a2a2a, cat: 'Feature'   },
  entry:     { label: 'Entry',     color: '#2a6a2a', hex: 0x2a6a2a, cat: 'Markers'   },
  exit_tile: { label: 'Exit',      color: '#6a2a2a', hex: 0x6a2a2a, cat: 'Markers'   },
};

export const BLOCK_CATS = ['Terrain', 'Structure', 'Feature', 'Markers'];

export class VoxelEditor {
  constructor(container, callbacks = {}) {
    this.container    = container;
    this.callbacks    = callbacks;
    this.tool         = 'rect';
    this.block        = 'floor';
    this.paintY       = 0;
    this._voxels      = new Map();
    this._meshes      = new Map();
    this._undoStack   = [];
    this._redoStack   = [];
    this._mouse       = { down: false, lastKey: null };
    this._rectState   = null;
    this._panState    = null;  // { worldStart, camStart, targetStart }
    this._spacePanning = false;

    this._setup();
    this._initFloor();
    this._initGhost();
    this._initRectGhost();
    this._initEvents();
    this._loop();
  }

  // ─── Three.js setup ──────────────────────────────────────────────────────────

  _setup() {
    const W = this.container.clientWidth  || 800;
    const H = this.container.clientHeight || 600;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x090910);
    this.scene.fog = new THREE.Fog(0x090910, 40, 100);

    this.camera = new THREE.PerspectiveCamera(28, W / H, 0.1, 200);
    this.camera.position.set(8, 40, 8);
    this.camera.up.set(0, 0, -1);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(W, H);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Strong ambient keeps shadows soft; key light casts them
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const key = new THREE.DirectionalLight(0xfff5e8, 1.1);
    key.position.set(2, 4, 1.5);
    key.castShadow = true;
    key.shadow.mapSize.setScalar(1024);
    key.shadow.camera.near = 0.1;
    key.shadow.camera.far  = 120;
    key.shadow.camera.left = key.shadow.camera.bottom = -30;
    key.shadow.camera.right = key.shadow.camera.top   =  30;
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xd0e8ff, 0.35);
    fill.position.set(-2, 2, -2);
    this.scene.add(fill);

    // Grid – offset 0.5 so lines land at block edges, not block centres
    const grid = new THREE.GridHelper(40, 40, 0x181820, 0x141418);
    grid.position.set(0.5, -0.501, 0.5);
    this.scene.add(grid);

    // OrbitControls – left click is handled entirely by our own code
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(8, 0, 8);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance   = 3;
    this.controls.maxDistance   = 120;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
    this.controls.mouseButtons  = {
      LEFT:   null,              // we own left-click
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT:  THREE.MOUSE.ROTATE,
    };
    this.controls.update();

    this.raycaster = new THREE.Raycaster();

    // Shared geometry + per-type materials
    this._geo  = new THREE.BoxGeometry(1, 1, 1);
    // Special geometries keyed by block `geo` field
    this._specialGeos = {
      door_h: new THREE.BoxGeometry(0.9, 0.9, 0.1), // thin in Z → horizontal line from above
      door_v: new THREE.BoxGeometry(0.1, 0.9, 0.9), // thin in X → vertical line from above
    };
    this._mats = {};
    for (const [key, def] of Object.entries(BLOCKS)) {
      this._mats[key] = new THREE.MeshLambertMaterial({ color: def.hex });
    }

    this._ro = new ResizeObserver(() => {
      const W2 = this.container.clientWidth;
      const H2 = this.container.clientHeight;
      this.camera.aspect = W2 / H2;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(W2, H2);
    });
    this._ro.observe(this.container);
  }

  _initFloor() {
    const mat = new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide });
    this._floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), mat);
    this._floorMesh.rotation.x = -Math.PI / 2;
    this._floorMesh.position.y = -0.5;
    this.scene.add(this._floorMesh);
  }

  _initGhost() {
    const mat = new THREE.MeshLambertMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    this._ghost = new THREE.Mesh(this._geo, mat);
    this._ghost.visible = false;
    this.scene.add(this._ghost);

    const edgeMat = new THREE.LineBasicMaterial({ color: 0xc9a84c, opacity: 0.8, transparent: true });
    this._ghostEdge = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.02, 1.02, 1.02)),
      edgeMat
    );
    this._ghostEdge.visible = false;
    this.scene.add(this._ghostEdge);
  }

  _initRectGhost() {
    const fillMat = new THREE.MeshBasicMaterial({
      color: 0xc9a84c,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this._rectFill = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), fillMat);
    this._rectFill.rotation.x = -Math.PI / 2;
    this._rectFill.visible = false;
    this.scene.add(this._rectFill);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(4 * 3), 3));
    this._rectLine = new THREE.LineLoop(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0xc9a84c })
    );
    this._rectLine.visible = false;
    this.scene.add(this._rectLine);
  }

  _initEvents() {
    const el = this.renderer.domElement;
    el.style.cursor = 'crosshair';

    el.addEventListener('pointermove',  e => this._onMove(e));
    el.addEventListener('pointerdown',  e => this._onDown(e));
    el.addEventListener('pointerup',    e => this._onUp(e));
    el.addEventListener('pointerleave', () => {
      this._mouse.down  = false;
      this._panState    = null;
      this._ghost.visible     = false;
      this._ghostEdge.visible = false;
      if (this._rectState) {
        this._rectState = null;
        this._hideRectGhost();
      }
    });
    el.addEventListener('contextmenu', e => e.preventDefault());

    // Spacebar — temporary pan while held, from any tool
    this._spaceKeyDown = e => {
      if (e.code !== 'Space' || e.repeat || e.target.tagName === 'INPUT') return;
      e.preventDefault();
      if (!this._spacePanning && this.tool !== 'pan') {
        this._spacePanning = true;
        el.style.cursor = 'grab';
      }
    };
    this._spaceKeyUp = e => {
      if (e.code !== 'Space' || !this._spacePanning) return;
      this._spacePanning = false;
      this._panState = null;
      el.style.cursor = this.tool === 'pan' ? 'grab' : 'crosshair';
    };
    window.addEventListener('keydown', this._spaceKeyDown);
    window.addEventListener('keyup',   this._spaceKeyUp);
  }

  // ─── Picking ─────────────────────────────────────────────────────────────────

  _setRay(clientX, clientY) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const nx   = ((clientX - rect.left) / rect.width)  * 2 - 1;
    const ny   = -((clientY - rect.top)  / rect.height) * 2 + 1;
    this.raycaster.setFromCamera({ x: nx, y: ny }, this.camera);
  }

  // Voxel meshes first, then ground plane fallback.
  _pick(clientX, clientY) {
    this._setRay(clientX, clientY);

    const hits = this.raycaster.intersectObjects([...this._meshes.values()]);
    if (hits.length > 0) {
      const h    = hits[0];
      const vpos = h.object.userData.pos;
      const fn   = h.face.normal;
      return {
        type:   'block',
        place:  { x: vpos.x + Math.round(fn.x), y: vpos.y + Math.round(fn.y), z: vpos.z + Math.round(fn.z) },
        remove: vpos,
      };
    }

    const gHits = this.raycaster.intersectObject(this._floorMesh);
    if (gHits.length > 0) {
      const p = gHits[0].point;
      return {
        type:   'ground',
        place:  { x: Math.round(p.x), y: this.paintY, z: Math.round(p.z) },
        remove: null,
      };
    }

    return null;
  }

  // Ground-plane only — used by pan tool and for updating rect end-corner during drag.
  _pickGround(clientX, clientY) {
    this._setRay(clientX, clientY);
    const hits = this.raycaster.intersectObject(this._floorMesh);
    if (hits.length > 0) {
      const p = hits[0].point;
      return { x: Math.round(p.x), z: Math.round(p.z) };
    }
    return null;
  }

  // Rect drag start: check top face of existing blocks first so the rect can
  // stack on top of an existing layer; fall back to ground plane at paintY.
  _pickRectStart(clientX, clientY) {
    this._setRay(clientX, clientY);
    const hits = this.raycaster.intersectObjects([...this._meshes.values()]);
    if (hits.length > 0) {
      const h  = hits[0];
      const fn = h.face.normal;
      if (fn.y > 0.5) {
        // Top face hit — place one layer above
        const vpos = h.object.userData.pos;
        return { x: Math.round(h.point.x), z: Math.round(h.point.z), y: vpos.y + 1 };
      }
    }
    const gHits = this.raycaster.intersectObject(this._floorMesh);
    if (gHits.length > 0) {
      const p = gHits[0].point;
      return { x: Math.round(p.x), z: Math.round(p.z), y: this.paintY };
    }
    return null;
  }

  // Returns the Y=0 world-space point under (clientX, clientY) for panning.
  _pickY0(clientX, clientY) {
    this._setRay(clientX, clientY);
    const { origin, direction } = this.raycaster.ray;
    if (Math.abs(direction.y) < 0.0001) return null;
    const t = -origin.y / direction.y;
    if (t < 0) return null;
    return new THREE.Vector3(
      origin.x + direction.x * t,
      0,
      origin.z + direction.z * t
    );
  }

  // ─── Pan helpers ─────────────────────────────────────────────────────────────

  _startPan(clientX, clientY) {
    const worldPos = this._pickY0(clientX, clientY);
    if (!worldPos) return;
    this._panState = {
      worldStart:  worldPos,
      camStart:    this.camera.position.clone(),
      targetStart: this.controls.target.clone(),
    };
  }

  _doPan(clientX, clientY) {
    if (!this._panState) return;
    const worldNow = this._pickY0(clientX, clientY);
    if (!worldNow) return;
    // Keep the world point under the cursor fixed — drag the world behind the mouse
    const delta = this._panState.worldStart.clone().sub(worldNow);
    delta.y = 0;
    this.camera.position.copy(this._panState.camStart).add(delta);
    this.controls.target.copy(this._panState.targetStart).add(delta);
    this.controls.update();
  }

  // ─── Mouse handlers ──────────────────────────────────────────────────────────

  _isPanMode() { return this._spacePanning || this.tool === 'pan'; }

  _onMove(e) {
    if (this._isPanMode()) {
      this._ghost.visible = this._ghostEdge.visible = false;
      this._doPan(e.clientX, e.clientY);
      return;
    }
    if (this.tool === 'rect') { this._onMoveRect(e); return; }

    const pick    = this._pick(e.clientX, e.clientY);
    const isErase = this.tool === 'erase';

    if (pick) {
      const pos = isErase ? pick.remove : pick.place;
      if (pos) {
        this._ghost.position.set(pos.x, pos.y, pos.z);
        this._ghostEdge.position.copy(this._ghost.position);
        this._ghost.material.color.setHex(isErase ? 0xc05040 : 0xc9a84c);
        this._ghost.visible     = true;
        this._ghostEdge.visible = true;
      } else {
        this._ghost.visible = this._ghostEdge.visible = false;
      }

      if (this._mouse.down) {
        const actionPos = isErase ? pick.remove : pick.place;
        if (actionPos) {
          const k = `${actionPos.x},${actionPos.y},${actionPos.z}`;
          if (k !== this._mouse.lastKey) {
            this._mouse.lastKey = k;
            if (isErase && pick.remove) this._doRemove(pick.remove);
            else if (!isErase) this._doPlace(pick.place);
          }
        }
      }
    } else {
      this._ghost.visible = this._ghostEdge.visible = false;
    }
  }

  _onMoveRect(e) {
    if (this._rectState) {
      // Drag in progress — update XZ end corner only; Y is locked from mousedown
      const p = this._pickGround(e.clientX, e.clientY);
      if (!p) return;
      this._rectState.endX = p.x;
      this._rectState.endZ = p.z;
      this._ghost.visible = this._ghostEdge.visible = false;
      this._updateRectGhost();
    } else {
      // Hover — show single-block preview at the surface we'd start on
      const p = this._pickRectStart(e.clientX, e.clientY);
      if (!p) {
        this._ghost.visible = this._ghostEdge.visible = false;
        return;
      }
      this._ghost.position.set(p.x, p.y, p.z);
      this._ghostEdge.position.copy(this._ghost.position);
      this._ghost.material.color.setHex(0xc9a84c);
      this._ghost.visible     = true;
      this._ghostEdge.visible = true;
      this._hideRectGhost();
    }
  }

  _onDown(e) {
    if (e.button !== 0) return;

    if (this._isPanMode()) {
      this._startPan(e.clientX, e.clientY);
      this.renderer.domElement.style.cursor = 'grabbing';
      return;
    }

    if (this.tool === 'rect') {
      const p = this._pickRectStart(e.clientX, e.clientY);
      if (p) {
        this._mouse.down = true;
        this._rectState  = { startX: p.x, startZ: p.z, endX: p.x, endZ: p.z, y: p.y };
        this._ghost.visible = this._ghostEdge.visible = false;
        this._updateRectGhost();
      }
      return;
    }

    this._mouse.down    = true;
    this._mouse.lastKey = null;
    const pick    = this._pick(e.clientX, e.clientY);
    const isErase = this.tool === 'erase';
    if (!pick) return;
    if (isErase && pick.remove) {
      this._doRemove(pick.remove);
      this._mouse.lastKey = `${pick.remove.x},${pick.remove.y},${pick.remove.z}`;
    } else if (!isErase && pick.place) {
      this._doPlace(pick.place);
      this._mouse.lastKey = `${pick.place.x},${pick.place.y},${pick.place.z}`;
    }
  }

  _onUp(e) {
    if (e.button !== 0) return;

    if (this._isPanMode()) {
      this._panState = null;
      this.renderer.domElement.style.cursor = 'grab';
      return;
    }

    if (this.tool === 'rect' && this._rectState) {
      const { startX, startZ, endX, endZ, y } = this._rectState;
      this._commitRect(startX, startZ, endX, endZ, y);
      this._rectState = null;
      this._hideRectGhost();
      this._mouse.down = false;
      return;
    }

    this._mouse.down    = false;
    this._mouse.lastKey = null;
  }

  // ─── Rect ghost helpers ──────────────────────────────────────────────────────

  _updateRectGhost() {
    if (!this._rectState) return;
    const { startX, startZ, endX, endZ } = this._rectState;
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minZ = Math.min(startZ, endZ);
    const maxZ = Math.max(startZ, endZ);
    const cx = (minX + maxX) / 2;
    const cz = (minZ + maxZ) / 2;
    const y  = (this._rectState.y ?? this.paintY) + 0.502;

    this._rectFill.scale.set(maxX - minX + 1, maxZ - minZ + 1, 1);
    this._rectFill.position.set(cx, y, cz);
    this._rectFill.visible = true;

    const attr = this._rectLine.geometry.attributes.position;
    attr.setXYZ(0, minX - 0.5, y + 0.001, minZ - 0.5);
    attr.setXYZ(1, maxX + 0.5, y + 0.001, minZ - 0.5);
    attr.setXYZ(2, maxX + 0.5, y + 0.001, maxZ + 0.5);
    attr.setXYZ(3, minX - 0.5, y + 0.001, maxZ + 0.5);
    attr.needsUpdate = true;
    this._rectLine.visible = true;
  }

  _hideRectGhost() {
    this._rectFill.visible = false;
    this._rectLine.visible = false;
  }

  // ─── Block operations ────────────────────────────────────────────────────────

  _key(p) { return `${p.x},${p.y},${p.z}`; }

  _doPlace(pos) {
    if (!pos) return;
    const k   = this._key(pos);
    const old = this._voxels.get(k) ?? null;
    if (old === this.block) return;
    this._applyPlace(pos, this.block);
    this._undoStack.push({ op: 'place', pos: { ...pos }, newB: this.block, oldB: old });
    this._redoStack = [];
    this._notifyHistory();
  }

  _doRemove(pos) {
    if (!pos) return;
    const k   = this._key(pos);
    const old = this._voxels.get(k);
    if (!old) return;
    this._applyRemove(pos);
    this._undoStack.push({ op: 'remove', pos: { ...pos }, oldB: old });
    this._redoStack = [];
    this._notifyHistory();
  }

  _commitRect(x0, z0, x1, z1, y = this.paintY) {
    const minX = Math.min(x0, x1), maxX = Math.max(x0, x1);
    const minZ = Math.min(z0, z1), maxZ = Math.max(z0, z1);
    const cmds = [];
    for (let x = minX; x <= maxX; x++) {
      for (let z = minZ; z <= maxZ; z++) {
        const pos = { x, y, z };
        const k   = this._key(pos);
        const old = this._voxels.get(k) ?? null;
        if (old === this.block) continue;
        cmds.push({ op: 'place', pos: { ...pos }, newB: this.block, oldB: old });
        this._applyPlace(pos, this.block);
      }
    }
    if (cmds.length > 0) {
      this._undoStack.push({ op: 'batch', cmds });
      this._redoStack = [];
      this._notifyHistory();
    }
  }

  _applyPlace(pos, blockType) {
    const k = this._key(pos);
    if (this._meshes.has(k)) {
      this.scene.remove(this._meshes.get(k));
      this._meshes.delete(k);
    }
    const geoKey = BLOCKS[blockType]?.geo;
    const geo    = (geoKey && this._specialGeos[geoKey]) || this._geo;
    const mesh   = new THREE.Mesh(geo, this._mats[blockType]);
    mesh.position.set(pos.x, pos.y, pos.z);
    mesh.userData.pos  = { ...pos };
    mesh.castShadow    = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    this._voxels.set(k, blockType);
    this._meshes.set(k, mesh);
  }

  _applyRemove(pos) {
    const k = this._key(pos);
    if (this._meshes.has(k)) {
      this.scene.remove(this._meshes.get(k));
      this._meshes.delete(k);
    }
    this._voxels.delete(k);
  }

  _notifyHistory() {
    this.callbacks.onHistory?.({
      canUndo: this._undoStack.length > 0,
      canRedo: this._redoStack.length > 0,
    });
  }

  // ─── Undo / redo ─────────────────────────────────────────────────────────────

  _undoCmd(cmd) {
    if (cmd.op === 'batch') {
      for (const c of [...cmd.cmds].reverse()) this._undoCmd(c);
    } else if (cmd.op === 'place') {
      if (cmd.oldB) this._applyPlace(cmd.pos, cmd.oldB);
      else          this._applyRemove(cmd.pos);
    } else {
      this._applyPlace(cmd.pos, cmd.oldB);
    }
  }

  _redoCmd(cmd) {
    if (cmd.op === 'batch') {
      for (const c of cmd.cmds) this._redoCmd(c);
    } else if (cmd.op === 'place') {
      this._applyPlace(cmd.pos, cmd.newB);
    } else {
      this._applyRemove(cmd.pos);
    }
  }

  undo() {
    if (!this._undoStack.length) return;
    const cmd = this._undoStack.pop();
    this._redoStack.push(cmd);
    this._undoCmd(cmd);
    this._notifyHistory();
  }

  redo() {
    if (!this._redoStack.length) return;
    const cmd = this._redoStack.pop();
    this._undoStack.push(cmd);
    this._redoCmd(cmd);
    this._notifyHistory();
  }

  // ─── Public API ──────────────────────────────────────────────────────────────

  setTool(t) {
    if (t !== 'rect' && this._rectState) {
      this._rectState = null;
      this._hideRectGhost();
    }
    this.tool = t;
    this.renderer.domElement.style.cursor = t === 'pan' ? 'grab' : 'crosshair';
  }

  setBlock(b)  { this.block  = b; }
  setPaintY(y) { this.paintY = y; }

  clear() {
    for (const mesh of this._meshes.values()) this.scene.remove(mesh);
    this._meshes.clear();
    this._voxels.clear();
    this._undoStack = [];
    this._redoStack = [];
    this._rectState = null;
    this._panState  = null;
    this._hideRectGhost();
    this._notifyHistory();
  }

  toJSON() {
    const voxels = [];
    for (const [k, b] of this._voxels) {
      const [x, y, z] = k.split(',').map(Number);
      voxels.push({ x, y, z, b });
    }
    return { voxels };
  }

  fromJSON(data) {
    this.clear();
    for (const { x, y, z, b } of (data?.voxels ?? [])) {
      if (BLOCKS[b]) this._applyPlace({ x, y, z }, b);
    }
    this._notifyHistory();
  }

  // ─── Render loop ─────────────────────────────────────────────────────────────

  _loop() {
    this._rafId = requestAnimationFrame(() => this._loop());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    cancelAnimationFrame(this._rafId);
    this._ro.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
    window.removeEventListener('keydown', this._spaceKeyDown);
    window.removeEventListener('keyup',   this._spaceKeyUp);
  }
}
