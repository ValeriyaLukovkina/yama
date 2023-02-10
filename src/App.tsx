
import {AdminPanel} from "./components/admin_panel/AdminPanel";
import {Route, Routes} from "react-router-dom";
import React from "react";
import {SetupMenu} from "./components/menu/SetupMenu";


export function App() {

    return (
        <Routes>
            <Route path="/" element={<SetupMenu/>}/>
            <Route path="/adminHZrjORJGj" element={<AdminPanel/>}/>
        </Routes>
    )
}