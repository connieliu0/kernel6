import { useEffect, useState } from "react";
import {
  DESIGN_WIDTH,
  DESIGN_HEIGHT,
  IMAGE_OFFSET_X,
  IMAGE_OFFSET_Y,
  LINE_COLOR,
  HORIZONTAL_LINES,
  VERTICAL_LINES,
  GRID_IMAGES,
} from "../data/productionLayout";

function pct(px: number, total: number) {
  return `${(px / total) * 100}%`;
}

function HorizontalLine({
  line,
  drawn,
  delay,
  editMode,
  onDrag,
}: {
  line: (typeof HORIZONTAL_LINES)[number];
  drawn: boolean;
  delay: number;
  editMode: boolean;
  onDrag?: (newPosition: number) => void;
}) {
  const isFull = line.solidStart === 0 && line.solidEnd === 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editMode || !onDrag) return;
    e.preventDefault();
    const startY = e.clientY;
    const startPos = line.position;
    const rect = (e.target as HTMLElement).closest(".production-grid")?.getBoundingClientRect();
    if (!rect) return;

    const onMove = (moveE: MouseEvent) => {
      const deltaY = moveE.clientY - startY;
      const deltaPct = (deltaY / rect.height) * 100;
      onDrag(Math.max(0, Math.min(100, startPos + deltaPct)));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      className={`absolute left-0 w-full ${editMode ? "cursor-ns-resize hover:bg-blue-500/30" : ""}`}
      style={{
        top: `${line.position}%`,
        height: editMode ? "10px" : `${line.weight}px`,
        marginTop: editMode ? "-5px" : 0,
        clipPath: drawn ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        transition: editMode ? "none" : `clip-path 0.8s cubic-bezier(0.33, 1, 0.68, 1)`,
        transitionDelay: editMode ? "0s" : `${delay}s`,
        zIndex: editMode ? 100 : "auto",
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute left-0 w-full"
        style={{ top: editMode ? "4px" : 0, height: `${line.weight}px` }}
      >
        {isFull ? (
          <div style={{ width: "100%", height: "100%", background: LINE_COLOR }} />
        ) : (
          <div className="flex w-full h-full">
            {line.solidStart > 0 && (
              <div
                style={{
                  width: `${line.solidStart}%`,
                  height: "100%",
                  backgroundImage: `repeating-linear-gradient(to right, ${LINE_COLOR} 0px, ${LINE_COLOR} 3px, transparent 3px, transparent 8px)`,
                }}
              />
            )}
            <div
              style={{
                width: `${line.solidEnd - line.solidStart}%`,
                height: "100%",
                background: LINE_COLOR,
              }}
            />
            {line.solidEnd < 100 && (
              <div
                style={{
                  width: `${100 - line.solidEnd}%`,
                  height: "100%",
                  backgroundImage: `repeating-linear-gradient(to right, ${LINE_COLOR} 0px, ${LINE_COLOR} 3px, transparent 3px, transparent 8px)`,
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function VerticalLine({
  line,
  drawn,
  delay,
  editMode,
  onDrag,
}: {
  line: (typeof VERTICAL_LINES)[number];
  drawn: boolean;
  delay: number;
  editMode: boolean;
  onDrag?: (newPosition: number) => void;
}) {
  const isFull = line.solidStart === 0 && line.solidEnd === 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editMode || !onDrag) return;
    e.preventDefault();
    const startX = e.clientX;
    const startPos = line.position;
    const rect = (e.target as HTMLElement).closest(".production-grid")?.getBoundingClientRect();
    if (!rect) return;

    const onMove = (moveE: MouseEvent) => {
      const deltaX = moveE.clientX - startX;
      const deltaPct = (deltaX / rect.width) * 100;
      onDrag(Math.max(0, Math.min(100, startPos + deltaPct)));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      className={`absolute top-0 h-full ${editMode ? "cursor-ew-resize hover:bg-blue-500/30" : ""}`}
      style={{
        left: `${line.position}%`,
        width: editMode ? "10px" : `${line.weight}px`,
        marginLeft: editMode ? "-5px" : 0,
        clipPath: drawn ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        transition: editMode ? "none" : `clip-path 0.8s cubic-bezier(0.33, 1, 0.68, 1)`,
        transitionDelay: editMode ? "0s" : `${delay}s`,
        zIndex: editMode ? 100 : "auto",
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute top-0 h-full"
        style={{ left: editMode ? "4px" : 0, width: `${line.weight}px` }}
      >
        {isFull ? (
          <div style={{ width: "100%", height: "100%", background: LINE_COLOR }} />
        ) : (
          <div className="flex flex-col w-full h-full">
            {line.solidStart > 0 && (
              <div
                style={{
                  height: `${line.solidStart}%`,
                  width: "100%",
                  backgroundImage: `repeating-linear-gradient(to bottom, ${LINE_COLOR} 0px, ${LINE_COLOR} 3px, transparent 3px, transparent 8px)`,
                }}
              />
            )}
            <div
              style={{
                height: `${line.solidEnd - line.solidStart}%`,
                width: "100%",
                background: LINE_COLOR,
              }}
            />
            {line.solidEnd < 100 && (
              <div
                style={{
                  height: `${100 - line.solidEnd}%`,
                  width: "100%",
                  backgroundImage: `repeating-linear-gradient(to bottom, ${LINE_COLOR} 0px, ${LINE_COLOR} 3px, transparent 3px, transparent 8px)`,
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableImage({
  img,
  index,
  editMode,
  onUpdate,
}: {
  img: (typeof GRID_IMAGES)[number] & { left: number; top: number };
  index: number;
  editMode: boolean;
  onUpdate?: (left: number, top: number, width: number, height: number) => void;
}) {
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!editMode || !onUpdate) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = img.left;
    const startTop = img.top;
    const rect = (e.target as HTMLElement).closest(".production-grid")?.getBoundingClientRect();
    if (!rect) return;

    const onMove = (moveE: MouseEvent) => {
      const deltaX = moveE.clientX - startX;
      const deltaY = moveE.clientY - startY;
      const deltaLeftPx = (deltaX / rect.width) * DESIGN_WIDTH;
      const deltaTopPx = (deltaY / rect.height) * DESIGN_HEIGHT;
      onUpdate(Math.round(startLeft + deltaLeftPx), Math.round(startTop + deltaTopPx), img.width, img.height);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (!editMode || !onUpdate) return;
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = img.width;
    const startHeight = img.height;
    const rect = (e.target as HTMLElement).closest(".production-grid")?.getBoundingClientRect();
    if (!rect) return;

    const onMove = (moveE: MouseEvent) => {
      const deltaX = moveE.clientX - startX;
      const deltaY = moveE.clientY - startY;
      const deltaWidthPx = (deltaX / rect.width) * DESIGN_WIDTH;
      const deltaHeightPx = (deltaY / rect.height) * DESIGN_HEIGHT;
      onUpdate(img.left, img.top, Math.max(50, Math.round(startWidth + deltaWidthPx)), Math.max(50, Math.round(startHeight + deltaHeightPx)));
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      className={`production-image absolute overflow-hidden ${editMode ? "cursor-move ring-2 ring-blue-500 ring-offset-1" : ""}`}
      style={{
        left: pct(img.left, DESIGN_WIDTH),
        top: pct(img.top, DESIGN_HEIGHT),
        width: pct(img.width, DESIGN_WIDTH),
        height: pct(img.height, DESIGN_HEIGHT),
        transitionDelay: editMode ? "0s" : `${index * 0.08}s`,
        zIndex: editMode ? 50 : "auto",
      }}
      onMouseDown={handleMouseDown}
    >
      <img
        src={img.src}
        alt=""
        className="h-full w-full object-cover pointer-events-none"
        loading="eager"
        draggable={false}
      />
      {editMode && (
        <>
          <div className="absolute bottom-0 left-0 bg-black/80 text-white text-[10px] px-1 py-0.5 font-mono">
            {img.left}, {img.top} | {img.width}×{img.height}
          </div>
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
            onMouseDown={handleResizeMouseDown}
          />
        </>
      )}
    </div>
  );
}

export function ProductionScene({ active }: { active: boolean }) {
  const [sceneVisible, setSceneVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [hLines, setHLines] = useState(() =>
    HORIZONTAL_LINES.map((l) => ({ ...l }))
  );
  const [vLines, setVLines] = useState(() =>
    VERTICAL_LINES.map((l) => ({ ...l }))
  );
  const [images, setImages] = useState(() =>
    GRID_IMAGES.map((img) => ({
      ...img,
      left: img.left + IMAGE_OFFSET_X,
      top: img.top + IMAGE_OFFSET_Y,
    }))
  );

  useEffect(() => {
    if (!active) {
      setSceneVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setSceneVisible(true), 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [active]);

  const copyLayout = () => {
    const output = `// Horizontal lines
export const HORIZONTAL_LINES = [
${hLines.map((l) => `  { position: ${l.position.toFixed(1)}, solidStart: ${l.solidStart}, solidEnd: ${l.solidEnd}, weight: ${l.weight} },`).join("\n")}
];

// Vertical lines
export const VERTICAL_LINES = [
${vLines.map((l) => `  { position: ${l.position.toFixed(1)}, solidStart: ${l.solidStart}, solidEnd: ${l.solidEnd}, weight: ${l.weight} },`).join("\n")}
];

// Images (with offsets already applied)
export const GRID_IMAGES = [
${images.map((img) => `  { src: "${img.src}", left: ${img.left}, top: ${img.top}, width: ${img.width}, height: ${img.height} },`).join("\n")}
];`;
    navigator.clipboard.writeText(output);
    alert("Layout copied to clipboard!");
  };

  return (
    <div
      className={`production-scene fixed inset-0 z-10 flex flex-col overflow-hidden transition-opacity duration-700 ${
        active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ background: "#fff" }}
    >
      {/* Edit mode toggle */}
      <button
        onClick={() => setEditMode(!editMode)}
        className="fixed top-4 right-4 z-[200] bg-black text-white px-3 py-1.5 text-sm rounded shadow-lg hover:bg-gray-800"
      >
        {editMode ? "Exit Edit Mode" : "Edit Layout"}
      </button>

      {editMode && (
        <button
          onClick={copyLayout}
          className="fixed top-4 right-32 z-[200] bg-blue-600 text-white px-3 py-1.5 text-sm rounded shadow-lg hover:bg-blue-700"
        >
          Copy Layout
        </button>
      )}

      <div className="production-grid absolute inset-0 z-20">
        {hLines.map((line, i) => (
          <HorizontalLine
            key={`h-${i}`}
            line={line}
            drawn={sceneVisible || editMode}
            delay={i * 0.06}
            editMode={editMode}
            onDrag={(pos) => {
              setHLines((prev) => {
                const next = [...prev];
                next[i] = { ...next[i], position: pos };
                return next;
              });
            }}
          />
        ))}

        {vLines.map((line, i) => (
          <VerticalLine
            key={`v-${i}`}
            line={line}
            drawn={sceneVisible || editMode}
            delay={0.05 + i * 0.05}
            editMode={editMode}
            onDrag={(pos) => {
              setVLines((prev) => {
                const next = [...prev];
                next[i] = { ...next[i], position: pos };
                return next;
              });
            }}
          />
        ))}

        <div className={`absolute inset-0 ${sceneVisible || editMode ? "production-images-visible" : ""}`}>
          {images
            .map((img, i) => {
              // Diagonal score: bottom-left = low, top-right = high
              const diagonalScore = img.left + (DESIGN_HEIGHT - img.top);
              return { img, i, diagonalScore };
            })
            .sort((a, b) => a.diagonalScore - b.diagonalScore)
            .map(({ img, i }, sortedIndex) => (
              <DraggableImage
                key={img.src}
                img={img}
                index={sortedIndex}
                editMode={editMode}
                onUpdate={(left, top, width, height) => {
                  setImages((prev) => {
                    const next = [...prev];
                    next[i] = { ...next[i], left, top, width, height };
                    return next;
                  });
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
