import { useEffect } from 'react'
import { CodeEditor } from './code-editor'
import { CodePreview } from './code-preview'
import Resizable from './resizable'
import { Unit } from '../redux'
import { useActions } from '../hooks/use-actions'
import { useTypedSelector } from '../hooks/use-typed-selector'
import './code-unit.css'
import { useCumulativeCode } from '../hooks/use-cumulative-code'

interface CodeUnitProps {
  unit: Unit
}

const CodeUnit: React.FC<CodeUnitProps> = ({ unit }) => {
  const { updateUnit, createBundle } = useActions()
  const bundle = useTypedSelector((state) => state.bundles[unit.id])
  const cumulativeCode = useCumulativeCode(unit.id)
  useEffect(() => {
    if (!bundle) {
      createBundle(unit.id, cumulativeCode)
      return
    }

    const debounce = setTimeout(async () => {
      createBundle(unit.id, cumulativeCode)
    }, 1000)

    return () => {
      clearTimeout(debounce)
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, unit.id, createBundle])

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={unit.content}
            onChange={(value) => updateUnit(unit.id, value)}
          />
        </Resizable>
        <div className='progress-container'>
          {!bundle || bundle.loading ? (
            <div className='progress-loader'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <CodePreview
              bundledCode={bundle.code}
              statusOfBundle={bundle.error}
            />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeUnit
