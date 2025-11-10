import './style.css'
import { createRoot, render } from '@wordpress/element'

document.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll('.wp-rocket-block')
  containers.forEach(container => {
    const dataset = container.dataset
    const props = Object.assign({}, dataset)
    // console.log(StoreLocator, props, container, render)
    if (ReactDOM.version.startsWith('18')) {
      const root = createRoot(container)
      root.render(<div {...props} />)
    } else {
      render(<div {...props} />, container)
    }
  })
})
