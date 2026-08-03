import { useCallback, useEffect, useRef, useState } from "react";
import { PHONE_FADE_DURATION_S, PHONE_FADE_START_S } from "../data/introTiming";
import { AssetArticleProvider } from "../context/AssetArticleContext";
import { AssetImage } from "./AssetImage";
import { ConsumptionBodyText } from "./ConsumptionBodyText";
import { ConsumptionSubtitle } from "./ConsumptionSubtitle";
import { ConsumptionTitle } from "./ConsumptionTitle";
import { GroupArticleTooltip } from "./GroupArticleTooltip.tsx";
import { ProductionScene } from "./ProductionScene";

const PHONE_ANCHOR = { left: 5, top: 45 };

function parseAssetPosition(className: string) {
  const left = Number(className.match(/left-\[(\d+)%\]/)?.[1] ?? 50);
  const top = Number(className.match(/top-\[(\d+)%\]/)?.[1] ?? 50);
  return { left, top };
}

/** Shorter burst travel for assets farther from the phone. */
function burstOffsetForPosition(left: number, top: number) {
  const distance = Math.hypot(left - PHONE_ANCHOR.left, top - PHONE_ANCHOR.top);
  const t = Math.min(1, distance / 55);
  return {
    x: `${-(30 - t * 18)}vw`,
    y: `${20 - t * 12}vh`,
  };
}

const assets: { src: string; className: string; articleId: string }[] = [
  {
    src: "/assets/corn3.png",
    className: "top-[0%] left-[44%] w-[16vw] min-w-[160px] z-[1] rotate-[7deg]",
    articleId: "corn",
  },
  {
    src: "/assets/golf1.png",
    className:
      "top-[15%] max-[768px]:top-[28%] left-[47%] w-[20vw] min-w-[100px] z-[8] rotate-[60deg]",
    articleId: "retreat",
  },
  {
    src: "/assets/Cat 1.png",
    className: "top-[52%] left-[56%] w-[14vw] min-w-[140px] z-[2] rotate-[-5deg]",
    articleId: "retreat",
  },
  {
    src: "/assets/wrench 1.png",
    className: "top-[49%] left-[25%] w-[15vw] min-w-[150px] z-[3] rotate-[-5deg]",
    articleId: "sandwich",
  },
  {
    src: "/assets/hammer 1.png",
    className: "top-[40%] left-[18%] w-[16vw] min-w-[160px] z-[5] rotate-[10deg]",
    articleId: "sandwich",
  },
  {
    src: "/assets/food1.png",
    className: "top-[15%] left-[28%] w-[16vw] min-w-[160px] z-[6] rotate-[-8deg]",
    articleId: "phone",
  },
  {
    src: "/assets/smucker 2.png",
    className: "top-[17%] left-[65%] w-[10vw] min-w-[100px] z-[7] rotate-[5deg]",
    articleId: "sandwich",
  },
  {
    src: "/assets/corn1.png",
    className: "top-[38%] left-[40%] w-[20vw] min-w-[200px] z-[8] rotate-[-12deg]",
    articleId: "corn",
  },
  {
    src: "/assets/corn2.png",
    className: "top-[35%] left-[70%] w-[22vw] min-w-[220px] z-[10] rotate-[25deg]",
    articleId: "corn",
  },
  {
    src: "/assets/smucker 1.png",
    className: "top-[20%] left-[58%] w-[10vw] min-w-[100px] z-[11] rotate-[0deg]",
    articleId: "sandwich",
  },
  {
    src: "/assets/shrimp 1.png",
    className: "top-[0%] left-[67%] w-[25vw] min-w-[250px] z-[12] rotate-[5deg]",
    articleId: "shrimp",
  },
];

const TRANSITION_DURATION_MS = 600;

export function ConsumptionScene() {
  const [straighten, setStraighten] = useState(0);
  const [showProduction, setShowProduction] = useState(false);
  const [collageFading, setCollageFading] = useState(false);
  const animationRef = useRef<number | null>(null);

  const handleToggle = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();
    const startValue = straighten;
    const targetValue = straighten < 0.5 ? 1 : 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / TRANSITION_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const newValue = startValue + (targetValue - startValue) * eased;
      setStraighten(newValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [straighten]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (straighten >= 0.995 && !showProduction) {
      setCollageFading(true);
      const timer = window.setTimeout(() => {
        setShowProduction(true);
      }, 600);
      return () => window.clearTimeout(timer);
    } else if (straighten < 0.995) {
      // Reset both states when going back, regardless of showProduction
      if (showProduction) setShowProduction(false);
      if (collageFading) setCollageFading(false);
    }
  }, [straighten, showProduction, collageFading]);

  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      <AssetArticleProvider>
        <div
          className={`fixed inset-0 z-0 h-screen w-full overflow-hidden transition-[background] duration-700 ${
            collageFading ? "bg-white" : "bg-black"
          }`}
        >
          <div
            aria-hidden
            className={`collage-fade-out pointer-events-none absolute inset-0 ${
              collageFading ? "fading" : ""
            }`}
            style={{
              background:
                "linear-gradient(128deg, rgba(210,210,210,0.55) 0%, rgba(120,120,120,0.18) 38%, rgba(0,0,0,0) 62%)",
            }}
          />

          <header
            className={`title-color-transition pointer-events-none absolute top-[5%] left-[5%] z-30 flex items-start gap-[4vw] ${
              collageFading ? "inverted" : ""
            }`}
          >
            <div className="flex flex-col">
              <ConsumptionTitle straighten={straighten} onToggle={handleToggle} />
            </div>
            <div className="max-[768px]:hidden">
              <ConsumptionSubtitle straighten={straighten} />
            </div>
          </header>

          <section
            className={`collage-fade-out relative mx-auto h-full w-full max-w-[1600px] ${
              collageFading ? "fading" : ""
            }`}
          >
            <div
              className="phone-fade-in absolute top-[45%] left-[5%] w-[20vw] min-w-[200px] z-[4] rotate-[-25deg]"
              style={{
                animationDelay: `${PHONE_FADE_START_S}s`,
                animationDuration: `${PHONE_FADE_DURATION_S}s`,
              }}
            >
              <svg
                className="pointer-events-none absolute top-[-75%] left-[35%] z-0 h-auto w-[320%] rotate-[25deg]"
                viewBox="0 0 2923 2428"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0.000336912 1961.65L1794.16 -708.78L3429.2 2012.32L337.979 2427.47L0.000336912 1961.65Z"
                  fill="url(#paint0_linear_phone_bg)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_phone_bg"
                    x1="282.577"
                    y1="2007.78"
                    x2="2415.16"
                    y2="167.069"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" />
                    <stop offset="0.0001" stopColor="white" stopOpacity="0.9" />
                    <stop offset="0.793269" stopColor="#999999" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <AssetImage
                src="/assets/phone.png"
                articleId="retreat"
                className="!relative z-10 w-full"
              />
            </div>

            {assets.map((asset, index) => {
              const { left, top } = parseAssetPosition(asset.className);
              return (
                <AssetImage
                  key={asset.src}
                  src={asset.src}
                  articleId={asset.articleId}
                  className={asset.className}
                  animationIndex={index}
                  burstOffset={burstOffsetForPosition(left, top)}
                />
              );
            })}
          </section>

          <ProductionScene active={showProduction} />
          <GroupArticleTooltip />
        </div>

        <ConsumptionBodyText straighten={straighten} />
      </AssetArticleProvider>
    </main>
  );
}
