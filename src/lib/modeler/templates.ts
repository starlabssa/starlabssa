/**
 * STAR Labs Modeler — Template definitions
 *
 * Two template kinds:
 *   - 'heightmap' templates take an image input and emboss it into a 3D form.
 *   - 'vase' templates are fully parametric (no image input).
 */

import type { HeightmapOptions } from './heightmap';
import type { VaseOptions } from './vase';

export type ParamSchema = {
  key: string;
  label: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  default: number;
  hint?: string;
};

type CommonFields = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  printOrientation: string;
  printingTips: string[];
  adjustableParams: ParamSchema[];
};

export type HeightmapTemplate = CommonFields & {
  kind: 'heightmap';
  defaults: HeightmapOptions;
  lockAspect: boolean;
};

export type VaseTemplate = CommonFields & {
  kind: 'vase';
  defaults: VaseOptions;
};

export type Template = HeightmapTemplate | VaseTemplate;

export const TEMPLATES: Record<string, Template> = {
  bookmark: {
    kind: 'heightmap',
    id: 'bookmark',
    name: 'Bookmark',
    tagline: 'A printed bookmark with your image embossed in relief.',
    description:
      'Slim, flexible bookmark with a tassel hole at the top. Your image is embossed across the body. Best printed in a single color — contrast comes from the relief, not the print.',
    icon: 'BookMarked',
    defaults: {
      widthMM: 40,
      heightMM: 140,
      baseMM: 1.2,
      reliefMM: 0.8,
      resolution: 280,
      invert: false,
      shape: { kind: 'rounded', cornerRadiusMM: 6 },
      holes: [{ x: 20, y: 130, radius: 2 }],
    },
    lockAspect: false,
    printOrientation: 'Flat on the build plate, image side up.',
    printingTips: [
      '0.12 mm layer height for crisp relief',
      'Single color, single material — works in any filament',
      '15–20% infill is plenty; this part is small',
      'No supports needed',
    ],
    adjustableParams: [
      { key: 'widthMM', label: 'Width', unit: 'mm', min: 25, max: 60, step: 1, default: 40 },
      { key: 'heightMM', label: 'Length', unit: 'mm', min: 100, max: 200, step: 5, default: 140 },
      { key: 'baseMM', label: 'Base thickness', unit: 'mm', min: 0.8, max: 2.5, step: 0.1, default: 1.2, hint: 'Thicker = sturdier, less flexible.' },
      { key: 'reliefMM', label: 'Relief depth', unit: 'mm', min: 0.3, max: 1.5, step: 0.1, default: 0.8, hint: 'How tall the embossed image stands above the base.' },
      { key: 'resolution', label: 'Detail', min: 150, max: 400, step: 10, default: 280, hint: 'Higher = finer detail, larger file.' },
    ],
  },

  keychain: {
    kind: 'heightmap',
    id: 'keychain',
    name: 'Keychain',
    tagline: 'A compact keychain tag with your image in relief.',
    description:
      'Small, durable tag with a key ring hole. Rounded rectangle by default. Best for sharp, high-contrast images — small features get lost at this size.',
    icon: 'KeyRound',
    defaults: {
      widthMM: 40,
      heightMM: 50,
      baseMM: 2.0,
      reliefMM: 1.0,
      resolution: 220,
      invert: false,
      shape: { kind: 'rounded', cornerRadiusMM: 4 },
      holes: [{ x: 6, y: 44, radius: 2.5 }],
    },
    lockAspect: false,
    printOrientation: 'Flat on the build plate, image side up.',
    printingTips: [
      '0.16 mm layer height is fine for this scale',
      'PETG or PLA+ recommended — survives in pockets',
      '30% infill for durability',
      'No supports needed',
    ],
    adjustableParams: [
      { key: 'widthMM', label: 'Width', unit: 'mm', min: 25, max: 60, step: 1, default: 40 },
      { key: 'heightMM', label: 'Height', unit: 'mm', min: 25, max: 60, step: 1, default: 50 },
      { key: 'baseMM', label: 'Base thickness', unit: 'mm', min: 1.5, max: 4.0, step: 0.1, default: 2.0, hint: 'Keychains take abuse — keep it thick.' },
      { key: 'reliefMM', label: 'Relief depth', unit: 'mm', min: 0.4, max: 2.0, step: 0.1, default: 1.0 },
      { key: 'resolution', label: 'Detail', min: 120, max: 320, step: 10, default: 220 },
    ],
  },

  portrait: {
    kind: 'heightmap',
    id: 'portrait',
    name: 'Portrait',
    tagline: 'A lithophane portrait — best viewed against light.',
    description:
      'Vertical relief panel optimized for faces and photos. Defaults to lithophane mode (dark pixels stand tall) so the image reveals itself when backlit. Mount on a stand or place against a window.',
    icon: 'User',
    defaults: {
      widthMM: 70,
      heightMM: 100,
      baseMM: 0.6,
      reliefMM: 2.4,
      resolution: 360,
      invert: true,
      shape: { kind: 'rounded', cornerRadiusMM: 4 },
      holes: [],
    },
    lockAspect: false,
    printOrientation: 'Vertical, image facing the print bed. Many users print this vertically for the best layer line direction.',
    printingTips: [
      '0.08 mm layer height — finer is better for portraits',
      'White PLA produces the best lithophane effect against light',
      '100% infill — needed so light doesn\'t pass through unevenly',
      'No supports needed when printed vertically',
      'View against a window or LED light to see the image',
    ],
    adjustableParams: [
      { key: 'widthMM', label: 'Width', unit: 'mm', min: 50, max: 120, step: 1, default: 70 },
      { key: 'heightMM', label: 'Height', unit: 'mm', min: 70, max: 160, step: 1, default: 100 },
      { key: 'baseMM', label: 'Min thickness', unit: 'mm', min: 0.4, max: 1.2, step: 0.1, default: 0.6, hint: 'Thinnest point — where the brightest pixels live. Too thin and light bleeds; too thick and dark areas lose contrast.' },
      { key: 'reliefMM', label: 'Depth range', unit: 'mm', min: 1.5, max: 4.0, step: 0.1, default: 2.4, hint: 'Total thickness variation from brightest to darkest pixel.' },
      { key: 'resolution', label: 'Detail', min: 200, max: 500, step: 10, default: 360, hint: 'Portraits benefit from high detail. 360+ recommended.' },
    ],
  },

  coaster: {
    kind: 'heightmap',
    id: 'coaster',
    name: 'Coaster',
    tagline: 'A round drink coaster with your image embossed on top.',
    description:
      'Thick round disc, sized for mugs and glasses. Your image sits in subtle relief on the upper surface. Functional — drinks rest on the high points of the image. Prints flat with no supports.',
    icon: 'Coffee',
    defaults: {
      widthMM: 95,
      heightMM: 95,
      baseMM: 3.5,
      reliefMM: 0.6,
      resolution: 320,
      invert: false,
      shape: { kind: 'ellipse' },
      holes: [],
    },
    lockAspect: true,
    printOrientation: 'Flat on the build plate, image side up.',
    printingTips: [
      '0.2 mm layer height is fine — relief is shallow on coasters',
      'PETG recommended — handles hot mugs better than PLA',
      '30% infill for thermal stability',
      'Print 4 at once to make a matching set',
      'Add a cork or felt pad to the bottom after printing',
    ],
    adjustableParams: [
      { key: 'widthMM', label: 'Diameter', unit: 'mm', min: 80, max: 110, step: 1, default: 95 },
      { key: 'baseMM', label: 'Thickness', unit: 'mm', min: 2.5, max: 5.0, step: 0.1, default: 3.5, hint: 'Thicker = more sturdy, more material.' },
      { key: 'reliefMM', label: 'Relief depth', unit: 'mm', min: 0.3, max: 1.2, step: 0.1, default: 0.6, hint: 'Keep shallow — drinks need a stable surface.' },
      { key: 'resolution', label: 'Detail', min: 200, max: 400, step: 10, default: 320 },
    ],
  },

  vase: {
    kind: 'vase',
    id: 'vase',
    name: 'Make My Vase',
    tagline: 'Craft your dream vase by clicks — parametric, no image needed.',
    description:
      'Fully parametric vase. Adjust the base, belly, neck, and rim radii to sculpt the silhouette. Add twist for a turned, spiral-vase look. Prints in vase mode for a single-shell, fast print.',
    icon: 'FlowerVase',
    defaults: {
      heightMM: 150,
      baseRadiusMM: 30,
      bellyRadiusMM: 55,
      neckRadiusMM: 28,
      rimRadiusMM: 38,
      wallMM: 1.6,
      twistDeg: 0,
      segments: 96,
      rings: 80,
    },
    printOrientation: 'Upright on the build plate. Print in vase / spiralize mode for best results — single-wall extrusion.',
    printingTips: [
      'Vase mode (single outer wall) gives the fastest, watertight print',
      '0.2–0.3 mm layer height — taller layers smooth the silhouette',
      'PLA or PETG; silk PLA looks great with twist > 0',
      '0% infill, 0 top layers when using vase mode',
      'Not food-safe as printed — line with a glass tube for fresh flowers',
    ],
    adjustableParams: [
      { key: 'heightMM', label: 'Height', unit: 'mm', min: 60, max: 250, step: 1, default: 150 },
      { key: 'baseRadiusMM', label: 'Base radius', unit: 'mm', min: 15, max: 70, step: 0.5, default: 30, hint: 'Wider base = more stable, less elegant.' },
      { key: 'bellyRadiusMM', label: 'Belly radius', unit: 'mm', min: 25, max: 90, step: 0.5, default: 55, hint: 'Widest point of the silhouette.' },
      { key: 'neckRadiusMM', label: 'Neck radius', unit: 'mm', min: 15, max: 70, step: 0.5, default: 28, hint: 'Narrowest point above the belly.' },
      { key: 'rimRadiusMM', label: 'Rim radius', unit: 'mm', min: 15, max: 70, step: 0.5, default: 38, hint: 'Opening at the top.' },
      { key: 'wallMM', label: 'Wall thickness', unit: 'mm', min: 0.8, max: 3.5, step: 0.1, default: 1.6 },
      { key: 'twistDeg', label: 'Twist', unit: '°', min: 0, max: 720, step: 5, default: 0, hint: 'Total rotation from base to rim. 0 = straight.' },
      { key: 'segments', label: 'Detail', min: 32, max: 192, step: 8, default: 96, hint: 'Higher = smoother curve, larger file.' },
    ],
  },

  coin: {
    kind: 'heightmap',
    id: 'coin',
    name: 'Coin',
    tagline: 'A medallion-style round coin with your image in raised relief.',
    description:
      'Small circular medallion, ~45 mm across. Thicker than a coaster, smaller than an ornament. No hole — meant to be held, displayed in a stand, or carried as a token. Crisp relief at this size makes silhouettes and logos pop.',
    icon: 'Circle',
    defaults: {
      widthMM: 45,
      heightMM: 45,
      baseMM: 3.0,
      reliefMM: 1.4,
      resolution: 280,
      invert: false,
      shape: { kind: 'ellipse' },
      holes: [],
    },
    lockAspect: true,
    printOrientation: 'Flat on the build plate, image side up.',
    printingTips: [
      '0.12 mm layer height for sharp detail at this small size',
      'Silk or metallic PLA gives a "minted" finish',
      '40% infill — coins should feel substantial',
      'Print on a smooth build plate (PEI or glass) for a clean back face',
      'Make a stand by gluing the coin upright on a small printed base',
    ],
    adjustableParams: [
      { key: 'widthMM', label: 'Diameter', unit: 'mm', min: 30, max: 70, step: 1, default: 45 },
      { key: 'baseMM', label: 'Thickness', unit: 'mm', min: 2.0, max: 5.0, step: 0.1, default: 3.0, hint: 'Heavier coins feel more substantial.' },
      { key: 'reliefMM', label: 'Relief depth', unit: 'mm', min: 0.6, max: 2.5, step: 0.1, default: 1.4 },
      { key: 'resolution', label: 'Detail', min: 180, max: 400, step: 10, default: 280 },
    ],
  },
};

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES[id];
}

export function listTemplates(): Template[] {
  return Object.values(TEMPLATES);
}
