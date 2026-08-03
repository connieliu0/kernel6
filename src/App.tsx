import { Analytics } from "@vercel/analytics/react";
import { ConsumptionScene } from "./components/ConsumptionScene";

function App() {
  return (
    <>
      <ConsumptionScene />
      <Analytics />
    </>
  );
}

export default App;
