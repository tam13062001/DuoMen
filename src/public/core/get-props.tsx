import { PropsWithChildren } from "react"

export type BaseProps<T> = PropsWithChildren<{
  id?: string
  className?: string
  dom?: HTMLElement
  data?: T
}>

export function getProps(container: HTMLElement) {
  const dataset = container.dataset || {}
  const dataId = dataset.id

  let data

  if (dataId) {
    const dom = document.getElementById(dataId)
    if (dom) {
      try {
        data = JSON.parse(dom.textContent)
      } catch (e) {
        console.warn(e)
      }
    }
  }

  const props: BaseProps<any> = Object.assign({
    className: container.className,
    dom: container,
    id: container.dataset.id,
    data
  }, dataset)

  props.children = container.innerHTML
  return props
}
