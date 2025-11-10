import {BaseProps} from "../core/get-props";

type ExampleData = {
  title: string
}

export function ExampleBlock(props: BaseProps<ExampleData>) {
  const { data } = props
  return (
    <div>
      Component: {props.className} - Title: {data?.title}
    </div>
  )
}