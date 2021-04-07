import { Fragment, useEffect } from 'react'
import { useActions } from '../hooks/use-actions'
import { useTypedSelector } from '../hooks/use-typed-selector'
import AddUnit from './add-unit'
import UnitListItem from './unit-list-item'
import './unit-list.css'

const UnitList: React.FC = () => {
  const units = useTypedSelector(({ units: { order, data } }) =>
    order.map((id) => data[id])
  )

  const { fetchUnits, saveUnits } = useActions()

  useEffect(() => {
    fetchUnits()
  }, [])


  const displayedUnit = units.map((unit) => (
    <Fragment key={unit.id}>
      <UnitListItem unit={unit} />
      <AddUnit prevUnitId={unit.id} />
    </Fragment>
  ))

  return (
    <div className='unit-list'>
      <AddUnit forceVisibility={units.length === 0} prevUnitId={null} />
      {displayedUnit}
    </div>
  )
}

export default UnitList
