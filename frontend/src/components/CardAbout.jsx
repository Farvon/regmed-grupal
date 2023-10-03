import styled from 'styled-components'; 

const CardAbout =({nombre,rol,imagen}) =>{
    const img = imagen || 'logo_circle.png';
    return(
        
        <CardContainer>
        <AlumnoImg src={`../../public/${img}`}/>
        <H2>{nombre}</H2>
        <H3>{rol}</H3>
        </CardContainer>

        



    )




}

export default CardAbout;


const CardContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-around;
padding:16px;
width: 150px;
height: 240px;
margin:1.5%;
background: #F8F9FD;
background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
border-radius: 40px;
padding: 25px 35px;
border: 5px solid rgb(255, 255, 255);
box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;


`;

const AlumnoImg = styled.img`
width:70%;
border-radius:50%;
border: 5px solid rgb(255, 255, 255);
box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 10px 10px -5px;

`;


const H2 = styled.h2`
text-align: center;
font-weight: 900;
font-size:1.5rem;
color: rgb(16, 137, 211);


`;


const H3 = styled.h3`
font-size:1rem;
font-weight:bold;
color: rgb(16, 137, 211);


`;



