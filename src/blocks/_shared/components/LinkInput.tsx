import {Col, Form, Input, Row, Select, Space} from 'antd'

type LinkInputProps = {
  linkName: string | (string | number)[]
  linkNameLabel?: string
  targetLinkName: string | (string | number)[]
  targetLinkNameLabel?: string
}
export default function LinkInput(props: LinkInputProps) {
  return (
    <Form.Item label={props.linkNameLabel || 'Link'}>
      <Space.Compact style={{ width: '100%' }}>
        <Form.Item name={props.linkName} noStyle>
          <Input style={{ width: '70%'}} />
        </Form.Item>
        <Form.Item name={props.targetLinkName} noStyle>
          <Select
            placeholder={'Target'}
            style={{ width: '30%' }}
            options={[
              { label: 'Self', value: 'self' },
              { label: 'Blank', value: '_blank' },
              { label: 'Parent', value: '_parent' },
              { label: 'Top', value: '_top' },
            ]}
          />
        </Form.Item>
      </Space.Compact>
    </Form.Item>
  )
}