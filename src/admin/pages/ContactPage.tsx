import axios from "axios";
import {useEffect, useState} from "@wordpress/element";
import {Table, Typography} from "antd";

export default function ContactPage() {
  const [error, setError] = useState<string>()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)


  const loadContact = () => {
    setLoading(true);
    axios.get('/index.php?rest_route=/datum/v1/contacts', {
      headers: {
        // @ts-ignore
        'X-WP-Nonce': window.wpApiSettings?.nonce
      }
    })
      .then(response => {
        const body = response.data
        if (Array.isArray(body)) {
          const formattedData = body.map(item => ({
            key: item.id, // Add key for Antd Table
            ...(item.data || {}),
            // Ensure url_download is properly extracted
            url_download: item.url_download || item.data?.url_download || 'N/A'
          }))
          
          setData(formattedData)
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadContact()
  }, []);
  
  const [sourceTitles, setSourceTitles] = useState<Record<string, string>>({})

  useEffect(() => {
    const uniqueRefs = Array.from(new Set(data.map(item => item.ref_url).filter(Boolean)))

    Promise.all(uniqueRefs.map(async (ref) => {
      try {
        const refUrl = new URL(decodeURIComponent(ref));
        const slug = refUrl.pathname.split('/').filter(Boolean).pop();
        const res = await axios.get(`/index.php?rest_route=/datum/v1/page-title&slug=${slug}`);
        return [ref, res.data.title || 'Unknown']
      } catch {
        return [ref, 'Unknown']
      }
    })).then(results => {
      const map: Record<string, string> = {}
      results.forEach(([ref, title]) => {
        map[ref] = title
      })
      setSourceTitles(map)
    })
  }, [data])



  const columns = [
    { title: 'First Name', dataIndex: 'first_name' },
    { title: 'Last Name', dataIndex: 'last_name' }, // Fixed: was first_name
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Country', dataIndex: 'country' },
    { title: 'Company', dataIndex: 'company' },
    { title: 'Job', dataIndex: 'job' },
    { title: 'Message', dataIndex: 'message' },
    {
      title: 'Download Source',
      dataIndex: 'url_download',
      render: (_: string, record: any) => {
        const ref = record.ref_url;

        const rawDownloadUrl = record.url_download || '';
        const normalizedDownloadUrl = decodeURIComponent(rawDownloadUrl.replace(/&amp;/g, '&'));

        let displayTitle = 'Source';

        // Lấy query trước lang
        const match = normalizedDownloadUrl.match(/\?[^#]+?(?=&lang=|$)/);
        const baseQuery = match ? match[0] : '';

        try {
          const urlObj = new URL(normalizedDownloadUrl);
          const pathnameLastSegment = urlObj.pathname.split('/').filter(Boolean).pop(); // ex: 'successful-stories-case-2'

          const specialUrlTitles: Record<string, string> = {
            // local
            '?page_id=107': 'Platform Customization',
            '?page_id=37': 'Premier Banking',

            // Solution
            'successful-stories-case-2': 'Platform Customization',
            'successful-stories': 'Premier Banking',

            // uat + product 
            'platform-customization': 'Platform Customization',
            'premier-banking': 'Premier Banking',
          };

          if (specialUrlTitles[baseQuery]) {
            displayTitle = specialUrlTitles[baseQuery];
          } else if (pathnameLastSegment && specialUrlTitles[pathnameLastSegment]) {
            displayTitle = specialUrlTitles[pathnameLastSegment];
          } else if (ref && sourceTitles[ref]) {
            displayTitle = sourceTitles[ref];
          }

        } catch (error) {
          console.error('Invalid URL:', normalizedDownloadUrl);
        }

        return rawDownloadUrl !== 'N/A' ? (
          <a href={rawDownloadUrl} target="_blank" rel="noopener noreferrer">
            <div className="text-sm text-gray-600">
              <strong>{displayTitle}</strong>
            </div>
          </a>
        ) : 'N/A';
      }
    }


  ];
  

  return (
    <div style={{ marginTop: 20, padding: 20 }}>
      <Typography.Title level={2}>Contact Submissions</Typography.Title>
      {error && (
        <Typography.Text type="danger" style={{ display: 'block', marginBottom: 16 }}>
          Error loading data: {error}
        </Typography.Text>
      )}
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        scroll={{ x: true }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100']
        }}
      />
    </div>
  )
}