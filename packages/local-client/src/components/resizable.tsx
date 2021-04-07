import { useEffect, useState } from 'react'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'
import './resizable.css'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [width, setWidth] = useState(window.innerWidth * 0.8)

  let resizableProps: ResizableBoxProps

  useEffect(() => {
    let debounce: any
    const measurements = () => {
      if (debounce) {
        clearTimeout(debounce)
      }
      debounce = setTimeout(() => {
        setInnerHeight(window.innerHeight)
        setInnerWidth(window.innerWidth)

        if (window.innerWidth * 0.8 < width) {
          setWidth(window.innerWidth * 0.8)
        }
      }, 100)
    }

    window.addEventListener('resize', measurements)

    return () => {
      window.removeEventListener('resize', measurements)
    }
  }, [width])

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'horizontal-resize',
      height: Infinity,
      width,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.8, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width)
      },
    }
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 50],
    }
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable
