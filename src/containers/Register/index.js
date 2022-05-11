import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import RegisterImg from '../../assets/createUser.jpg'
import Button from '../../components/Button'
import apiProjectBurguer from '../../services/api'
import { Container, RegisterImage, ContainerItens, Label, Input, SignInLink, ErrorMessage } from './styles'

function Register () {
  const schema = Yup.object().shape({
    name: Yup
      .string()
      .required('O seu nome é obrigatório'),
    email: Yup
      .string()
      .email('Digite um email válido')
      .required('O email é obrigatório'),
    password: Yup
      .string()
      .required('A senha é obrigatória')
      .min(6, 'Deve conter pelo menos 6 caracteres'),
    confirmPassword: Yup
      .string()
      .required('A senha é obrigatória')
      .oneOf([Yup.ref('password')], 'Senha não correspondente!')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    try {
      const { status } = await apiProjectBurguer.post('/users',
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password
        },
        { validateStatus: () => true }
      )

      if (status === 201 | status === 200) {
        toast.success('Cadastro criado com sucesso')
      } else if (status === 409) {
        toast.error('E-mail já cadastrado')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Por favor tente novamente')
    }
  }

  return (
    <Container>
      <RegisterImage src={RegisterImg} alt="Register-image" />
      <ContainerItens>
        <img />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>

        <Label error={errors.name?.message} >Nome</Label>
          <Input type="text"
            {...register('name')} error={errors.name?.message} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label error={errors.email?.message} >Email</Label>
          <Input type="email"
            {...register('email')} error={errors.email?.message} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message} >Senha</Label>
          <Input type="password"
            {...register('password')} error={errors.password?.message} />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label error={errors.confirmPassword?.message} >Confirmar Senha</Label>
          <Input type="password"
            {...register('confirmPassword')} error={errors.confirmPassword?.message} />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 20, marginBottom: 10 }} >Finalizar Cadastro</Button>
        </form>
        <SignInLink>
          Já possui cadastro? <Link style={{ color: 'white' }} to="/login">Entrar</Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}
export default Register
