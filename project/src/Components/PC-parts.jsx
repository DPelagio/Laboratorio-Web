import React from "react";

/*import hddIcon from "../img/001-harddisk.png";
import vgaIcon from "../img/002-vga.png";
import cpuIcon from "../img/003-cpu.png";
import ramIcon from "../img/004-ram.png";
import caseIcon from "../img/005-case.png";*/

import { parts } from "./PC-parts-data";

class PC_parts extends React.Component
{
    render()
    {
        return (
            <div className="pcBody">
                <div className="icons">
                    {parts.map((data, key) =>
                    {
                        return (
                            <div key={key}>
                                <ul>
                                <p className="part_name"> {data.part_name} </p>
                                <br/>
                                    <img src={data.image} />
                                    <p className="desc">{data.desc}</p>
                                </ul>
                            </div>
                        )
                    })}
                </div>
                <div className="iconAuthor">Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com" title="Flaticon">www.flaticon.com</a></div>
            </div>
        );
    }
}

export default PC_parts;