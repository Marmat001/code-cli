import { useEffect, useRef } from 'react'
import './code-preview.css'

interface CodePreviewProps {
  bundledCode: string
  statusOfBundle: string
}

const html = `
<html>
  <head><style>html {background-color: white; }</style></head>
  <body>
    <div id="root"></div>
    <script>
    const handleError = (error) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
      console.error(error);
    }


    window.addEventListener('error', (event) => {
      event.preventDefault()
      handleError(event.error)
    })

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (error) {
          handleError(error)
        }
      }, false);
    </script>
  </body>
</html>
`

export const CodePreview: React.FC<CodePreviewProps> = ({
  bundledCode,
  statusOfBundle,
}) => {
  const iframe = useRef<any>()

  useEffect(() => {
    iframe.current.srcdoc = html

    setTimeout(() => {
      iframe.current.contentWindow.postMessage(bundledCode, '*')
    }, 50)
  }, [bundledCode])

  return (
    <div className='code-preview-container'>
      <iframe
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
        title='codepreview'
      />

      {statusOfBundle && <div className='error-message'>{statusOfBundle}</div>}
    </div>
  )
}
