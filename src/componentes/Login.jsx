import React from 'react'
import { auth, db } from '../firebase'
import { withRouter } from 'react-router-dom' //Nos genera props

const Login = (props) => {

    const[email, setEmail] = React.useState('')
    const[pass, setPass] = React.useState('')
    const[error, setError] = React.useState(null)
    const [esRegistro, setEsRegistro] = React.useState(true)

    const procesarDatos = e => {
        e.preventDefault() //Para que no haga el metodo get por defecto
        if(!email.trim()){
            console.log('Ingrese Email, por favor.')
            setError('Ingrese Email, por favor.')
            return
        }
        if(!pass.trim()){
            console.log('Ingrese Contraseña, por favor.')
            setError('Ingrese Contraseña, por favor.')
            return
        }
        if(pass.length <= 8){
            console.log('Contraseña mayor o igual a 8 carácteres')
            setError('La contraseña debe ser mayor o igual a 8 carácteres')
            return
        }
        console.log('Correcto...')
        setError(null) //Para que se borren los mensajes de advertencias una vez validado todo

        if(esRegistro){
            registrar()
        }else{
            login()
        }    
    }

    const login = React.useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin') //Empuja a la ventana de admin

        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if(error.code === 'auth/user-not-found'){
                setError('Email no registrado')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta')
            }
            if(error.code === 'auth/weak-password'){
                setError('La contraseña debe ser mayor o igual a 8 caracteres')
            }
        }
    } ,[email, pass, props.history])

    // Para que el usuario cree una nueva cuenta
    const registrar = React.useCallback(async() => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })

            await db.collection(res.user.uid).add({
                name: 'Tarea de ejemplo',
                fecha: Date.now()
            })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')

        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('Este email ya esta registrado')
            }
        }

    }, [email, pass, props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de usuario' : 'Login de acceso'
                }
            </h3>
            <hr />
            {/* Para hacerlo rsponsive y que quede centrado*/}
            <div className="row justify-content-center">
                {/* En dispositivos peque usara 12 columnas y asi ira tomando segun la medida 
                cuando se vaya agrandando la pantalla*/}
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                             error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }

                        <input
                            type="email"
                            className= "form-control mb-2"
                            placeholder="Ingrese un email"
                            onChange = {e => setEmail(e.target.value)}
                            value ={email}
                        />

                        <input
                            type="password"
                            className= "form-control mb-2"
                            placeholder="Ingrese su contraseña"
                            onChange = {e => setPass(e.target.value)}
                            value = {pass}
                        />

                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>

                        <button 
                            className="btn btn-info btn-sm btn-block"
                            onClick={() => setEsRegistro(!esRegistro)} //si esta en veradero pasara a falso y viceversa
                            type="button" // asi no ejecuta procesarDatos
                        >
                            {
                                esRegistro ? 'YA ESTAS REGISTRADO' : '¿No tienes una cuenta?'
                            }
                        </button>

                        {
                            !esRegistro ? (
                                <button
                                    className="btn btn-lg btn-danger btn-sm mt-2 btn-block"
                                    type="button"
                                    onClick={() => props.history.push('/reset')}
                                > 
                                Recuperar contraseña
                                </button>
                            ) : null
                        }
         
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
