import React from "react";
import ReactChatWidget from '../Components/chatbot/React-chat-widget'

import "../styles/pc.css";

import hddIcon from "../img/001-harddisk.png";
import vgaIcon from "../img/002-vga.png";
import cpuIcon from "../img/003-cpu.png";
import ramIcon from "../img/004-ram.png";
import caseIcon from "../img/005-case.png";

class PC2 extends React.Component
{
    render()
    {
        return (
            <div className="pcBody">
                <h1>Constuye una PC presonalizada</h1>
                <p>Utiliza el chatbot de la derecha para empezar.</p>
                <div className="icons">
                    <ul><img src={cpuIcon}/>
                    <p>Nombre del componente <br/> Descripción del componente</p>
                    </ul>
                    <ul><img src={ramIcon}/>
                    <p>Nombre del componente <br/> Descripción del componente</p>
                    </ul>
                    <ul><img src={hddIcon}/>
                    <p>Nombre del componente <br/> Descripción del componente</p>
                    </ul>
                    <ul><img src={vgaIcon}/>
                    <p>Nombre del componente <br/> Descripción del componente</p>
                    </ul>
                    <ul><img src={caseIcon}/>
                    <p>Nombre del componente <br/> Descripción del componente</p>
                    </ul>
                </div>
                <div className="iconAuthor">Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com" title="Flaticon">www.flaticon.com</a></div>
                <div style={{ display: 'flex', position: 'sticky', top: '1em', justifyContent: 'flex-end', padding: '0 1em' , color: 'black'}}>
                    <ReactChatWidget />
                </div>
            </div>
        );
    }
}

export default PC2;