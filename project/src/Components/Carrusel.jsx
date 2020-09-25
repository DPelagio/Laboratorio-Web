import React from "react";
import { Carousel ,Card} from "react-bootstrap";
import image from "../img/intel.png";

class Carrusel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }

    searchItem =(params) =>{
        this.setState({
        });
    };

    render() {
        return(
            <Carousel>
                <Carousel.Item>
                    <Card style={{ width: '100%' }}>
                        <Card.Img style={{ height: '200px' }} variant="top" src={image} />
                        <Card.Body>
                        <Card.Title>Procesador Intel Core i3-8100 / 4 Nucleos - 4 Hilos / Socket 1151-V2 / BX80684I38100</Card.Title>
                        <Card.Text>
                            &#36;299
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
                <Carousel.Item>
                    <Card style={{ width: '100%' }}>
                        <Card.Img style={{ height: '200px' }} variant="top" src={image} />
                        <Card.Body>
                        <Card.Title>Procesador Intel Celeron G4930 Dual core / 3.20GHz / 2MB Cache / BX80684G4930</Card.Title>
                        <Card.Text>
                            &#36;299
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
                <Carousel.Item>
                    <Card style={{ width: '100%' }}>
                        <Card.Img style={{ height: '200px' }} variant="top" src={image} />
                        <Card.Body>
                        <Card.Title>Procesador Intel Celeron G4920 Dual core / 3.20GHz / 2MB Cache / BX80684G4920</Card.Title>
                        <Card.Text>
                            &#36;299
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Carousel.Item>
            </Carousel>
        );
    }
}

export default Carrusel;