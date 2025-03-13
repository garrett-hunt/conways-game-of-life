import { createRoot } from "react-dom/client";
import "./App.css";
import Homepage from "./Pages/Homepage/Homepage";

const rootElement = document.getElementById("root");

function App() {
  return <Homepage />;
}

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.log("Root element not found");
}
