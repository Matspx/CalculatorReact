import './Button.css'

export default (props) => {
    let classes = 'button ' 
    classes += props.grid2 ? 'grid2 ' : ''
    classes += props.funcBtn ? 'func-btn ' : ''
    classes += props.resolve ? 'resolve ' : ''
    return (
        <button 
            className={classes}
            onClick={e => props.click && props.click(props.label)}
        >
            {props.label}
        </button>
    )
}