import {MediaPlaceholder} from '@wordpress/block-editor'
import {Col, Row} from 'antd'

type MediaPickerProps = {
  label?: string
  value?: string
  multiple?: boolean
  onChange?(url: string): void
}

type MediaPreviewProps = {
  source: string | string[]
}

function MediaPreview(props: MediaPreviewProps) {
  const { source } = props
  if (!source) return null
  if (Array.isArray(source)) {
    return <Row gutter={16}>
      {
        source.map((url, index) => <Col span={12}>
          <img src={url} key={index} alt={'image'} style={{ height: 128 }}/>
        </Col>)
      }
    </Row>
  }
  return <img src={source} alt={'image'} style={{ height: 128 }} />
}

export default function MediaPicker(props: MediaPickerProps) {
  const onSelectMedia = (value: any | any[]) => {
    if (typeof props.onChange === 'function') {
      let result
      if (Array.isArray(value)) {
        result = value.map(item => item.url)
      } else {
        result = value.url
      }
      props.onChange(result)
    }
  }
  return (
    <MediaPlaceholder
      labels={{
        title: props.label
      }}
      multiple={props.multiple ? 'add' : undefined}
      onSelect={onSelectMedia}
      mediaPreview={<MediaPreview source={props.value} />}
    />
  )
}