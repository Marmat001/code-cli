import { useActions } from '../hooks/use-actions'
import './add-unit.css'

interface AddUnitProps {
  prevUnitId: string | null
  forceVisibility?: boolean
}

const AddUnit: React.FC<AddUnitProps> = ({ prevUnitId, forceVisibility }) => {
  const { insertUnitAfter } = useActions()

  return (
    <div className={`add-unit ${forceVisibility && 'force-visibility'} `}>
      <div className='add-buttons'>
        <button
          className='button is-rounded primary-button is-small'
          onClick={() => insertUnitAfter(prevUnitId, 'code')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Code</span>
        </button>
        <button
          className='button is-rounded primary-button is-small'
          onClick={() => insertUnitAfter(prevUnitId, 'text')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  )
}

export default AddUnit
