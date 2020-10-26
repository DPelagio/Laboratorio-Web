import React from "react";

import "../styles/landing.css";

import cpuIcon from "../img/003-cpu.png";

class Landing2 extends React.Component
{
    render()
    {
        return (
            <div className="landingBody">
                <li className="menuItem menuBuild">
                    <a href="/pc2">
                        <p>Construir PC</p>
                    </a>
                </li>
                <li className="menuItem menuPreset">
                    <a href="/home2">
                    <p>Comprar PC</p>
                    </a>
                </li>
            </div>
        );
    }
}

export default Landing2;