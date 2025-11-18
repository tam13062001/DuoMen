import axios from "axios";
import {useEffect, useState} from "@wordpress/element";
import {Table, Typography} from "antd";

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
          key: item.id,
          id: item.id,
          ...(item.data || {})
        }))
        setData(rows)
      })
      .catch(err => setError(err.message))
  }

  useEffect(() => { loadContact() }, [])

  return (
    <div style={{ marginTop: 20, paddingRight: 20 }}>
      <Typography.Title>Contacts</Typography.Title>

      {error && <div style={{color: 'red'}}>{error}</div>}

      <Table
        dataSource={data}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          { title: 'Phone', dataIndex: 'phone' },
        ]}
      />
    </div>
  )
}
