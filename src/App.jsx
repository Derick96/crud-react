import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Admin from './componentes/Admin';
import Login from './componentes/Login';
import NavBar from './componentes/NavBar';
import Reset from './componentes/Reset';
import {auth} from './firebase'

function App() {

  const[firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    // Si existe un usario registrado lo muestra en consola
    auth.onAuthStateChanged(user => {
      console.log(user)
      if(user){
        setFirebaseUser(user)
      } else{
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
          <NavBar firebaseUser={firebaseUser}/>

          {/* Envuelve a los componentes dinamicos dentro del route */}
          <Switch>
          <Route path="/" exact >
              <h1 className="text-center">¡Bienvenidos! Está aplicación te permite llevar un control de tus tareas inviduales o en equipo.</h1>
              <h2 className="text-center">Solo necesitas crearte una cuenta y estarás listo.</h2>
              <footer class="page-footer font-small blue">
                <div class="footer-copyright text-center py-3">© 2021 Creador: Derick Canales
                </div>
            </footer>
            </Route> 

            <Route path="/login">
              <Login/>
            </Route>

            <Route path="/admin">
              <Admin/>
            </Route>

            <Route path="/reset">
              <Reset/>
            </Route>
            
          </Switch>
      </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  )
  
}
<footer>2021. Derick Canales</footer>

export default App;
