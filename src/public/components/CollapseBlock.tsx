import { Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
          header={
            <div
              className="font-bold text-gray-800 -ml-4"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          }
        >
          <div
            className="text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}
