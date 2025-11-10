import RichTextEditor, {RichTextEditorProps} from './RichTextEditor'

export default function TitleInput(props: RichTextEditorProps) {
  return (
    <RichTextEditor style={{ fontSize: 20, color: '#166987' }} placeholder={'Type for title...'} {...props} />
  )
 }