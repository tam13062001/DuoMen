import RichTextEditor, {RichTextEditorProps} from './RichTextEditor'

export default function DescriptionInput(props: RichTextEditorProps) {
  return (
    <RichTextEditor placeholder={'Type for description'} {...props} />
  )
 }