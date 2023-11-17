import React from "react";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Collections from "./Collections";
import Mutantcore from "./Mutantcore";
import Moondogs from "./Moondogs";
import Kyudoarcher from "./Kyudoarcher";
import Footer from "./Footer";
import Upcomingnft from "./Upcomingnft";
import Zkpunks from "./Zkpunks";
import Zkboredapes from "./Zkboredapes";
import Skullverse from "./Skullverse";
import Zksyncbird from "./Zksyncbird";
import {ThemeProvider} from "./context/ThemeContext"
import Koolcamels from "./Koolcamels";
import Zkrock from "./ZkRock";
import Zkboys from "./Zkboys";
import Zkanimals from "./Zkanimals";
import Shnoise from "./Shnoise";
import Thesyncers from "./Thesyncers";
import Goatsofsui from "./Goatsofsui";
import Otterlabs from "./Otterlabs";
import Zkdino from "./Zkdino";

export default function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Header />
                
                    <Routes>
                        <Route path="/" element={<Collections />} />
                        <Route path="/Mutantcore" element={<Mutantcore />} />
                        <Route path="/Moondogs" element={<Moondogs />} />
                        <Route path="/KyudoArcher" element={<Kyudoarcher />} />
                        <Route path="/upcomingnft" element={<Upcomingnft />} />
                        <Route path="/zkpunks" element={<Zkpunks />} />
                        <Route path="/zkboredapes" element={<Zkboredapes />} />
                        <Route path="/skullverse" element={<Skullverse />} />
                        <Route path="/zksyncbird" element={<Zksyncbird />} />
                        <Route path="/koolcamels" element={<Koolcamels />} />
                        <Route path="/zkRock" element={<Zkrock />} />
                        <Route path="/Zkboys" element={<Zkboys/>} />
                        <Route path="/Zkanimals" element={<Zkanimals/>} />
                        <Route path="/Shnoises" element={<Shnoise/>} />
                        <Route path="/Thesyncers" element={<Thesyncers/>} />
                        <Route path="/Goatsofsui" element={<Goatsofsui/>} />
                        <Route path="/Otterlabs" element={<Otterlabs/>} />
                        <Route path="/Zkdino" element={<Zkdino/>} />

                    </Routes>
                
                <Footer />
            </BrowserRouter>
        </ThemeProvider>
    );
}
