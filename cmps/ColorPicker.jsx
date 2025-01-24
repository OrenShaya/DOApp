
const { useState, useEffect } = React

export function ColorPicker({ changeNoteColorFunc }) {
    
    const colors = {
        none: '',
        coral: '#77172e',
        peach: '#692b17',
        sand: '#7c4a03',
        mint: '#264d3b',
        sage: '#0c625d',
        fog: '#256377',
        storm: '#284255',
        dusk: '#472e5b',
        blossom: '#6c394f',
        clay: '#4b443a',
        chalk: '#232427',
    }

    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {

    }, [selectedColor])

    function handleColorClick(ev, color) {
        ev.stopPropagation()
        setSelectedColor(color)
        changeNoteColorFunc(color)
    }

    return (
        <div className="color-picker">
            {Object.keys(colors).map((colorName) => (
                <div 
                    key={colorName}
                    className={`color ${(selectedColor === colors[colorName]) ? 'selected' : ''} ${(colorName === 'none') ? 'none' : ''}`}
                    style={{backgroundColor: colors[colorName]}}
                    onClick={(ev) => handleColorClick(ev, colors[colorName])}
                    title={colorName}>
                </div>
            ))}
        </div>
    )
}
