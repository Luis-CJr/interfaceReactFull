import styled from 'styled-components'

import BackgroundLogin from '../../assets/bgloginburguer.jpg'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url('${BackgroundLogin}');
  display: flex;
  justify-content: center;
  align-items: center;
`
export const LoginImage = styled.img`
height: 70%;
`

export const ContainerItens = styled.div`
background: #D6A736;
border-radius: 0 10px 10px 0;
height: 70%;
padding: 40px 90px;
display: flex;
flex-direction: column;
justify-content: center;

form{
  display:flex;
  flex-direction: column;
}

h1{
  font-style: normal;
font-weight: 500;
font-size: 28px;
line-height: 28px;
color: #FFFFFF;
margin-top: 15px;
margin-bottom: 10px;
}
`

export const Label = styled.p`
font-style: normal;
font-weight: 500;
font-size: 15px;
line-height: 14px;
color: #FFFFFF;
margin-top: ${props => (props.error ? '1px' : '3px')};
margin-bottom: 0px;

`

export const Input = styled.input`
background: #FFFFFF;
box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
border-radius: 5px;
border: ${props => (props.error ? '1px solid red' : 'none')};
width: 355px;
height: 40px;
padding-left: 10px;
`

export const SignInLink = styled.p`
text-align: center;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;


a{
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;
}
`

export const ErrorMessage = styled.p`
font-style: normal;
font-weight: 600;
font-size: 8px;
line-height: 16px;
color: red;
margin-top: 2px;
`
