import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

/**
 * 3D Menggu Art Color Palette (Soft Pastel Clay + Translucent Quartz)
 * Aesthetic signature: Warm butter yellow, mint green, lavender lilac, sky blue, peach coral, quartz cyan.
 */
export const MENGGU_PALETTE = {
  butterYellow: 0xfef08a,
  softMint: 0xbbf7d0,
  lavenderLilac: 0xddd6fe,
  skyBlue: 0xbae6fd,
  peachCoral: 0xfecdd3,
  quartzCyan: 0x22d3ee,
  warmWhite: 0xf8fafc,
  charcoalSlate: 0x1e293b,
  deepNavy: 0x0f172a,
  goldAccent: 0xfbbf24,
  emeraldAccent: 0x34d399,
  neonRose: 0xf43f5e,
};

/**
 * Helper to generate soft clay PBR material
 */
export function createMengguMaterial(
  color: number,
  roughness = 0.42,
  metalness = 0.08,
  options?: {
    emissive?: number;
    emissiveIntensity?: number;
    transparent?: boolean;
    opacity?: number;
  }
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    emissive: options?.emissive ?? 0x000000,
    emissiveIntensity: options?.emissiveIntensity ?? 0,
    transparent: options?.transparent ?? false,
    opacity: options?.opacity ?? 1.0,
  });
}

/**
 * Helper to generate translucent quartz / crystal material
 */
export function createMengguQuartzMaterial(
  color = MENGGU_PALETTE.quartzCyan,
  opacity = 0.72
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.35,
    roughness: 0.1,
    metalness: 0.15,
    transmission: 0.6,
    transparent: true,
    opacity,
    ior: 1.52,
  });
}

// ============================================================================
// 1. 3D DISTRICT SPATIAL (Metropolis Blocks, Monorail Track, Biophilic Trees)
// ============================================================================
export function createMengguDistrict(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MengguSpatialDistrict';

  // Base Ground Platform (Pastel Warm Clay Slate)
  const groundGeo = new THREE.CylinderGeometry(85, 88, 2, 48);
  const groundMat = createMengguMaterial(0x1e293b, 0.65, 0.1);
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -1;
  ground.receiveShadow = true;
  group.add(ground);

  // Soft Pastel Paver Grid
  const gridHelper = new THREE.GridHelper(150, 30, MENGGU_PALETTE.quartzCyan, 0x334155);
  gridHelper.position.y = 0.05;
  group.add(gridHelper);

  // Elevated Monorail Ring Track
  const trackCurve = new THREE.EllipseCurve(0, 0, 48, 48, 0, 2 * Math.PI, false, 0);
  const trackPoints = trackCurve.getPoints(64).map((p) => new THREE.Vector3(p.x, 14, p.y));
  const trackPath = new THREE.CatmullRomCurve3(trackPoints, true);
  const trackGeo = new THREE.TubeGeometry(trackPath, 64, 0.45, 8, true);
  const trackMat = createMengguMaterial(MENGGU_PALETTE.lavenderLilac, 0.3, 0.2);
  const monorailTrack = new THREE.Mesh(trackGeo, trackMat);
  group.add(monorailTrack);

  // Monorail Support Pylons
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const px = Math.cos(angle) * 48;
    const pz = Math.sin(angle) * 48;

    const pylonGeo = new THREE.CylinderGeometry(0.7, 1.2, 14, 16);
    const pylonMat = createMengguMaterial(MENGGU_PALETTE.warmWhite, 0.4, 0.05);
    const pylon = new THREE.Mesh(pylonGeo, pylonMat);
    pylon.position.set(px, 7, pz);
    group.add(pylon);

    // Glowing collar ring
    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.15, 8, 16),
      new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.quartzCyan })
    );
    collar.rotation.x = Math.PI / 2;
    collar.position.set(px, 13.5, pz);
    group.add(collar);
  }

  // Animated Bubble Monorail Pods (2 units)
  const podsGroup = new THREE.Group();
  podsGroup.name = 'AnimatedMonorailPods';
  for (let i = 0; i < 2; i++) {
    const pod = new THREE.Group();
    pod.name = `BubblePod_${i}`;
    const podBody = new THREE.Mesh(
      new THREE.CapsuleGeometry(1.6, 3.8, 16, 24),
      createMengguMaterial(MENGGU_PALETTE.butterYellow, 0.25, 0.05)
    );
    podBody.rotation.z = Math.PI / 2;
    pod.add(podBody);

    // Bubble glass canopy
    const glass = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 20, 20),
      createMengguQuartzMaterial(MENGGU_PALETTE.skyBlue, 0.8)
    );
    glass.scale.set(1.4, 0.9, 0.9);
    pod.add(glass);

    pod.position.set(i === 0 ? 48 : -48, 14.8, 0);
    pod.rotation.y = i === 0 ? 0 : Math.PI;
    podsGroup.add(pod);
  }
  group.add(podsGroup);

  // Biophilic Crystal Trees along avenue
  const treePositions = [
    [-30, 20], [-25, 32], [-18, 38],
    [30, 20], [25, 32], [18, 38],
    [-35, -20], [35, -20],
  ];

  treePositions.forEach(([tx, tz]) => {
    const tree = new THREE.Group();
    tree.position.set(tx, 0, tz);

    // Rounded trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.6, 3.5, 12),
      createMengguMaterial(0x78716c, 0.8, 0.0)
    );
    trunk.position.y = 1.75;
    tree.add(trunk);

    // Luminescent pastel foliage spheres (Menggu soft puffy style)
    const foliageMat = createMengguMaterial(MENGGU_PALETTE.softMint, 0.35, 0.0, {
      emissive: MENGGU_PALETTE.softMint,
      emissiveIntensity: 0.18,
    });
    const mainFoliage = new THREE.Mesh(new THREE.SphereGeometry(2.1, 16, 16), foliageMat);
    mainFoliage.position.y = 4.5;
    tree.add(mainFoliage);

    const subFoliage = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 14, 14),
      createMengguMaterial(MENGGU_PALETTE.peachCoral, 0.3, 0.0)
    );
    subFoliage.position.set(0.9, 5.2, 0.5);
    tree.add(subFoliage);

    group.add(tree);
  });

  return group;
}

// ============================================================================
// 2. LANDMARKS & GEDUNG: CRYSTAL CITADEL & AI SPIRE TOWER
// ============================================================================
export function createMengguCitadelTower(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MengguCitadelTower';

  // Base Tier 1: Rounded hexagonal pavilion
  const tier1Geo = new THREE.CylinderGeometry(14, 16, 10, 6);
  const tier1Mat = createMengguMaterial(MENGGU_PALETTE.lavenderLilac, 0.38, 0.1);
  const tier1 = new THREE.Mesh(tier1Geo, tier1Mat);
  tier1.position.y = 5;
  tier1.castShadow = true;
  group.add(tier1);

  // Tier 1 Soft Glow Windows Ring
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const wx = Math.cos(angle) * 14.2;
    const wz = Math.sin(angle) * 14.2;
    const win = new THREE.Mesh(
      new THREE.BoxGeometry(4.5, 5, 0.4),
      new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.quartzCyan })
    );
    win.position.set(wx, 5, wz);
    win.rotation.y = -angle + Math.PI / 2;
    group.add(win);
  }

  // Tier 2: Mid-tower Body (Butter Yellow Soft Clay)
  const tier2Geo = new THREE.CylinderGeometry(9.5, 12.5, 18, 6);
  const tier2Mat = createMengguMaterial(MENGGU_PALETTE.butterYellow, 0.35, 0.08);
  const tier2 = new THREE.Mesh(tier2Geo, tier2Mat);
  tier2.position.y = 19;
  tier2.castShadow = true;
  group.add(tier2);

  // Observation Ring Deck
  const deckGeo = new THREE.CylinderGeometry(12, 10, 2.2, 32);
  const deckMat = createMengguMaterial(MENGGU_PALETTE.warmWhite, 0.25, 0.15);
  const deck = new THREE.Mesh(deckGeo, deckMat);
  deck.position.y = 29;
  group.add(deck);

  // Deck Glass Balustrade
  const balustrade = new THREE.Mesh(
    new THREE.TorusGeometry(11.8, 0.2, 8, 32),
    new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.quartzCyan })
  );
  balustrade.rotation.x = Math.PI / 2;
  balustrade.position.y = 30.2;
  group.add(balustrade);

  // Tier 3: Upper Tower Core
  const tier3Geo = new THREE.CylinderGeometry(5.5, 8.5, 16, 6);
  const tier3Mat = createMengguMaterial(MENGGU_PALETTE.skyBlue, 0.3, 0.1);
  const tier3 = new THREE.Mesh(tier3Geo, tier3Mat);
  tier3.position.y = 38;
  group.add(tier3);

  // Translucent Quartz Spire (Top Crystal)
  const spireGeo = new THREE.ConeGeometry(4.2, 22, 6);
  const spireMat = createMengguQuartzMaterial(MENGGU_PALETTE.quartzCyan, 0.85);
  const spire = new THREE.Mesh(spireGeo, spireMat);
  spire.position.y = 57;
  group.add(spire);

  // Floating Crown Energy Ring (Orbiting beacon)
  const crownRing = new THREE.Mesh(
    new THREE.TorusGeometry(6.5, 0.35, 12, 32),
    new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.goldAccent })
  );
  crownRing.rotation.x = Math.PI / 2.3;
  crownRing.position.y = 52;
  crownRing.name = 'CitadelCrownRing';
  group.add(crownRing);

  // Helix Pedestrian Ramp winding up Tier 1 to Tier 2
  const helixPoints: THREE.Vector3[] = [];
  for (let t = 0; t <= Math.PI * 4; t += 0.2) {
    const r = 16 - (t / (Math.PI * 4)) * 4.5;
    const y = 1 + (t / (Math.PI * 4)) * 26;
    helixPoints.push(new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r));
  }
  const helixCurve = new THREE.CatmullRomCurve3(helixPoints);
  const helixGeo = new THREE.TubeGeometry(helixCurve, 64, 0.65, 8, false);
  const helixMat = createMengguMaterial(MENGGU_PALETTE.warmWhite, 0.3, 0.1);
  const helixMesh = new THREE.Mesh(helixGeo, helixMat);
  group.add(helixMesh);

  // Orbiting Courier Drones (Menggu friendly round drones)
  const dronesGroup = new THREE.Group();
  dronesGroup.name = 'CitadelDrones';
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const drone = new THREE.Group();
    const dBody = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 16, 16),
      createMengguMaterial(MENGGU_PALETTE.warmWhite, 0.25, 0.05)
    );
    drone.add(dBody);

    const dEye = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 12, 12),
      new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.quartzCyan })
    );
    dEye.position.set(0, 0, 0.65);
    drone.add(dEye);

    // Propeller halo
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.06, 8, 16),
      new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.butterYellow })
    );
    halo.rotation.x = Math.PI / 2;
    halo.position.y = 0.55;
    drone.add(halo);

    drone.position.set(Math.cos(angle) * 18, 34 + i * 4, Math.sin(angle) * 18);
    dronesGroup.add(drone);
  }
  group.add(dronesGroup);

  return group;
}

// ============================================================================
// 3. AI PLAZA & FLOATING HOLOGRAPHIC FOUNTAIN
// ============================================================================
export function createMengguPlazaFountain(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MengguPlazaFountain';

  // Terraced Circular Plaza Base
  const baseTiers = [
    { radius: 22, height: 0.6, y: 0.3, color: MENGGU_PALETTE.warmWhite },
    { radius: 17, height: 0.8, y: 0.9, color: MENGGU_PALETTE.softMint },
    { radius: 11, height: 1.0, y: 1.7, color: MENGGU_PALETTE.skyBlue },
  ];

  baseTiers.forEach((tier) => {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(tier.radius, tier.radius + 0.5, tier.height, 36),
      createMengguMaterial(tier.color, 0.4, 0.08)
    );
    mesh.position.y = tier.y;
    mesh.receiveShadow = true;
    group.add(mesh);
  });

  // Central Basin Pool (Reflective Water)
  const poolWaterGeo = new THREE.CylinderGeometry(8.5, 8.5, 0.4, 32);
  const poolWaterMat = new THREE.MeshPhysicalMaterial({
    color: 0x06b6d4,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.7,
    transparent: true,
    opacity: 0.85,
    ior: 1.33,
  });
  const poolWater = new THREE.Mesh(poolWaterGeo, poolWaterMat);
  poolWater.position.y = 2.1;
  group.add(poolWater);

  // Floating Holographic Lotus Emitter
  const lotusGroup = new THREE.Group();
  lotusGroup.name = 'FloatingLotus';
  lotusGroup.position.y = 4.2;

  // Lotus Petals (Clay Pastel Lilac & Peach)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const petalGeo = new THREE.SphereGeometry(1.6, 16, 16);
    petalGeo.scale(0.5, 1.2, 0.3);
    const petalMat = createMengguMaterial(
      i % 2 === 0 ? MENGGU_PALETTE.lavenderLilac : MENGGU_PALETTE.peachCoral,
      0.3,
      0.05,
      { emissive: MENGGU_PALETTE.lavenderLilac, emissiveIntensity: 0.25 }
    );
    const petal = new THREE.Mesh(petalGeo, petalMat);
    petal.position.set(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
    petal.rotation.y = -angle;
    petal.rotation.x = 0.5;
    lotusGroup.add(petal);
  }

  // Central Hologram Orb
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 24, 24),
    createMengguQuartzMaterial(MENGGU_PALETTE.quartzCyan, 0.9)
  );
  lotusGroup.add(orb);
  group.add(lotusGroup);

  // Floating Water Droplet Particles (Pastel Spheres)
  const dropletsGroup = new THREE.Group();
  dropletsGroup.name = 'FountainDroplets';
  for (let i = 0; i < 18; i++) {
    const drop = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 12, 12),
      createMengguQuartzMaterial(MENGGU_PALETTE.skyBlue, 0.85)
    );
    const rad = 2 + Math.random() * 5;
    const ang = Math.random() * Math.PI * 2;
    drop.position.set(Math.cos(ang) * rad, 2.8 + Math.random() * 3.5, Math.sin(ang) * rad);
    dropletsGroup.add(drop);
  }
  group.add(dropletsGroup);

  // Curved Pastel Plaza Benches (4 benches surrounding)
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const bx = Math.cos(angle) * 14.5;
    const bz = Math.sin(angle) * 14.5;

    const bench = new THREE.Mesh(
      new THREE.BoxGeometry(4.5, 0.8, 1.4),
      createMengguMaterial(MENGGU_PALETTE.butterYellow, 0.35, 0.05)
    );
    bench.position.set(bx, 1.3, bz);
    bench.rotation.y = -angle + Math.PI / 2;
    group.add(bench);
  }

  // Friendly Menggu AI Concierge Bot standing at plaza entrance
  const botGroup = new THREE.Group();
  botGroup.name = 'PlazaAiConcierge';
  botGroup.position.set(0, 0.9, 18.5);

  const botBody = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.7, 1.2, 16, 16),
    createMengguMaterial(MENGGU_PALETTE.warmWhite, 0.3, 0.05)
  );
  botBody.position.y = 1.6;
  botGroup.add(botBody);

  // Smiling Visor
  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.45, 0.3),
    new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.deepNavy })
  );
  visor.position.set(0, 2.0, 0.6);
  botGroup.add(visor);

  // Cute Glowing Eyes
  const eyeL = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 8, 8),
    new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.quartzCyan })
  );
  eyeL.position.set(-0.22, 2.0, 0.76);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.22;
  botGroup.add(eyeL, eyeR);

  // Hologram Welcoming Sign
  const holoHalo = new THREE.Mesh(
    new THREE.TorusGeometry(0.65, 0.08, 8, 24),
    new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.butterYellow })
  );
  holoHalo.rotation.x = Math.PI / 2;
  holoHalo.position.y = 2.75;
  botGroup.add(holoHalo);

  group.add(botGroup);

  return group;
}

// ============================================================================
// 4. FLOATING CURVED BILLBOARD ADS 3D & VIDEOTRON
// ============================================================================
export function createMengguBillboardAds(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'MengguCurvedBillboardAds';

  // Floating Support Pylons (Twin Arch)
  const pylonMat = createMengguMaterial(MENGGU_PALETTE.charcoalSlate, 0.3, 0.2);
  const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.2, 22, 16), pylonMat);
  leftLeg.position.set(-11, 11, 0);
  const rightLeg = leftLeg.clone();
  rightLeg.position.set(11, 11, 0);
  group.add(leftLeg, rightLeg);

  // Curved Screen Frame (Rounded Pastel Clay)
  const frameGeo = new THREE.CylinderGeometry(18, 18, 11, 32, 1, true, -Math.PI / 4, Math.PI / 2);
  const frameMat = createMengguMaterial(MENGGU_PALETTE.lavenderLilac, 0.3, 0.05);
  const frame = new THREE.Mesh(frameGeo, frameMat);
  frame.position.set(0, 22, -8);
  group.add(frame);

  // Animated Videotron Texture Canvas
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const renderAdContent = () => {
    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1e1b4b');
    grad.addColorStop(1, '#0284c7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Neon Border
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, 984, 472);

    // Header Badge
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(50, 48, 380, 56);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 30px system-ui, sans-serif';
    ctx.fillText('⚡ ALLPHA 3D SPATIAL ADS', 70, 88);

    // Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px system-ui, sans-serif';
    ctx.fillText('MENGGU 3D ART UNIVERSE', 50, 200);

    // Subtitle
    ctx.fillStyle = '#bae6fd';
    ctx.font = '36px system-ui, sans-serif';
    ctx.fillText('Live Videotron • 14 Canonical Themes • GLB Spatial', 50, 260);

    // Metric Badges
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillRect(50, 310, 420, 120);
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 42px system-ui, sans-serif';
    ctx.fillText('24.3K Avatars Online', 75, 375);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px system-ui, sans-serif';
    ctx.fillText('Crystal City Central Hub', 75, 410);

    // CTA Button
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(520, 335, 420, 80);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px system-ui, sans-serif';
    ctx.fillText('SPONSOR BILLBOARD ➔', 555, 388);
  };
  renderAdContent();

  const adTexture = new THREE.CanvasTexture(canvas);
  adTexture.colorSpace = THREE.SRGBColorSpace;

  // Curved Screen Surface
  const screenGeo = new THREE.CylinderGeometry(17.9, 17.9, 10.2, 32, 1, true, -Math.PI / 4 + 0.02, Math.PI / 2 - 0.04);
  const screenMat = new THREE.MeshBasicMaterial({
    map: adTexture,
    side: THREE.DoubleSide,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 22, -8);
  group.add(screen);

  // Broadcast Projector Drones hovering at corners
  const dronePositions = [[-14, 28, 4], [14, 28, 4]];
  dronePositions.forEach(([dx, dy, dz]) => {
    const drone = new THREE.Group();
    drone.position.set(dx, dy, dz);

    const b = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 16, 16),
      createMengguMaterial(MENGGU_PALETTE.warmWhite, 0.25, 0.05)
    );
    drone.add(b);

    const camLens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16),
      new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.neonRose })
    );
    camLens.rotation.x = Math.PI / 2;
    camLens.position.set(0, 0, 1.0);
    drone.add(camLens);

    group.add(drone);
  });

  return group;
}

// ============================================================================
// 5. MODULAR 3D TENANT BOOTH (Retail, Brand Exhibition, Digital Fashion)
// ============================================================================
export function createMengguTenantBooth(config?: {
  name?: string;
  category?: string;
  themeColor?: number;
}): THREE.Group {
  const brandName = config?.name ?? 'MENGGU BOUTIQUE';
  const categoryName = config?.category ?? 'Digital Fashion 3D';
  const accentColor = config?.themeColor ?? MENGGU_PALETTE.peachCoral;

  const group = new THREE.Group();
  group.name = `MengguBooth_${brandName.replace(/\s+/g, '_')}`;

  // Rounded Podium Base
  const baseGeo = new THREE.CylinderGeometry(5.2, 5.5, 0.6, 32);
  const baseMat = createMengguMaterial(MENGGU_PALETTE.warmWhite, 0.35, 0.05);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.3;
  base.receiveShadow = true;
  group.add(base);

  // Glowing Base Border Ring
  const borderRing = new THREE.Mesh(
    new THREE.TorusGeometry(5.3, 0.12, 8, 32),
    new THREE.MeshBasicMaterial({ color: accentColor })
  );
  borderRing.rotation.x = Math.PI / 2;
  borderRing.position.y = 0.62;
  group.add(borderRing);

  // Arched Canopy Roof (Pastel Clay)
  const archGeo = new THREE.TorusGeometry(3.8, 0.4, 16, 32, Math.PI);
  const archMat = createMengguMaterial(accentColor, 0.35, 0.08);
  const arch = new THREE.Mesh(archGeo, archMat);
  arch.position.y = 4.0;
  group.add(arch);

  // Booth Back Wall with Neon Trim
  const wallGeo = new THREE.BoxGeometry(6.5, 4.0, 0.5);
  const wallMat = createMengguMaterial(MENGGU_PALETTE.lavenderLilac, 0.4, 0.05);
  const wall = new THREE.Mesh(wallGeo, wallMat);
  wall.position.set(0, 2.6, -2.4);
  group.add(wall);

  // Glowing Brand Neon Sign Header
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512;
  signCanvas.height = 256;
  const sCtx = signCanvas.getContext('2d')!;
  sCtx.fillStyle = '#0f172a';
  sCtx.fillRect(0, 0, 512, 256);
  sCtx.strokeStyle = '#' + accentColor.toString(16).padStart(6, '0');
  sCtx.lineWidth = 10;
  sCtx.strokeRect(10, 10, 492, 236);

  sCtx.fillStyle = '#ffffff';
  sCtx.font = 'bold 44px system-ui, sans-serif';
  sCtx.textAlign = 'center';
  sCtx.fillText(brandName, 256, 110);

  sCtx.fillStyle = '#' + accentColor.toString(16).padStart(6, '0');
  sCtx.font = '28px system-ui, sans-serif';
  sCtx.fillText(categoryName, 256, 175);

  const signTex = new THREE.CanvasTexture(signCanvas);
  signTex.colorSpace = THREE.SRGBColorSpace;
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.8, 2.4),
    new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide })
  );
  signMesh.position.set(0, 5.4, 0);
  group.add(signMesh);

  // Service Counter
  const counterGeo = new THREE.CylinderGeometry(2.4, 2.4, 1.4, 24, 1, false, -Math.PI / 2, Math.PI);
  const counterMat = createMengguMaterial(MENGGU_PALETTE.butterYellow, 0.3, 0.05);
  const counter = new THREE.Mesh(counterGeo, counterMat);
  counter.position.set(0, 1.3, 0.5);
  counter.rotation.y = Math.PI / 2;
  group.add(counter);

  // Holographic Showcase Pedestal (Center floating gem)
  const gemMesh = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.1),
    createMengguQuartzMaterial(accentColor, 0.85)
  );
  gemMesh.position.set(0, 2.8, -0.6);
  gemMesh.name = 'BoothShowcaseGem';
  group.add(gemMesh);

  return group;
}

// ============================================================================
// 6. ARTICULATED AVATAR 3D MENGGU (Humanoid Companion with Visor & Backpack)
// ============================================================================
export function createMengguAvatar(config?: {
  suitColor?: number;
  visorColor?: number;
  accessoryColor?: number;
}): THREE.Group {
  const suitColor = config?.suitColor ?? MENGGU_PALETTE.butterYellow;
  const visorColor = config?.visorColor ?? MENGGU_PALETTE.quartzCyan;
  const accColor = config?.accessoryColor ?? MENGGU_PALETTE.lavenderLilac;

  const group = new THREE.Group();
  group.name = 'MengguArticulatedAvatar';

  // Contact Shadow
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.2, 32),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.4 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  group.add(shadow);

  // Pelvis & Legs Group
  const legsGroup = new THREE.Group();
  legsGroup.name = 'AvatarLegs';
  legsGroup.position.y = 1.3;

  const legGeo = new THREE.CapsuleGeometry(0.28, 1.3, 12, 16);
  const legMat = createMengguMaterial(MENGGU_PALETTE.charcoalSlate, 0.4, 0.05);

  const leftLeg = new THREE.Mesh(legGeo, legMat);
  leftLeg.position.set(-0.45, 0, 0);
  const rightLeg = new THREE.Mesh(legGeo, legMat);
  rightLeg.position.set(0.45, 0, 0);

  // Cute Rounded Shoes (Pastel Peach)
  const shoeGeo = new THREE.CapsuleGeometry(0.32, 0.5, 12, 12);
  const shoeMat = createMengguMaterial(MENGGU_PALETTE.peachCoral, 0.35, 0.05);
  const leftShoe = new THREE.Mesh(shoeGeo, shoeMat);
  leftShoe.position.set(-0.45, -0.85, 0.15);
  leftShoe.rotation.x = Math.PI / 2;
  const rightShoe = leftShoe.clone();
  rightShoe.position.x = 0.45;

  legsGroup.add(leftLeg, rightLeg, leftShoe, rightShoe);
  group.add(legsGroup);

  // Torso (Puffy Menggu Jacket)
  const torsoGroup = new THREE.Group();
  torsoGroup.name = 'AvatarTorso';
  torsoGroup.position.y = 3.0;

  const jacketGeo = new THREE.CapsuleGeometry(0.85, 1.2, 16, 20);
  const jacketMat = createMengguMaterial(suitColor, 0.35, 0.05);
  const jacket = new THREE.Mesh(jacketGeo, jacketMat);
  torsoGroup.add(jacket);

  // Glowing Chest Core (AI Neural Arc)
  const coreMat = new THREE.MeshBasicMaterial({ color: visorColor });
  const chestCore = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.2), coreMat);
  chestCore.position.set(0, 0.15, 0.78);
  torsoGroup.add(chestCore);

  // Cybernetic Jet Backpack
  const packGeo = new THREE.BoxGeometry(1.1, 1.4, 0.6);
  const packMat = createMengguMaterial(accColor, 0.35, 0.1);
  const pack = new THREE.Mesh(packGeo, packMat);
  pack.position.set(0, 0.1, -0.9);
  torsoGroup.add(pack);

  // Twin Thruster Nozzles
  const nozGeo = new THREE.CylinderGeometry(0.2, 0.28, 0.45, 12);
  const nozMat = createMengguMaterial(0x334155, 0.3, 0.2);
  const nozL = new THREE.Mesh(nozGeo, nozMat);
  nozL.position.set(-0.35, -0.7, -0.9);
  const nozR = nozL.clone();
  nozR.position.x = 0.35;
  torsoGroup.add(nozL, nozR);

  // Arms
  const armGeo = new THREE.CapsuleGeometry(0.25, 1.1, 12, 16);
  const armMat = createMengguMaterial(suitColor, 0.35, 0.05);

  const leftArm = new THREE.Mesh(armGeo, armMat);
  leftArm.position.set(-1.15, 0, 0);
  leftArm.rotation.z = 0.15;

  const rightArm = new THREE.Mesh(armGeo, armMat);
  rightArm.position.set(1.15, 0, 0);
  rightArm.rotation.z = -0.15;
  torsoGroup.add(leftArm, rightArm);

  group.add(torsoGroup);

  // Head (Chubby Menggu Spherical Head)
  const headGroup = new THREE.Group();
  headGroup.name = 'AvatarHead';
  headGroup.position.y = 4.8;

  const headGeo = new THREE.SphereGeometry(1.05, 24, 24);
  const headMat = createMengguMaterial(MENGGU_PALETTE.warmWhite, 0.35, 0.02);
  const head = new THREE.Mesh(headGeo, headMat);
  headGroup.add(head);

  // Curved Glass Visor (Menggu signature)
  const visorGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.55, 24, 1, false, -Math.PI / 3, (Math.PI * 2) / 3);
  const visorMat = new THREE.MeshPhysicalMaterial({
    color: visorColor,
    emissive: visorColor,
    emissiveIntensity: 0.5,
    roughness: 0.1,
    transmission: 0.4,
    transparent: true,
    opacity: 0.9,
  });
  const visor = new THREE.Mesh(visorGeo, visorMat);
  visor.position.set(0, 0.1, 0.3);
  visor.rotation.y = Math.PI / 2;
  headGroup.add(visor);

  // Headphones / Antennas (Left & Right)
  const earGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16);
  const earMat = createMengguMaterial(accColor, 0.3, 0.1);
  const earL = new THREE.Mesh(earGeo, earMat);
  earL.rotation.z = Math.PI / 2;
  earL.position.set(-1.15, 0, 0);
  const earR = earL.clone();
  earR.position.x = 1.15;
  headGroup.add(earL, earR);

  // Top Halo / Antenna
  const antenna = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 12, 12),
    new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.goldAccent })
  );
  antenna.position.set(0, 1.25, 0);
  headGroup.add(antenna);

  group.add(headGroup);

  return group;
}

// ============================================================================
// 7. 14 CANONICAL CATEGORY 3D THEME MODELS (PRD Section 53)
// ============================================================================
export function createCanonicalModelByCategory(categoryId: number): THREE.Group {
  const group = new THREE.Group();
  group.name = `CanonicalThemeCategory_${categoryId}`;

  switch (categoryId) {
    case 1: // Fashion & Wearables
      {
        const podium = new THREE.Mesh(
          new THREE.CylinderGeometry(2.5, 2.7, 0.4, 24),
          createMengguMaterial(MENGGU_PALETTE.warmWhite)
        );
        group.add(podium);
        const jacket = new THREE.Mesh(
          new THREE.CapsuleGeometry(1.1, 1.8, 16, 20),
          createMengguMaterial(MENGGU_PALETTE.butterYellow, 0.3)
        );
        jacket.position.y = 2.2;
        group.add(jacket);
        // Collar & lapels
        const collar = new THREE.Mesh(
          new THREE.TorusGeometry(1.0, 0.25, 12, 24, Math.PI),
          createMengguMaterial(MENGGU_PALETTE.lavenderLilac)
        );
        collar.position.set(0, 3.2, 0.2);
        group.add(collar);
      }
      break;

    case 2: // AI Pets & Companions
      {
        // Robotic Shiba / Kitty Pet
        const body = new THREE.Mesh(
          new THREE.CapsuleGeometry(0.9, 1.4, 16, 16),
          createMengguMaterial(MENGGU_PALETTE.butterYellow)
        );
        body.rotation.z = Math.PI / 2;
        body.position.y = 1.3;
        group.add(body);
        const head = new THREE.Mesh(
          new THREE.SphereGeometry(0.9, 16, 16),
          createMengguMaterial(MENGGU_PALETTE.warmWhite)
        );
        head.position.set(1.1, 2.2, 0);
        group.add(head);
        // Pointy ears
        const earL = new THREE.Mesh(
          new THREE.ConeGeometry(0.35, 0.7, 12),
          createMengguMaterial(MENGGU_PALETTE.peachCoral)
        );
        earL.position.set(1.1, 3.1, -0.45);
        const earR = earL.clone();
        earR.position.z = 0.45;
        group.add(earL, earR);
        // Visor eyes
        const eyeVisor = new THREE.Mesh(
          new THREE.BoxGeometry(0.2, 0.3, 0.9),
          new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.quartzCyan })
        );
        eyeVisor.position.set(1.9, 2.2, 0);
        group.add(eyeVisor);
      }
      break;

    case 3: // District & Architecture
      return createMengguCitadelTower();

    case 4: // Vehicles & Flycraft
      {
        // Hover Speeder Pod
        const speederBody = new THREE.Mesh(
          new THREE.CapsuleGeometry(1.2, 3.6, 16, 24),
          createMengguMaterial(MENGGU_PALETTE.skyBlue, 0.25, 0.1)
        );
        speederBody.rotation.z = Math.PI / 2;
        speederBody.position.y = 1.6;
        group.add(speederBody);

        const cockpit = new THREE.Mesh(
          new THREE.SphereGeometry(1.1, 16, 16),
          createMengguQuartzMaterial(MENGGU_PALETTE.quartzCyan, 0.8)
        );
        cockpit.scale.set(1.4, 0.8, 0.8);
        cockpit.position.set(0.4, 2.2, 0);
        group.add(cockpit);

        // Swept Wings
        const wingL = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 0.15, 2.4),
          createMengguMaterial(MENGGU_PALETTE.butterYellow)
        );
        wingL.position.set(-0.6, 1.5, -2.0);
        const wingR = wingL.clone();
        wingR.position.z = 2.0;
        group.add(wingL, wingR);
      }
      break;

    case 5: // Cybernetic Gear & Exosuits
      {
        // Cybernetic Power Gauntlet
        const foreArm = new THREE.Mesh(
          new THREE.CylinderGeometry(0.9, 0.7, 2.6, 16),
          createMengguMaterial(MENGGU_PALETTE.charcoalSlate, 0.3, 0.2)
        );
        foreArm.position.y = 1.6;
        group.add(foreArm);

        // Power Core Rings
        for (let i = 0; i < 3; i++) {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(0.95, 0.12, 8, 20),
            new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.quartzCyan })
          );
          ring.rotation.x = Math.PI / 2;
          ring.position.y = 0.8 + i * 0.7;
          group.add(ring);
        }
      }
      break;

    case 6: // Furniture & Interior
      {
        // Futuristic Bubble Egg Lounge Chair
        const pod = new THREE.Mesh(
          new THREE.SphereGeometry(1.8, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.75),
          createMengguMaterial(MENGGU_PALETTE.lavenderLilac, 0.3)
        );
        pod.rotation.x = Math.PI / 4;
        pod.position.y = 1.8;
        group.add(pod);

        const cushion = new THREE.Mesh(
          new THREE.SphereGeometry(1.3, 16, 16),
          createMengguMaterial(MENGGU_PALETTE.butterYellow, 0.4)
        );
        cushion.position.set(0, 1.4, 0.4);
        group.add(cushion);

        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.9, 1.2, 16),
          createMengguMaterial(0xffffff, 0.2, 0.3)
        );
        leg.position.y = 0.6;
        group.add(leg);
      }
      break;

    case 7: // Weapons & Energy Props
      {
        // Holographic Beam Wand / Scepter
        const staff = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18, 0.25, 4.2, 16),
          createMengguMaterial(MENGGU_PALETTE.warmWhite, 0.3, 0.1)
        );
        staff.position.y = 2.1;
        group.add(staff);

        const orb = new THREE.Mesh(
          new THREE.SphereGeometry(0.7, 16, 16),
          createMengguQuartzMaterial(MENGGU_PALETTE.quartzCyan, 0.8)
        );
        orb.position.y = 4.4;
        group.add(orb);

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(1.1, 0.1, 8, 24),
          new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.goldAccent })
        );
        ring.position.y = 4.4;
        group.add(ring);
      }
      break;

    case 8: // Art & Hologram Statues
      {
        // Abstract Möbius Holographic Sculpture
        const torusKnot = new THREE.Mesh(
          new THREE.TorusKnotGeometry(1.2, 0.35, 64, 16, 2, 3),
          createMengguQuartzMaterial(MENGGU_PALETTE.peachCoral, 0.85)
        );
        torusKnot.position.y = 2.5;
        group.add(torusKnot);

        const pedestal = new THREE.Mesh(
          new THREE.CylinderGeometry(1.5, 1.8, 0.8, 16),
          createMengguMaterial(MENGGU_PALETTE.charcoalSlate, 0.3, 0.1)
        );
        pedestal.position.y = 0.4;
        group.add(pedestal);
      }
      break;

    case 9: // Electronics & Gadgets
      {
        // Holo Communicator Deck
        const deck = new THREE.Mesh(
          new THREE.BoxGeometry(2.4, 0.3, 1.6),
          createMengguMaterial(MENGGU_PALETTE.charcoalSlate, 0.3, 0.1)
        );
        deck.position.y = 0.6;
        group.add(deck);

        const holoCone = new THREE.Mesh(
          new THREE.ConeGeometry(1.4, 2.2, 24, 1, true),
          createMengguQuartzMaterial(MENGGU_PALETTE.quartzCyan, 0.5)
        );
        holoCone.position.y = 1.9;
        holoCone.rotation.x = Math.PI;
        group.add(holoCone);
      }
      break;

    case 10: // Nature & Flora
      {
        // Biophilic Crystal Tree with Soft Foliage
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.35, 0.6, 2.8, 12),
          createMengguMaterial(0x78716c)
        );
        trunk.position.y = 1.4;
        group.add(trunk);

        const mainBall = new THREE.Mesh(
          new THREE.SphereGeometry(1.7, 16, 16),
          createMengguMaterial(MENGGU_PALETTE.softMint, 0.35)
        );
        mainBall.position.y = 3.6;
        const subBall = new THREE.Mesh(
          new THREE.SphereGeometry(1.1, 14, 14),
          createMengguMaterial(MENGGU_PALETTE.peachCoral, 0.35)
        );
        subBall.position.set(0.8, 4.3, 0.4);
        group.add(mainBall, subBall);
      }
      break;

    case 11: // Food & Culinary 3D
      {
        // Cyber Bento Box & Boba Tea
        const cup = new THREE.Mesh(
          new THREE.CylinderGeometry(0.65, 0.5, 1.8, 20),
          createMengguQuartzMaterial(MENGGU_PALETTE.butterYellow, 0.7)
        );
        cup.position.set(0, 1.1, 0);
        group.add(cup);

        const straw = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 2.4, 12),
          createMengguMaterial(MENGGU_PALETTE.neonRose)
        );
        straw.position.set(0.15, 1.8, 0);
        straw.rotation.z = -0.2;
        group.add(straw);
      }
      break;

    case 12: // Music & Sound Instruments
      {
        // Synth Keytar & Holographic Waves
        const keytar = new THREE.Mesh(
          new THREE.BoxGeometry(3.2, 0.4, 0.9),
          createMengguMaterial(MENGGU_PALETTE.lavenderLilac, 0.3)
        );
        keytar.position.set(0, 1.8, 0);
        keytar.rotation.z = -0.3;
        group.add(keytar);

        const neck = new THREE.Mesh(
          new THREE.BoxGeometry(1.6, 0.25, 0.4),
          createMengguMaterial(MENGGU_PALETTE.charcoalSlate)
        );
        neck.position.set(2.2, 2.5, 0);
        neck.rotation.z = -0.3;
        group.add(neck);
      }
      break;

    case 13: // Sports & Recreation
      {
        // Anti-Gravity Hoverboard
        const deck = new THREE.Mesh(
          new THREE.BoxGeometry(3.6, 0.2, 1.1),
          createMengguMaterial(MENGGU_PALETTE.skyBlue, 0.25, 0.08)
        );
        deck.position.y = 1.0;
        group.add(deck);

        const magL = new THREE.Mesh(
          new THREE.TorusGeometry(0.45, 0.1, 8, 20),
          new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.goldAccent })
        );
        magL.rotation.x = Math.PI / 2;
        magL.position.set(-1.1, 0.7, 0);
        const magR = magL.clone();
        magR.position.x = 1.1;
        group.add(magL, magR);
      }
      break;

    case 14: // Space & Celestial Relics
    default:
      {
        // Floating Chrono Artifact with Orbiting Rings
        const core = new THREE.Mesh(
          new THREE.DodecahedronGeometry(1.2),
          createMengguQuartzMaterial(MENGGU_PALETTE.goldAccent, 0.9)
        );
        core.position.y = 2.4;
        group.add(core);

        const ring1 = new THREE.Mesh(
          new THREE.TorusGeometry(2.0, 0.1, 8, 32),
          new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.quartzCyan })
        );
        ring1.position.y = 2.4;
        ring1.rotation.x = Math.PI / 3;

        const ring2 = new THREE.Mesh(
          new THREE.TorusGeometry(2.4, 0.08, 8, 32),
          new THREE.MeshBasicMaterial({ color: MENGGU_PALETTE.lavenderLilac })
        );
        ring2.position.y = 2.4;
        ring2.rotation.y = Math.PI / 4;

        group.add(ring1, ring2);
      }
      break;
  }

  return group;
}

// ============================================================================
// 8. GLB BINARY EXPORT FUNCTIONALITY (Direct browser binary download)
// ============================================================================
export async function exportObjectToGLB(object: THREE.Object3D, fileName = 'menggu_asset.glb'): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      object,
      (gltf) => {
        if (gltf instanceof ArrayBuffer) {
          const blob = new Blob([gltf], { type: 'model/gltf-binary' });
          resolve(blob);
        } else {
          const output = JSON.stringify(gltf, null, 2);
          const blob = new Blob([output], { type: 'application/json' });
          resolve(blob);
        }
      },
      (error) => {
        console.error('Error generating GLB asset:', error);
        reject(error);
      },
      {
        binary: true,
        onlyVisible: true,
        embedImages: true,
      }
    );
  });
}

/**
 * Triggers a real browser file download for a generated GLB
 */
export function downloadGLBBlob(blob: Blob, filename = 'menggu_asset.glb') {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
