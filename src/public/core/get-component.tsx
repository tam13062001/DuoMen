import * as React from "react";
import {ExampleBlock} from "../blocks/ExampleBlock";

const components = new Map<string, React.FC>()

export const registerComponent = (name: string, element: React.FC) => {
  components.set(name, element)
}

export function getComponent(container: HTMLElement) {
  const classList = Array.from(container.classList).filter(i => i.startsWith('wp-block-rocket-'))
  const componentName = classList[0].replace('wp-block-rocket-', '')
  const Component = components.get(componentName)

  if (!Component) {
    return (props: any) => React.createElement('div', {
      dangerouslySetInnerHTML: {
        __html: props?.children
      }
    })
  }

  return Component
}