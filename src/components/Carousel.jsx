import React from 'react'
import image1 from '../images/2.jpg'
import image2 from '../images/3.jpg'
import image3 from '../images/4.jpg'

function Carosel(){
return(
    <div id="carouselExampleControls" className="carousel slide w-75" data-ride="carousel">

        <div className="carousel-inner">
            <div className="carousel-item active">
                <img class="d-block w-100" src={image1} alt="First slide"></img>
            </div>
            <div className="carousel-item">
                <img class="d-block w-100" src={image2} alt="second slide"></img>
            </div>
            <div className="carousel-item">
                <img class="d-block w-100" src={image3} alt="third slide"></img>
            </div>
        </div>
     
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
)

}

export default Carosel