import { Unit } from '../redux'
import CodeUnit from './code-unit'
import TextEditor from './text-editor'
import ActionBar from './action-bar'
import './unit-list-item.css'

interface UnitListItemProps {
  unit: Unit
}

const UnitListItem: React.FC<UnitListItemProps> = ({ unit }) => {
  let child: JSX.Element
  if (unit.type === 'code') {
    child = (
      <>
        <div className='action-bar-container'>
          <ActionBar id={unit.id} />
        </div>
        <CodeUnit unit={unit} />
      </>
    )
  } else {
    child = (
      <>
        <TextEditor unit={unit} />
        <ActionBar id={unit.id} />
      </>
    )
  }
  return <div className='unit-list-item'>{child}</div>
}

export default UnitListItem
