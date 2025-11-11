import {Collapse} from "antd";
import {BaseProps} from "../core/get-props";
import {ArrowRightOutlined, PlusOutlined} from "@ant-design/icons";


type CollapseBlockProps = {
  title: string
  content: string
}

export default function CollapseBlock({ data }) {
  const { title, content } = data;

  return (
    <div className="w-full max-w-[850px] mx-auto">
      <Collapse
        expandIconPosition="end"
        ghost
        expandIcon={({ isActive }) => (
          <div className="text-black">
            <PlusOutlined rotate={isActive ? 45 : 0} />
          </div>
        )}
      >
        <Collapse.Panel
          key="1"
          header={<div className="font-bold text-gray-800 -ml-4">{title}</div>}
        >
          <div className="text-gray-700 leading-relaxed">{content}</div>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}

