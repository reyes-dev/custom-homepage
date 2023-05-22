import React, { useState, useEffect } from "react";
import NewArea from "./NewArea";
import Area from "./Area";
import ThemePicker from "./ThemePicker";
import Pagination from "./Pagination";

const ws = new WebSocket('ws://localhost:3000/cable');

function App() {
    const [pageNum, setPageNum] = useState(0);
    const [pageTotal, setPageTotal] = useState(0);
    /* Toggle CSS themes using Tailwind */
    const themesArray = [{ bg: ' bg-plain ', txt_clr: ' text-plainish ', hover: ' hover:text-boringhover ', box_clr: ' before:shadow-[inset_0_0_2000px_rgba(237,237,233,.5)] ', title_clr: ' text-boringtitle ', area_title: ' text-plain_area_title ', blur: ' before:blur-xl ' }, { bg: ' bg-angel-devil ', txt_clr: ' text-angel ', hover: ' hover:text-angelhover ', box_clr: ' before:shadow-[inset_0_0_2000px_rgba(103,0,6,.5)] ', title_clr: ' text-angeltitle ', area_title: ' text-angel_area_title ', blur: ' before:blur-none ' }];
    const [theme, setTheme] = useState(themesArray[0]);
    /* All existing areas, parts of the page that hold links, will be stored in the areas state array */
    const [areas, setAreas] = useState([]);
    /* For websockets, we need to set an ID when we request to connect to the ActionCable server  */
    const [guid, setGuid] = useState('');
    /* For hiding "edit mode" features like adding or deleting links & areas */
    const [hidden, setHidden] = useState('hidden');
    const selectTheme = (choice) => {
        setTheme(themesArray[choice])
    }
    /* Increment the pageNum, passed to Pagination component  */
    const decrementPage = () => {
       if(pageNum - 1 >= 0){
            setPageNum(pageNum - 1);
        }
    }
    /* Increment the pageNum, passed to Pagination component  */
    const incrementPage = () => { 
        setPageNum(pageNum + 1);
    }
    /* Toggle between empty string and 'hidden' string for use in CSS className attribute  */
    const toggleHidden = () => {
        if (hidden === 'hidden') return setHidden('');
        setHidden('hidden')
    }
    /* A method called when a websocket server is connected to, and sets the Guid area, 
      then subscribes to the AreasChannel with Guid, which streams all the live area updates we want */
    ws.onopen = () => {
        console.log('Connected to websocket server.');
        /* Randomly generate ID */
        setGuid(Math.random().toString(36).substring(2, 15));

        ws.send(
            JSON.stringify({
                command: 'subscribe',
                identifier: JSON.stringify({
                    id: guid,
                    channel: 'AreasChannel',
                }),
            })
        );
    };
    /* Stream Area data */
    /* The message event is fired when data is received through a WebSocket. 
    In this case, the data is an object with an "action" property and with 
    the ID and name of the area which will be used  */
    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'ping') return;
        if (data.type === 'welcome') return;
        if (data.type === 'confirm_subscription') return;

        const area = data.message;
        switch (area.action) {
            case 'create':
                console.log('Create case.')
                area_obj = area.broadcasted_area
                /* Add to areas state array */
                setAreas([...areas, area_obj]);
                break;
            case 'update': console.log('Update case.')
                area_obj = area.broadcasted_area
                /* Map over areas stay area, replacing the object with an identical ID  i.e updated data */
                setAreas(areas => areas.map((obj) => (obj.id === area_obj.id ? area_obj : obj)));
                break;
            case 'destroy':
                console.log('Destroy case.')
                area_obj = area.broadcasted_area
                /* Filter out the object with the identical ID, removing it from the state array */
                setAreas(areas => areas.filter((obj) => (obj.id != area_obj.id)));
                break;
        }
    };

    /* Fetch initial page of areas */
    useEffect(() => {
        fetchAreas();
    }, []);
    /* Fetch current page of areas */
    useEffect(() => {
        fetchAreas();
    }, [pageNum]);
    /* /areas is the rails route to GET created area records */
    const fetchAreas = async () => {
        const response = await fetch(`/areas/?pageNum=${pageNum}`);
        const data = await response.json();
        setAreas(data);
    };

    const allAreas = areas.map((area) => {
        return <Area title={area.name} id={area.id} hidden={hidden} key={area.id} theme={theme} pageNum={pageNum} />
    });

    return (
        <div className={'font-["Jura"] bg-no-repeat bg-cover bg-fixed grid items-center justify-center h-screen ' + theme.bg + theme.txt_clr}>
            <div className={"z-[1] h-[80vh] w-[80vw] relative bg-inherit rounded-[5px] p-8 overflow-hidden shadow-[0_0_16px_0_rgba(0,0,0,0.2)] before:pointer-events-none before:absolute before:bg-inherit before:top-0 before:left-0 before:right-0 before:bottom-0  before:backdrop-blur-[7px] before:m-[-20px] before:z-[-1]" + theme.box_clr + theme.blur}>
                <div className="flex flex-col gap-8 justify-center items-center">
                    <h1 className={"text-8xl" + theme.title_clr}>welcome home</h1>
                    <button onClick={toggleHidden} className={theme.hover}>{` (・∀・) `}</button>
                    <NewArea hidden={hidden} theme={theme} />
                    <ThemePicker hidden={hidden} selectTheme={selectTheme} />
                </div>

                <div className="flex flex-wrap justify-start items-start">
                    {allAreas}
                </div>
               
                 <Pagination incrementPage={incrementPage} decrementPage={decrementPage} theme={theme} />
            </div>
        </div>
    );
};

export default App;
