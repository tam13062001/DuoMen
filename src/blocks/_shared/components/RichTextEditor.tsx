import {RichText} from '@wordpress/block-editor'

export type RichTextEditorProps = {
  value?: string
  onChange?: (value?: string) => void
} & Omit<RichText.Props<any>, 'onChange' | 'value'>

export default function RichTextEditor(props: RichTextEditorProps) {
  return (
    <RichText {...props} onChange={props.onChange} value={props.value} />
  )
}