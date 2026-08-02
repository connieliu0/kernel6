import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  sceneArticles,
  type SceneArticle,
} from "../data/sceneArticles";
import { ASSETS_INTRO_COMPLETE_MS } from "../data/introTiming";

export type HoverFocus = { type: "article"; articleId: string } | null;

const SCROLL_INTERACTION_THRESHOLD = 8;

interface AssetArticleContextValue {
  hoverFocus: HoverFocus;
  setHoverFocus: (focus: HoverFocus) => void;
  assetsInteractive: boolean;
  activeArticleId: string | null;
  getArticle: (articleId: string) => SceneArticle | undefined;
  registerTooltipAnchor: (articleId: string, element: HTMLElement) => void;
  unregisterTooltipAnchor: (articleId: string) => void;
  getTooltipAnchor: (articleId: string) => HTMLElement | null;
}

const AssetArticleContext = createContext<AssetArticleContextValue | null>(
  null,
);

export function AssetArticleProvider({ children }: { children: ReactNode }) {
  const [hoverFocus, setHoverFocus] = useState<HoverFocus>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [scrollAllowsInteraction, setScrollAllowsInteraction] = useState(true);
  const tooltipAnchorsRef = useRef<Map<string, HTMLElement>>(new Map());

  const assetsInteractive = introComplete && scrollAllowsInteraction;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIntroComplete(true);
    }, ASSETS_INTRO_COMPLETE_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const update = () => {
      const scrolling = window.scrollY > SCROLL_INTERACTION_THRESHOLD;
      setScrollAllowsInteraction(!scrolling);
      if (scrolling) {
        setHoverFocus(null);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  // On touch devices, dismiss the tapped article tooltip when tapping outside.
  useEffect(() => {
    if (!hoverFocus) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      // Let asset taps switch/toggle focus themselves.
      if (target.closest("[data-article-id]")) return;
      setHoverFocus(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [hoverFocus]);

  const registerTooltipAnchor = useCallback(
    (articleId: string, element: HTMLElement) => {
      tooltipAnchorsRef.current.set(articleId, element);
    },
    [],
  );

  const unregisterTooltipAnchor = useCallback((articleId: string) => {
    tooltipAnchorsRef.current.delete(articleId);
  }, []);

  const getTooltipAnchor = useCallback(
    (articleId: string) => tooltipAnchorsRef.current.get(articleId) ?? null,
    [],
  );

  const activeArticleId =
    hoverFocus?.type === "article" ? hoverFocus.articleId : null;

  const value = useMemo(
    () => ({
      hoverFocus,
      setHoverFocus,
      assetsInteractive,
      activeArticleId,
      getArticle: (articleId: string) => sceneArticles[articleId],
      registerTooltipAnchor,
      unregisterTooltipAnchor,
      getTooltipAnchor,
    }),
    [
      hoverFocus,
      assetsInteractive,
      activeArticleId,
      registerTooltipAnchor,
      unregisterTooltipAnchor,
      getTooltipAnchor,
    ],
  );

  return (
    <AssetArticleContext.Provider value={value}>
      {children}
    </AssetArticleContext.Provider>
  );
}

export function useAssetArticle() {
  const context = useContext(AssetArticleContext);
  if (!context) {
    throw new Error("useAssetArticle must be used within AssetArticleProvider");
  }
  return context;
}
