import { useTypedSelector } from './use-typed-selector'

export const useCumulativeCode = (unitId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.units

    const orderedUnits = order.map((id) => data[id])

    const showFunction = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    var show = (value) => {
      const root = document.querySelector('#root');

      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    };
  `

    const showFuncNoOp = 'var show = () => {}'

    const cumulativeCode = []

    for (let c of orderedUnits) {
      if (c.type === 'code') {
        if (c.id === unitId) {
          cumulativeCode.push(showFunction)
        } else {
          cumulativeCode.push(showFuncNoOp)
        }
        cumulativeCode.push(c.content)
      }

      if (c.id === unitId) {
        break
      }
    }
    return cumulativeCode
  }).join('\n')
}
