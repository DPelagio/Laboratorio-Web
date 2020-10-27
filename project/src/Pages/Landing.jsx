import React from "react";

import "../styles/landing.css";
import cpuIcon from "../img/003-cpu.png";

class Landing extends React.Component {
    render() {
        return(
            <div className="landingBody">
                <li className="menuItem menuBuild">
                    <a href="/armar-pc">
                        <p>Construir PC</p>
                    </a>
                </li>
                <li className="menuItem menuPreset">
                    <a href="/comprar-pc">
                    <p>Comprar PC</p>
                    </a>
                </li>
            </div>
        );
    }
}

export default Landing;
