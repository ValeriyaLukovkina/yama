import cl from "../../styles/Loader.module.css"
import mops from "../../YamaNeon.png"


export function MenuLoader() {
    return (
        <div className="flex fixed items-center content-center justify-center top-0 right-0 left-0 bottom-0">
        <div className={cl.menuLoader}>
            <img src={mops}/>
        </div>
        </div>
    )
}