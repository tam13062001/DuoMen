import axios from "axios";
import { useEffect, useState } from "@wordpress/element";
import { Table, Typography, Button, Space } from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ContactPage() {
  const [error, setError] = useState<string>()
  const [data, setData] = useState<any[]>([])

  const loadContact = () => {
    axios.get('/index.php?rest_route=/duomen/v1/contacts', {
      headers: {
        // @ts-ignore
        'X-WP-Nonce': window.wpApiSettings?.nonce
      }
    })
      .then(response => {
        const rows = response.data.map((item: any) => ({
          id: item.id,
          ...(item.data || {})
        }))
        setData(rows)
      })
      .catch(err => setError(err.message))
  }

  useEffect(() => { loadContact() }, [])

  // ✅ EXPORT EXCEL
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts")

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" })

    saveAs(blob, "contacts.xlsx")
  }

  return (
    <div style={{ marginTop: 20, paddingRight: 20 }}>
<Space
  align="center"
  style={{ marginBottom: 16, width: "100%", }}
>
  <Typography.Title level={2} style={{ margin: 0 }}>
    Contacts
  </Typography.Title>

  <Button type="primary" onClick={exportToExcel}>
    Xuất Excel
  </Button>
</Space>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <Table
        dataSource={data}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          { title: 'Phone', dataIndex: 'phone' },
          { title: 'Note', dataIndex: 'note' },
        ]}
      />
    </div>
  )
}
