import React from "react";
import {Route,Routes} from 'react-router-dom'
import GamePage from "./pages/GamePage";
import FriendsPage from "./pages/FriendsPage";
import {QueryClientProvider} from "@tanstack/react-query/build/legacy/QueryClientProvider";
import {QueryClient} from "@tanstack/react-query";

function App()
{
    return(
        <Routes>
            <Route path="/" element={<GamePage/>}/>
            <Route path="/friends" element={<FriendsPage/>}/>
        </Routes>
    )
}

export default App