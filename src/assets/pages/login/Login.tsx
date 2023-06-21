import React, { ChangeEvent, useEffect, useState } from 'react'
import './Login.css'
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import UserLogin from '../../../models/UserLogin'
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect'
import useLocalStorage from 'react-use-localstorage'
import { login } from '../../../services/Service'

function Login() {
  let navigate = useNavigate()

  const [token, setToken] = useLocalStorage('token')
  const [userLogin, setUserLogin] = useState<UserLogin>({
    id: 0,
    usuario: '',
    senha: '',
    token: ''
  })

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin, 
      [e.target.name] : e.target.value
    })
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(`usuario/logar`, userLogin,setToken)
      alert('User logged in successfully')
    }catch (error) {
      alert('Dados incorretos')
  }

  useEffect(()=> {
    if (token != '') {
      navigate('/home')
    }
  }, [token])

  

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid xs={6} alignItems="center">
        <Box padding={20}>
          <form onSubmit={onSubmit}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              align="center"
              className="textos1"
            >
              Entrar
            </Typography>
            <TextField
              value={userLogin.usuario}
              onChange={(e:ChangeEvent<HTMLInputElement>)=> updateModel(e)}
              id="usuario"
              label="usuário"
              variant="outlined"
              name="usuario"
              margin="normal"
              fullWidth
            />
            <TextField
              value={userLogin.senha}
              onChange={(e:ChangeEvent<HTMLInputElement>)=> updateModel(e)}
              id="senha"
              label="senha"
              variant="outlined"
              name="senha"
              margin="normal"
              type="password"
              fullWidth
            />
            <Box marginTop={2} textAlign="center">
              
                <Button type="submit" variant="contained" color="primary">
                  Logar
                </Button>
              
            </Box>
          </form>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Box marginRight={1}>
              <Typography variant="subtitle1" gutterBottom align="center">
                Não tem uma conta?
              </Typography>
            </Box>
            <Link to="/cadastro" className="text-decorator-none">
              <Typography
                variant="subtitle1"
                gutterBottom
                align="center"
                className="textos1"
              >
                Cadastre-se
              </Typography>
            </Link>
          </Box>
        </Box>
      </Grid>
      <Grid xs={6} className="imagem"></Grid>
    </Grid>
  )
}

export default Login