import {Collapse} from "antd";
import {BaseProps} from "../core/get-props";
import {ArrowRightOutlined, PlusOutlined} from "@ant-design/icons";


type CollapseBlockProps = {
  title: string
  content: string
}

export default function CollapseBlock(props: BaseProps<CollapseBlockProps>) {
  const { title, content } = props.data
  return (
<div className="w-[850px]">
  <Collapse
    expandIconPosition="end"
    ghost
    expandIcon={({ isActive }) => (
      <div className="text-black">
        <PlusOutlined className="mt-2" rotate={isActive ? 90 : 0} />
      </div>
    )}
  >
    <Collapse.Panel
      key="1"
      header={<div className="font-[700] text-back font-bold -ml-4">{title}</div>}
    >
      {content}
    </Collapse.Panel>
  </Collapse>
</div>

  )
}