import React from "react";

const ThemePicker = ({hidden, selectTheme}) => {
return(
    <div className={hidden}>
        <select onChange={e => selectTheme(e.target.value)} className="rounded-xl bg-transparent">
            <option value={0}>Plain</option>
            <option value={1}>Anhedonic Angel</option>
        </select>
    </div>
    )
}

export default ThemePicker;
