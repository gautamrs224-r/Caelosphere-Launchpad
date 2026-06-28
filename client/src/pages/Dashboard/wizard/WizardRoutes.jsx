import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import GeneratingScreen from "./GeneratingScreen";

export default function WizardRoutes() {
  const [data, setData] = useState({});
  return (
    <Routes>
      <Route index element={<Step1 data={data} setData={setData} />} />
      <Route path="step-1" element={<Step1 data={data} setData={setData} />} />
      <Route path="step-2" element={<Step2 data={data} setData={setData} />} />
      <Route path="step-3" element={<Step3 data={data} setData={setData} />} />
      <Route path="step-4" element={<Step4 data={data} setData={setData} />} />
      <Route path="step-5" element={<Step5 data={data} setData={setData} />} />
      <Route path="generating" element={<GeneratingScreen />} />
    </Routes>
  );
}
