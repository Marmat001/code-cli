import { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'

import './text-editor.css'
import { Unit } from '../redux'
import { useActions } from '../hooks/use-actions'

interface TextEditorProps {
  unit: Unit
}

const TextEditor: React.FC<TextEditorProps> = ({ unit }) => {
  const [editing, setEditing] = useState(false)
  const { updateUnit } = useActions()

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return
      }
      setEditing(false)
    }

    document.addEventListener('click', listener, { capture: true })

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <div className='text-editor' ref={ref}>
        <MDEditor
          value={unit.content}
          onChange={(v) => updateUnit(unit.id, v || '')}
        />
      </div>
    )
  }
  return (
    <div className='text-editor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={unit.content || 'Click to edit'} />
      </div>
    </div>
  )
}

export default TextEditor
