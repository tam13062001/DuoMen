import {createRoot} from "@wordpress/element";
import ContactPage from "./pages/ContactPage";

export function load() {
  const container = document.getElementById('rocket-root')
  if (container) {
    const root = createRoot(container)
    root.render(<ContactPage />)
  }
}

