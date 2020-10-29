import React from "react";

import "../styles/landing.css";

class Landing extends React.Component
{
    render()
    {
        return (
            <div className="landingBody">
                <h1>Bienvenido a TECompu</h1>
                <li className="menuItem menuBuild">
                    <a href="/armar-pc">
                        <div>
                            <p>Construir PC</p>
                            <img src='/img/wrenchIcon.png' alt="" />
                        </div>
                    </a>
                </li>
                <li className="menuItem menuPreset">
                    <a href="/comprar-pc">
                        <div>
                            <p>Comprar PC</p>
                            <img src='/img/moneyIcon.png' alt="" />
                        </div>
                    </a>
                </li>
            </div>
        );
    }
}

export default Landing;
