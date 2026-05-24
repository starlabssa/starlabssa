'use client';

/**
 * STAR Labs Modeler — Studio component
 *
 * Two flows:
 *   - heightmap templates: user uploads an image, sees a relief mesh.
 *   - vase templates: no image needed, mesh is generated from sliders only.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Template, ParamSchema } from '@/lib/modeler/templates';
import type { HeightmapOptions, Mesh } from '@/lib/modeler/heightmap';
import type { VaseOptions } from '@/lib/modeler/vase';
import { buildMesh } from '@/lib/modeler/heightmap';
import { buildVaseMesh } from '@/lib/modeler/vase';
import { meshToSTL, downloadSTL } from '@/lib/modeler/stl';

type Props = { template: Template };

const NAVY = '#0a1628';

export default function ModelerStudio({ template }: Props) {
  if (template.kind === 'vase') {
    return <VaseStudio template={template} />;
  }
  return <HeightmapStudio template={template} />;
}

/* ────────── Heightmap (image-driven) studio ────────── */

function HeightmapStudio({ template }: { template: Extract<Template, { kind: 'heightmap' }> }) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);
  const [params, setParams] = useState<HeightmapOptions>(template.defaults);
  const [mesh, setMesh] = useState<Mesh | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invert, setInvert] = useState(template.defaults.invert);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useScene(canvasContainerRef, !!image);

  useEffect(() => {
    setParams(template.defaults);
    setInvert(template.defaults.invert);
    setMesh(null);
  }, [template]);

  useEffect(() => {
    if (mesh && sceneRef.current) sceneRef.current.update(mesh);
  }, [mesh, sceneRef]);

  useEffect(() => {
    if (!image) return;
    let cancelled = false;
    setGenerating(true);
    setError(null);
    const t = setTimeout(async () => {
      try {
        const result = await buildMesh(image, { ...params, invert });
        if (!cancelled) setMesh(result);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to build model');
      } finally {
        if (!cancelled) setGenerating(false);
      }
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [image, params, invert]);

  const onFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, or WebP).');
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      setImagePreviewURL(url);
      setError(null);
    };
    img.onerror = () => setError('Could not read that image.');
    img.src = url;
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }, [onFile]);

  const onPick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  }, [onFile]);

  const onDownload = useCallback(() => {
    if (!mesh) return;
    const blob = meshToSTL(mesh, `STAR Labs Modeler — ${template.name}`);
    downloadSTL(blob, `starlabs-${template.id}-${Date.now()}`);
  }, [mesh, template]);

  const triCount = mesh ? mesh.indices.length / 3 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-px bg-neutral-200 min-h-[calc(100vh-80px)]">
      <div className="bg-white relative">
        {!image ? (
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="h-full min-h-[500px] flex flex-col items-center justify-center p-12"
          >
            <div className="max-w-md text-center">
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 border border-neutral-300 rounded-sm bg-white">
                <UploadIcon />
              </div>
              <h2 className="font-serif text-2xl text-black mb-3">Begin with an image</h2>
              <p className="text-neutral-600 mb-8 leading-relaxed">
                Drop a photo here, or pick one from your device. High-contrast images
                work best — faces, logos, line art, silhouettes.
              </p>
              <label className="inline-block">
                <input type="file" accept="image/*" onChange={onPick} className="hidden" />
                <span className="inline-block px-6 py-3 bg-black text-white text-sm font-mono uppercase tracking-wider cursor-pointer hover:bg-neutral-800 transition-colors">
                  Choose file
                </span>
              </label>
              {error && <p className="mt-6 text-sm text-red-600">{error}</p>}
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[600px] relative">
            <div ref={canvasContainerRef} className="absolute inset-0" />
            {imagePreviewURL && (
              <div className="absolute top-4 left-4 w-24 h-24 border border-neutral-300 bg-white overflow-hidden shadow-sm z-10">
                <img src={imagePreviewURL} alt="source" className="w-full h-full object-cover" />
                <label className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-xs font-mono uppercase tracking-wider text-white">
                  Replace
                  <input type="file" accept="image/*" onChange={onPick} className="hidden" />
                </label>
              </div>
            )}
            <div className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-wider text-neutral-600 z-10 bg-white/80 px-2 py-1 rounded-sm">
              {generating ? (
                <span style={{ color: NAVY }}>computing mesh…</span>
              ) : (
                <span>{triCount.toLocaleString()} triangles · drag to orbit</span>
              )}
            </div>
            {error && (
              <div className="absolute bottom-4 right-4 font-mono text-[11px] uppercase tracking-wider text-red-600 z-10">
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      <aside className="bg-white p-8 overflow-y-auto">
        <TemplateHeader template={template} />
        <div className="space-y-6">
          {template.adjustableParams.map((param) => (
            <ParamControl
              key={param.key}
              param={param}
              value={(params as unknown as Record<string, number>)[param.key]}
              onChange={(v) => setParams((prev) => ({ ...prev, [param.key]: v }))}
            />
          ))}
          <InvertToggle invert={invert} setInvert={setInvert} />
        </div>
        <DownloadBlock disabled={!mesh || generating} generating={generating} onClick={onDownload} />
        <PrintNotes template={template} />
      </aside>
    </div>
  );
}

/* ────────── Vase (parametric) studio ────────── */

function VaseStudio({ template }: { template: Extract<Template, { kind: 'vase' }> }) {
  const [params, setParams] = useState<VaseOptions>(template.defaults);
  const [mesh, setMesh] = useState<Mesh | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useScene(canvasContainerRef, true);

  useEffect(() => {
    setParams(template.defaults);
  }, [template]);

  useEffect(() => {
    if (mesh && sceneRef.current) sceneRef.current.update(mesh);
  }, [mesh, sceneRef]);

  useEffect(() => {
    let cancelled = false;
    setGenerating(true);
    setError(null);
    const t = setTimeout(() => {
      try {
        const result = buildVaseMesh(params);
        if (!cancelled) setMesh(result);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to build vase');
      } finally {
        if (!cancelled) setGenerating(false);
      }
    }, 50);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [params]);

  const onDownload = useCallback(() => {
    if (!mesh) return;
    const blob = meshToSTL(mesh, `STAR Labs Modeler — ${template.name}`);
    downloadSTL(blob, `starlabs-${template.id}-${Date.now()}`);
  }, [mesh, template]);

  const triCount = mesh ? mesh.indices.length / 3 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-px bg-neutral-200 min-h-[calc(100vh-80px)]">
      <div className="bg-white relative">
        <div className="h-full min-h-[600px] relative">
          <div ref={canvasContainerRef} className="absolute inset-0" />
          <div className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-wider text-neutral-600 z-10 bg-white/80 px-2 py-1 rounded-sm">
            {generating ? (
              <span style={{ color: NAVY }}>computing mesh…</span>
            ) : (
              <span>{triCount.toLocaleString()} triangles · drag to orbit</span>
            )}
          </div>
          {error && (
            <div className="absolute bottom-4 right-4 font-mono text-[11px] uppercase tracking-wider text-red-600 z-10">
              {error}
            </div>
          )}
        </div>
      </div>

      <aside className="bg-white p-8 overflow-y-auto">
        <TemplateHeader template={template} />
        <div className="space-y-6">
          {template.adjustableParams.map((param) => (
            <ParamControl
              key={param.key}
              param={param}
              value={(params as unknown as Record<string, number>)[param.key]}
              onChange={(v) => setParams((prev) => ({ ...prev, [param.key]: v }))}
            />
          ))}
        </div>
        <DownloadBlock disabled={!mesh || generating} generating={generating} onClick={onDownload} />
        <PrintNotes template={template} />
      </aside>
    </div>
  );
}

/* ────────── Shared Three.js scene hook ────────── */

type SceneAPI = { cleanup: () => void; update: (mesh: Mesh) => void };

function useScene(
  containerRef: React.RefObject<HTMLDivElement | null>,
  ready: boolean,
): React.MutableRefObject<SceneAPI | null> {
  const sceneRef = useRef<SceneAPI | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (!containerRef.current) return;
    if (sceneRef.current) return;

    const container = containerRef.current;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 1);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 2000);
    camera.position.set(120, 120, 180);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(60, 120, 100);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xd8e0ec, 0.5);
    fill.position.set(-60, 40, -60);
    scene.add(fill);

    const plate = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshStandardMaterial({ color: 0xdce1e8, roughness: 0.9, metalness: 0 }),
    );
    plate.rotation.x = -Math.PI / 2;
    plate.position.y = -0.5;
    scene.add(plate);

    const grid = new THREE.GridHelper(400, 40, 0x8a96a8, 0xb8c0cc);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.6;
    grid.position.y = -0.49;
    scene.add(grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 30, 0);

    let meshObj: THREE.Mesh | null = null;

    const update = (m: Mesh) => {
      if (meshObj) {
        scene.remove(meshObj);
        meshObj.geometry.dispose();
        (meshObj.material as THREE.Material).dispose();
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(m.vertices, 3));
      geom.setAttribute('normal', new THREE.BufferAttribute(m.normals, 3));
      geom.setIndex(new THREE.BufferAttribute(m.indices, 1));
      geom.computeBoundingBox();
      const bbox = geom.boundingBox!;
      const cx = (bbox.max.x + bbox.min.x) / 2;
      const cy = (bbox.max.y + bbox.min.y) / 2;
      geom.translate(-cx, -cy, 0);

      const mat = new THREE.MeshStandardMaterial({
        color: 0xfcfcfc,
        roughness: 0.5,
        metalness: 0.0,
        flatShading: false,
        side: THREE.DoubleSide,
      });
      const obj = new THREE.Mesh(geom, mat);
      obj.rotation.x = -Math.PI / 2;
      scene.add(obj);
      meshObj = obj;

      const size = Math.max(
        bbox.max.x - bbox.min.x,
        bbox.max.y - bbox.min.y,
        bbox.max.z - bbox.min.z,
      );
      const dist = size * 2.2;
      camera.position.set(dist * 0.6, dist * 0.7, dist);
      controls.target.set(0, size * 0.1, 0);
      controls.update();
    };

    let raf = 0;
    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    requestAnimationFrame(() => {
      resize();
      tick();
    });
    window.addEventListener('resize', resize);

    sceneRef.current = {
      update,
      cleanup: () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        controls.dispose();
        if (meshObj) {
          meshObj.geometry.dispose();
          (meshObj.material as THREE.Material).dispose();
        }
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      },
    };

    return () => {
      sceneRef.current?.cleanup();
      sceneRef.current = null;
    };
  }, [ready, containerRef]);

  return sceneRef;
}

/* ────────── Shared sub-components ────────── */

function TemplateHeader({ template }: { template: Template }) {
  return (
    <div className="mb-8 pb-6 border-b border-neutral-200">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
        Template
      </div>
      <h1 className="font-serif text-2xl text-black mb-3">{template.name}</h1>
      <p className="text-sm text-neutral-600 leading-relaxed">{template.tagline}</p>
    </div>
  );
}

function ParamControl({
  param,
  value,
  onChange,
}: {
  param: ParamSchema;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="font-mono text-[11px] uppercase tracking-wider text-black">
          {param.label}
        </label>
        <span className="font-mono text-[11px] tabular-nums" style={{ color: NAVY }}>
          {value.toFixed(param.step < 1 ? 1 : 0)}
          {param.unit && <span className="text-neutral-500 ml-1">{param.unit}</span>}
        </span>
      </div>
      <input
        type="range"
        min={param.min}
        max={param.max}
        step={param.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1 bg-neutral-200 appearance-none cursor-pointer"
        style={{ accentColor: NAVY }}
      />
      {param.hint && (
        <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed">{param.hint}</p>
      )}
    </div>
  );
}

function InvertToggle({ invert, setInvert }: { invert: boolean; setInvert: (fn: (v: boolean) => boolean) => void }) {
  return (
    <div className="pt-2">
      <label className="flex items-center justify-between cursor-pointer group">
        <span className="font-mono text-[11px] uppercase tracking-wider text-black">Invert</span>
        <button
          type="button"
          onClick={() => setInvert((v) => !v)}
          className="relative w-10 h-5 transition-colors"
          style={{ backgroundColor: invert ? NAVY : '#d4d4d4' }}
          aria-pressed={invert}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 bg-white transition-transform ${
              invert ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </label>
      <p className="text-xs text-neutral-500 mt-1.5">
        On = dark pixels stand tall (lithophane). Off = bright pixels stand tall (engraving).
      </p>
    </div>
  );
}

function DownloadBlock({
  disabled,
  generating,
  onClick,
}: {
  disabled: boolean;
  generating: boolean;
  onClick: () => void;
}) {
  return (
    <div className="mt-10 pt-6 border-t border-neutral-200">
      <button
        disabled={disabled}
        onClick={onClick}
        className="w-full py-3 bg-black text-white font-mono text-xs uppercase tracking-[0.2em] disabled:bg-neutral-200 disabled:text-neutral-400 hover:bg-neutral-800 transition-colors"
      >
        {generating ? 'Generating…' : 'Download STL'}
      </button>
      <p className="text-[11px] text-neutral-500 mt-3 leading-relaxed">
        Free for personal use. STL files generate entirely in your browser — nothing is uploaded.
      </p>
    </div>
  );
}

function PrintNotes({ template }: { template: Template }) {
  return (
    <div className="mt-10 pt-6 border-t border-neutral-200">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
        Print notes
      </div>
      <p className="text-xs text-neutral-600 mb-3 leading-relaxed">{template.printOrientation}</p>
      <ul className="space-y-1.5">
        {template.printingTips.map((tip) => (
          <li key={tip} className="text-xs text-neutral-500 leading-relaxed pl-3 relative">
            <span className="absolute left-0 top-2 w-1 h-px bg-neutral-300" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-600">
      <path d="M12 3v12m0-12l-4 4m4-4l4 4" />
      <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" />
    </svg>
  );
}
