import styled from "styled-components";
import CardAbout from "./CardAbout";
import Signos from "./Signos";
import { ILogo } from '../assets/icons/logo';


const About =() => {
    return(
        <AboutContainer>
        <ImgContainer>
        <ILogo/>
        <H1>Equipo</H1>
        </ImgContainer>
         <CardsContainer>
         <CardAbout nombre={'Agustin Geloso'} rol={'Documentación'} imagen={'ag.jpg'}/>
         <CardAbout nombre={'Agustin Lopez'} rol={'Infraestructura'} imagen={'al.jpg'}/>
        <CardAbout nombre={'Facundo Chiavon'} rol={'CEO'} imagen={'facu-ch.jpg'}/>
        <CardAbout nombre={'Facundo Gardella'} rol={'Founder'} imagen={'fg.jpg'}/>
        <CardAbout nombre={'Gabriela Bustos'} rol={'Backend'} imagen={'gb.jpg'}/>
        <CardAbout nombre={'Joaquin Peralta'} rol={'Documentación'} imagen={'jp-e.png'}/>
        <CardAbout nombre={'Joaquin Roa'} rol={'Frontend / Backend'}imagen={'jr.jpg'}/>
        <CardAbout nombre={'Luciana Manetta'} rol={'Frontend'} imagen={'lm.jpg'}/>
        <CardAbout nombre={'Milagros Ceccoli'} rol={'Documentación'} imagen={'mc.jpg'}/>
        <CardAbout nombre={'Valentin Urbine'} rol={'Frontend'} imagen={'vu.jpg'}/>
        <CardAbout nombre={'Veronica Vera'} rol={'Documentacion'} imagen={'vv.png'}/>
        </CardsContainer>
        <Signos/>
        </AboutContainer>

    )

}

export default About;



const AboutContainer = styled.div`
background-image: url(./bg-home.jpg);
background-size:cover;
display:flex;
align-items:center;
flex-direction:column;
width:100vw;
height:100vh;

`;

const H1 = styled.h1`
 display:flex;
 font-weight: 900;
 font-size: 30px;
 color: rgb(16, 137, 211);

`;

const CardsContainer = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:center;

`;

const ImgContainer = styled.div`
display:flex;
width:10%;
justify-content:center;
align-items:center;


`;