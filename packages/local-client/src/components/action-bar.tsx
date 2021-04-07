import { useActions } from '../hooks/use-actions'
import './action-bar.css'

interface ActionBarProps {
  id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveUnit, deleteUnit } = useActions()

  return (
    <div className='action-bar'>
      <button
        className='button primary-button is-small'
        onClick={() => moveUnit(id, 'up')}
      >
        <span className='icon'>
          <i className='fas fa-arrow-up' />
        </span>
      </button>
      <button
        className='button primary-button is-small'
        onClick={() => moveUnit(id, 'down')}
      >
        <span className='icon'>
          <i className='fas fa-arrow-down' />
        </span>
      </button>
      <button
        className='button primary-button is-small'
        onClick={() => deleteUnit(id)}
      >
        <span className='icon'>
          <i className='fas fa-times' />
        </span>
      </button>
    </div>
  )
}

export default ActionBar
