import { useEffect, useState } from "react";
import { Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function CollapseBlock({ data }) {
  const { title, content } = data;

  const localImage =
    "http://localhost:8000/wp-content/uploads/2025/11/image8.png";

  const fallbackImage =
    "https://duomen.rocketdigital.solutions/wp-content/uploads/2025/11/image8.png";

  const fallbackImage2 =
    "https://duomen.vn/wp-content/uploads/2025/11/image8-1.png";

  const [bulletImage, setBulletImage] = useState(fallbackImage2);

  // 🔥 Kiểm tra link local trước – nếu tồn tại thì ưu tiên dùng
  useEffect(() => {
    fetch(fallbackImage, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setBulletImage(fallbackImage);
        } else {
          setBulletImage(fallbackImage2);
        }
      })
      .catch(() => {
        setBulletImage(fallbackImage2);
      });
  }, []);

  return (
    <div className="w-full max-w-[850px] mx-auto">
      <Collapse
        expandIconPosition="end"
        ghost
        expandIcon={({ isActive }) => (
          <div className="text-black lg:mt-1 mt-1">
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
            className="text-gray-700 leading-relaxed custom-list"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* CSS đổi bullet thành hình */}
          <style>{`
            .custom-list ul {
              list-style: none !important;
              padding-left: 0 !important;
              margin: 0;
            }

            .custom-list li {
              list-style: none;
              padding-left: 28px;
              margin-bottom: 10px;
              position: relative;
            }

            .custom-list li::before {
              content: "";
              position: absolute;
              left: 5px;
              top: 10px;
              width: 16px;
              height: 16px;
              background-image: url('${bulletImage}');
              background-size: contain;
              background-repeat: no-repeat;
            }
          `}</style>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
}
