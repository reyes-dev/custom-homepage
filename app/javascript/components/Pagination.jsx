import React from "react";

const Pagination = ({decrementPage, incrementPage, theme}) => {
    return(
        <div className={"flex justify-center text-8xl gap-32 " + theme.title_clr}>
            <button onClick={decrementPage} className={theme.hover} >
                {`<`}
            </button>
            
           <button onClick={incrementPage} className={theme.hover} >
                {`>`}
            </button> 
        </div>
    )
}

export default Pagination;
