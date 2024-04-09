import { createRoot } from "react-dom/client";

import App from "./components/App";
import "./styles.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  console.error("Unable to find root element (#root)");
} else {
  const root = createRoot(rootEl);
  root.render(<App />);
}
