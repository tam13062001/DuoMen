import {Button, Flex, Input} from 'antd'
import {useEffect, useState} from '@wordpress/element'

declare var wp: any

type MediaSelectorProps = {
  title?: string
  selectButtonText?: string
  value?: string
  onChange?(info: any): void
}

export default function MediaSelect(props: MediaSelectorProps) {
  const [frame, setFrame] = useState<any>()

  useEffect(() => {
    const frame = wp.media.frames.customHeader || wp.media({
      title: props.title || 'Select an image',
      button: {
        text: props.selectButtonText || 'Use this image',
      },
      multiple: false, // single selection
      library: {
        type: 'image',
      },
    });

    frame.on('select', () => {
      const attachment = frame.state().get('selection').first().toJSON();
      if (typeof props.onChange === 'function') {
        props.onChange(attachment)
      }
    });

    setFrame(frame)
  }, [])

  const onSelectBtnClick = () => {
    if (frame) {
      frame.open()
    }
  }

  return (
    <Flex>
      <Input value={props.value} />
      <Button onClick={onSelectBtnClick}>Select</Button>
    </Flex>
  )
}