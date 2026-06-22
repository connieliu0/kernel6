import { AssetImage } from "./AssetImage";
import { ConsumptionBodyText } from "./ConsumptionBodyText";
import { ConsumptionSubtitle } from "./ConsumptionSubtitle";
import { ConsumptionTitle } from "./ConsumptionTitle";

const assets = [
  {
    src: "/assets/corn3.png",
    title: "Corn 3",
    description: "Another ear of corn positioned horizontally along the bottom.",
    className: "top-[0%] left-[44%] w-[16vw] min-w-[160px] z-[1] rotate-[7deg]",
  },
  {
    src: "/assets/Golf 2.png",
    title: "Cane",
    description: "A walking cane with a rounded handle, tilted diagonally.",
    className: "top-[20%] left-[47%] w-[40vw] min-w-[400px] z-[2] rotate-[7deg]",
  },
  {
    src: "/assets/Cat 1.png",
    title: "Cat",
    description: "A small animal figure sitting upright near the bottom.",
    className: "top-[52%] left-[56%] w-[14vw] min-w-[140px] z-[2] rotate-[-5deg]",
  },
  {
    src: "/assets/wrench 1.png",
    title: "Forest",
    description: "A low-poly forest base with stylized trees and a spire.",
    className: "top-[49%] left-[25%] w-[15vw] min-w-[150px] z-[3] rotate-[-5deg]",
  },
  {
    src: "/assets/hammer 1.png",
    title: "Hands",
    description: "Two hands gripping a wooden mallet, angled downward.",
    className: "top-[40%] left-[18%] w-[16vw] min-w-[160px] z-[5] rotate-[10deg]",
  },
  {
    src: "/assets/food1.png",
    title: "Sundae",
    description: "A tall glass dessert stacked with scoops and a cherry on top.",
    className: "top-[15%] left-[28%] w-[16vw] min-w-[160px] z-[6] rotate-[-8deg]",
  },
  {
    src: "/assets/smucker 2.png",
    title: "Cauliflower",
    description: "A rounded vegetable head tucked behind the corn.",
    className: "top-[17%] left-[65%] w-[10vw] min-w-[100px] z-[7] rotate-[5deg]",
  },
  {
    src: "/assets/corn1.png",
    title: "Corn 1",
    description: "An upright ear of corn with husks peeled back.",
    className: "top-[38%] left-[40%] w-[20vw] min-w-[200px] z-[8] rotate-[-12deg]",
  },
  {
    src: "/assets/corn2.png",
    title: "Corn 2",
    description: "An ear of corn laid flat across the middle of the scene.",
    className: "top-[35%] left-[70%] w-[22vw] min-w-[220px] z-[10] rotate-[25deg]",
  },
  {
    src: "/assets/smucker 1.png",
    title: "Sphere",
    description: "A simple gray ball resting near the cane handle.",
    className: "top-[20%] left-[58%] w-[10vw] min-w-[100px] z-[11] rotate-[0deg]",
  },
  {
    src: "/assets/shrimp 1.png",
    title: "Shrimp",
    description: "A large shrimp rendered in grayscale, floating horizontally.",
    className: "top-[0%] left-[67%] w-[25vw] min-w-[250px] z-[12] rotate-[5deg]",
  },
] as const;

export function ConsumptionScene() {
  return (
    <main className="relative w-full overflow-x-hidden bg-black">
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(128deg, rgba(210,210,210,0.55) 0%, rgba(120,120,120,0.18) 38%, rgba(0,0,0,0) 62%)",
          }}
        />

        <header className="pointer-events-none absolute top-[5%] left-[5%] z-20">
          <ConsumptionTitle />
        </header>

        <footer className="pointer-events-none absolute right-[5%] bottom-[5%] z-20">
          <ConsumptionSubtitle />
        </footer>

        <section className="relative mx-auto h-full w-full max-w-[1600px]">
            <div
              className="phone-fade-in absolute top-[45%] left-[5%] w-[20vw] min-w-[200px] z-[4] rotate-[-25deg]"
              style={{ animationDelay: "1.3s" }}
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
                title="Lumpy"
                description="A rounded organic form floating in the lower right."
                className="!relative z-10 w-full"
              />
            </div>

            {assets.map((asset, index) => (
              <AssetImage
                key={asset.src}
                src={asset.src}
                title={asset.title}
                description={asset.description}
                className={asset.className}
                animationIndex={index}
              />
            ))}
          </section>
      </div>

      <ConsumptionBodyText />
    </main>
  );
}
