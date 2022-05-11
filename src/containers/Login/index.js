import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import LoginImg from '../../assets/burguerlogin.jpg'
import Button from '../../components/Button'
import { useUser } from '../../hooks/UserContext'
import apiProjectBurguer from '../../services/api'
import { Container, LoginImage, ContainerItens, Label, Input, SignInLink, ErrorMessage } from './styles'

function Login () {
  const { putUserData } = useUser()
  console.log(putUserData)

  const schema = Yup.object().shape({
    email: Yup
      .string()
      .email('Digite um email válido')
      .required('O email é obrigatório'),
    password: Yup
      .string()
      .required('A senha é obrigatória')
      .min(6, 'Deve conter pelo menos 6 caracteres')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    const { data } = await toast.promise(

      apiProjectBurguer.post('sessions', {
        email: clientData.email,
        password: clientData.password
      }),
      {
        pending: 'Verificando seus dados...',
        success: 'Bem vindo(a)',
        error: 'Oops.. Algo não está certo'
      }
    )
    putUserData(data)
  }

  return (
    <Container>
      <LoginImage src={LoginImg} alt="Login-image" />
      <ContainerItens>
        <img />
        <h1>Bem-vindo!</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>

          <Label>Email</Label>
          <Input type="email"
            {...register('email')} error={errors.email?.message} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input type="password"
            {...register('password')} error={errors.password?.message} />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 80, marginBottom: 30 }} >Entrar</Button>
        </form>
        <SignInLink>
          Não possui cadastro? <Link style={{ color: 'white' }} to="/cadastro">Cadastre-se</Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}
export default Login
