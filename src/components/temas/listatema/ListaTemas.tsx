import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import {Box} from '@mui/material';
import './ListaTema.css';
import Tema from '../../../models/Tema';
import useLocalStorage from 'react-use-localstorage';
import { busca } from '../../../services/Service';

function ListaTema() {

  const [temas, setTemas] = useState<Tema[]>([]);
  const [token, setToken] = useLocalStorage('token');
  let navigate = useNavigate();

  useEffect(() => {
    if (token =='') {
      alert('Precisar estar logado')
      navigate('/login')
    }
  }, [token]);

  async function getTema() {
    await busca ('/tema', setTemas, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getTema()
  }, [temas.length])

  return (
    <>
    {
      temas.map(tema =>(
      <Box m={2} >
        <Card variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema
            </Typography>
            <Typography variant="h5" component="h2">
              {tema.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioTemas/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="marginLeft" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarTemas/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))
    }
    </>
  );
}


export default ListaTema;