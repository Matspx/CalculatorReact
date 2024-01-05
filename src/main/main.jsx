import React, { Component } from 'react'

import './main.css'
import Button from './components/Button'
import Display from './components/Display'

const initialState = {
    displayValue: '0',
    operation: null,
    current: 0,
    values:[0,0],
    clearDisplay: true
}

export default class Calculator extends Component    {

    state = {...initialState}

    constructor(props){
        super(props)
        this.addDigit = this.addDigit.bind(this)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.backSpace = this.backSpace.bind(this)
    }

    clearMemory(){
        this.setState({...initialState})
    }

    backSpace(){
        const stringDisplay = this.state.displayValue
        const newDisplayValue = stringDisplay.substring(0, stringDisplay.length-1)
        this.setState({displayValue: newDisplayValue})
    }

    setOperation(operation){
        const current = this.state.current
        const currentOperation = this.state.operation
        const displayValue = this.state.displayValue
        const values = [...this.state.values]

        if(current === 0){
            values[0] = displayValue
            this.setState({
                operation,
                clearDisplay: true,
                current: 1
            })
        } else {  
            const equals = operation === "="

            const resolve = () => {
                switch(currentOperation) {
                    case 'x':
                        return values[0] * values[1]        
                    case '/':
                        return values[0] / values[1] 
                    case '+': 
                        return values[0] + values[1] 
                    case '-':
                        return values[0] - values[1] 
                }
            }

            values[0] = resolve()
            values[1] = 0

            this.setState({
                displayValue: values[0].toString(),
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n){
        const displayValue = this.state.displayValue

        if(n === '.' && displayValue.includes('.')){
            return
        }
        
        const clearDisplay = this.state.clearDisplay || 
            displayValue === '0'
        const zeroDot = displayValue === '0' &&
                            n==='.' && 
                            clearDisplay ? '0' : ''
        const initialDig = displayValue === '0' ||
                                clearDisplay ? '' : displayValue
        const newdisplayValue = zeroDot + initialDig + n 
        this.setState({
                displayValue: newdisplayValue,
                clearDisplay: false
            })

        if(n !== '.') {
            const current = this.state.current
            const values = [...this.state.values]
            values[current] = parseFloat(newdisplayValue)
            this.setState({values})
        }
        
    }
    render() {

        return(
            <div className="calculator">
                <Display displayValue = {this.state.displayValue} />
                <Button label='CE' grid2 funcBtn click={this.clearMemory}/>
                <Button label='<--' funcBtn click={this.backSpace}/>
                <Button label='/' funcBtn click={this.setOperation}/>
                <Button label='7' click={this.addDigit}/>
                <Button label='8' click={this.addDigit}/>
                <Button label='9' click={this.addDigit}/>
                <Button label='x' funcBtn click={this.setOperation}/>
                <Button label='4' click={this.addDigit}/>
                <Button label='5' click={this.addDigit}/>
                <Button label='6' click={this.addDigit}/>
                <Button label='-' funcBtn click={this.setOperation}/>
                <Button label='1' click={this.addDigit}/>
                <Button label='2' click={this.addDigit}/>
                <Button label='3' click={this.addDigit}/>
                <Button label='+' funcBtn click={this.setOperation}/>
                <Button label='0' grid2 click={this.addDigit}/>
                <Button label='.' click={this.addDigit}/>
                <Button label='=' funcBtn resolve click={this.setOperation}/>
            </div>    
        )
    }
}