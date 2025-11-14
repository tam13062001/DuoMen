import {useState} from '@wordpress/element'

type CheckboxProps = {
  name?: string
  children?: any
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export default function Checkbox(props: CheckboxProps) {
  const [checked, setChecked] = useState<boolean>(false)

  const onClick = () => {
    const updated = !checked
    setChecked(updated)
    if (typeof props.onChange === 'function') {
      props.onChange(updated)
    }
  }

  return (
    <div className="mb-4 cursor-default">
      <input className={'hidden'} name={props.name} type={'checkbox'} checked={checked} onChange={onClick} />
      <div onClick={onClick}>
        <div className="align-middle inline-block w-[30px] h-[30px] border border-primary mr-5 p-1">
          {
            checked && <div className={'bg-primary w-full h-full'}></div>
          }
        </div>
        <span className="align-middle">{props.children}</span>
      </div>
    </div>
  )
}