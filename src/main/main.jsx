import React, { Component, useState } from 'react'

import './main.css'
import Button from './components/Button'
import Display from './components/Display'

export default () =>  {

    const [displayValue, setDisplayValue] = useState('0')
    const [operation, setOper] = useState(null)
    const [current,setCurrent] = useState(0)
    const [values, setValues] = useState([0,0])
    const [clearDisplay, setClearDisplay] = useState(true)    

    const clearMemory = () => {
        setDisplayValue('0')
        setOper(null)
        setCurrent(0)
        setValues([0,0])
        setClearDisplay(true)
    }

    const backSpace = () =>{
        const newDisplayValue = displayValue.substring(0, displayValue.length-1)
        setDisplayValue(newDisplayValue)
    }

    const setOperation = (oper) => {
        const currentOperation = operation
        const newValues = [...values]

        if(current === 0){
            newValues[0] = displayValue
            setOper(oper)
            setClearDisplay(true)
            setCurrent(1)
        } else {  
            const equals = oper === "="

            const resolve = () => {
                switch(currentOperation) {
                    case 'x':
                        return newValues[0] * newValues[1]        
                    case '/':
                        return newValues[0] / newValues[1] 
                    case '+': 
                        return newValues[0] + newValues[1] 
                    case '-':
                        return newValues[0] - newValues[1] 
                }
            }

            newValues[0] = resolve()
            newValues[1] = 0

            setDisplayValue(newValues[0].toString())
            setOper(equals ? null : oper)
            setCurrent(equals ? 0 : 1)
            setClearDisplay(!equals)
            setValues(newValues)
        }
    }

    const addDigit = (n) => {
        if(n === '.' && displayValue.includes('.')){
            return
        }
        
        const ifclearDisplay = clearDisplay || 
            displayValue === '0'
        const zeroDot = displayValue === '0' &&
                            n==='.' && 
                            ifclearDisplay ? '0' : ''
        const initialDig = displayValue === '0' ||
                                ifclearDisplay ? '' : displayValue
        const newdisplayValue = zeroDot + initialDig + n 

        if(n !== '.') {
            const newValues = [...values]
            newValues[current] = parseFloat(newdisplayValue)
            setValues(newValues)
        }
        setDisplayValue(newdisplayValue)
        setClearDisplay(false)
    }
    return(
        <div className="calculator">
            <Display displayValue={displayValue}/>
            <Button label='CE' grid2 funcBtn  click={clearMemory}/>
            <Button label='<--' funcBtn click={backSpace}/>
            <Button label='/' funcBtn click={setOperation} />
            <Button label='7' click={addDigit} />
            <Button label='8' click={addDigit}/>
            <Button label='9' click={addDigit}/>
            <Button label='x' funcBtn click={setOperation}/>
            <Button label='4' click={addDigit}/>
            <Button label='5' click={addDigit}/>
            <Button label='6' click={addDigit}/>
            <Button label='-' funcBtn click={setOperation}/>
            <Button label='1' click={addDigit}/>
            <Button label='2' click={addDigit}/>
            <Button label='3' click={addDigit}/>
            <Button label='+' funcBtn click={setOperation}/>
            <Button label='0' grid2 click={addDigit}/>
            <Button label='.' click={addDigit}/>
            <Button label='=' funcBtn resolve click={setOperation}/>
        </div>    
    )
    
}