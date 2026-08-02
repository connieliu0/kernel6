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
  MOBILE_LAYOUT_MAX_WIDTH,
  type GridLine,
} from "../data/productionLayout";
import { AssetImage } from "./AssetImage";

function pct(px: number, total: number) {
  return `${(px / total) * 100}%`;
}

function useIsMobileLayout() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(max-width: ${MOBILE_LAYOUT_MAX_WIDTH}px)`).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_LAYOUT_MAX_WIDTH}px)`);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

function formatLineExport(l: GridLine) {
  const hide = l.hiddenOnMobile ? ", hiddenOnMobile: true" : "";
  return `  { position: ${l.position.toFixed(1)}, solidStart: ${l.solidStart}, solidEnd: ${l.solidEnd}, weight: ${l.weight}${hide} },`;
}

function HorizontalLine({
  line,
  drawn,
  delay,
  editMode,
  onDrag,
  onToggleMobileHide,
}: {
  line: GridLine;
  drawn: boolean;
  delay: number;
  editMode: boolean;
  onDrag?: (newPosition: number) => void;
  onToggleMobileHide?: () => void;
}) {
  const isFull = line.solidStart === 0 && line.solidEnd === 100;
  const hiddenOnMobile = Boolean(line.hiddenOnMobile);

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
        opacity: editMode && hiddenOnMobile ? 0.35 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute left-0 w-full"
        style={{
          top: editMode ? "4px" : 0,
          height: `${line.weight}px`,
          outline: editMode && hiddenOnMobile ? "1px dashed #f97316" : undefined,
        }}
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
      {editMode && onToggleMobileHide && (
        <button
          type="button"
          className={`absolute left-2 top-1/2 z-[110] -translate-y-1/2 rounded px-1.5 py-0.5 text-[10px] font-mono shadow ${
            hiddenOnMobile ? "bg-orange-500 text-white" : "bg-black/80 text-white"
          }`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onToggleMobileHide();
          }}
          title={hiddenOnMobile ? "Show on mobile" : "Hide on mobile"}
        >
          {hiddenOnMobile ? "mobile off" : "mobile on"}
        </button>
      )}
    </div>
  );
}

function VerticalLine({
  line,
  drawn,
  delay,
  editMode,
  onDrag,
  onToggleMobileHide,
}: {
  line: GridLine;
  drawn: boolean;
  delay: number;
  editMode: boolean;
  onDrag?: (newPosition: number) => void;
  onToggleMobileHide?: () => void;
}) {
  const isFull = line.solidStart === 0 && line.solidEnd === 100;
  const hiddenOnMobile = Boolean(line.hiddenOnMobile);

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
        opacity: editMode && hiddenOnMobile ? 0.35 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute top-0 h-full"
        style={{
          left: editMode ? "4px" : 0,
          width: `${line.weight}px`,
          outline: editMode && hiddenOnMobile ? "1px dashed #f97316" : undefined,
        }}
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
      {editMode && onToggleMobileHide && (
        <button
          type="button"
          className={`absolute top-2 left-1/2 z-[110] -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[10px] font-mono shadow ${
            hiddenOnMobile ? "bg-orange-500 text-white" : "bg-black/80 text-white"
          }`}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onToggleMobileHide();
          }}
          title={hiddenOnMobile ? "Show on mobile" : "Hide on mobile"}
        >
          {hiddenOnMobile ? "mobile off" : "mobile on"}
        </button>
      )}
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

  const positionStyle = {
    left: pct(img.left, DESIGN_WIDTH),
    top: pct(img.top, DESIGN_HEIGHT),
    width: pct(img.width, DESIGN_WIDTH),
    height: pct(img.height, DESIGN_HEIGHT),
    transitionDelay: editMode ? "0s" : `${index * 0.08}s`,
  };

  if (!editMode) {
    return (
      <AssetImage
        src={img.src}
        articleId={img.articleId}
        className="production-image overflow-hidden"
        style={positionStyle}
        objectFit="cover"
      />
    );
  }

  return (
    <div
      className="production-image absolute overflow-hidden cursor-move ring-2 ring-blue-500 ring-offset-1"
      style={{
        ...positionStyle,
        zIndex: 50,
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
      <div className="absolute bottom-0 left-0 bg-black/80 text-white text-[10px] px-1 py-0.5 font-mono">
        {img.left}, {img.top} | {img.width}×{img.height}
      </div>
      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
}

export function ProductionScene({ active }: { active: boolean }) {
  const [sceneVisible, setSceneVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewMobile, setPreviewMobile] = useState(false);
  const isMobileLayout = useIsMobileLayout();

  const [hLines, setHLines] = useState<GridLine[]>(() =>
    HORIZONTAL_LINES.map((l) => ({ ...l }))
  );
  const [vLines, setVLines] = useState<GridLine[]>(() =>
    VERTICAL_LINES.map((l) => ({ ...l }))
  );
  const [images, setImages] = useState(() =>
    GRID_IMAGES.map((img) => ({
      ...img,
      left: img.left + IMAGE_OFFSET_X,
      top: img.top + IMAGE_OFFSET_Y,
    }))
  );

  // Outside edit mode: hide flagged lines on real mobile widths.
  // In edit mode: show all (dimmed) unless Preview Mobile is on.
  const suppressMobileHidden =
    (editMode && previewMobile) || (!editMode && isMobileLayout);

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

  const toggleHMobileHide = (index: number) => {
    setHLines((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], hiddenOnMobile: !next[index].hiddenOnMobile };
      return next;
    });
  };

  const toggleVMobileHide = (index: number) => {
    setVLines((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], hiddenOnMobile: !next[index].hiddenOnMobile };
      return next;
    });
  };

  const copyLayout = () => {
    const output = `// Horizontal lines
export const HORIZONTAL_LINES = [
${hLines.map(formatLineExport).join("\n")}
];

// Vertical lines
export const VERTICAL_LINES = [
${vLines.map(formatLineExport).join("\n")}
];

// Images (with offsets already applied)
export const GRID_IMAGES = [
${images.map((img) => `  { src: "${img.src}", left: ${img.left}, top: ${img.top}, width: ${img.width}, height: ${img.height}, articleId: "${img.articleId}" },`).join("\n")}
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
      <div className="fixed top-4 right-4 z-[200] flex flex-wrap justify-end gap-2">
        {editMode && (
          <>
            <button
              onClick={() => setPreviewMobile((v) => !v)}
              className={`px-3 py-1.5 text-sm rounded shadow-lg ${
                previewMobile
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-white text-black border border-black/20 hover:bg-gray-100"
              }`}
            >
              {previewMobile ? "Exit Mobile Preview" : "Preview Mobile"}
            </button>
            <button
              onClick={copyLayout}
              className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded shadow-lg hover:bg-blue-700"
            >
              Copy Layout
            </button>
          </>
        )}
        <button
          onClick={() => {
            setEditMode(!editMode);
            if (editMode) setPreviewMobile(false);
          }}
          className="bg-black text-white px-3 py-1.5 text-sm rounded shadow-lg hover:bg-gray-800"
        >
          {editMode ? "Exit Edit Mode" : "Edit Layout"}
        </button>
      </div>

      {editMode && (
        <aside className="fixed top-16 left-4 z-[200] max-h-[calc(100vh-5rem)] w-56 overflow-y-auto rounded bg-black/90 p-3 text-white shadow-lg">
          <p className="mb-2 text-xs font-semibold tracking-wide uppercase opacity-80">
            Hide on mobile
          </p>
          <p className="mb-3 text-[10px] leading-snug opacity-60">
            Checked lines are off at ≤{MOBILE_LAYOUT_MAX_WIDTH}px. Use Preview Mobile to see the result.
          </p>

          <p className="mb-1 text-[10px] font-semibold opacity-70">Horizontal</p>
          <ul className="mb-3 space-y-1">
            {hLines.map((line, i) => (
              <li key={`h-toggle-${i}`}>
                <label className="flex cursor-pointer items-center gap-2 text-[11px] font-mono">
                  <input
                    type="checkbox"
                    checked={Boolean(line.hiddenOnMobile)}
                    onChange={() => toggleHMobileHide(i)}
                  />
                  <span className={line.hiddenOnMobile ? "text-orange-300" : ""}>
                    H{i} · {line.position.toFixed(1)}%
                  </span>
                </label>
              </li>
            ))}
          </ul>

          <p className="mb-1 text-[10px] font-semibold opacity-70">Vertical</p>
          <ul className="space-y-1">
            {vLines.map((line, i) => (
              <li key={`v-toggle-${i}`}>
                <label className="flex cursor-pointer items-center gap-2 text-[11px] font-mono">
                  <input
                    type="checkbox"
                    checked={Boolean(line.hiddenOnMobile)}
                    onChange={() => toggleVMobileHide(i)}
                  />
                  <span className={line.hiddenOnMobile ? "text-orange-300" : ""}>
                    V{i} · {line.position.toFixed(1)}%
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className="production-grid absolute inset-0 z-20">
        {hLines.map((line, i) => {
          if (suppressMobileHidden && line.hiddenOnMobile) return null;
          return (
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
              onToggleMobileHide={() => toggleHMobileHide(i)}
            />
          );
        })}

        {vLines.map((line, i) => {
          if (suppressMobileHidden && line.hiddenOnMobile) return null;
          return (
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
              onToggleMobileHide={() => toggleVMobileHide(i)}
            />
          );
        })}

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
