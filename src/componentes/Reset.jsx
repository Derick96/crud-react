import React from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom' //Nos genera props

const Reset = (props) => {

    const[email, setEmail] = React.useState('')
    const[error, setError] = React.useState(null)

    const procesarDatos = e => {
        e.preventDefault() //Para que no haga el metodo get por defecto
        if(!email.trim()){
            console.log('Ingrese Email, por favor.')
            setError('Ingrese Email, por favor.')
            return
        }
        setError(null) //Para que se borren los mensajes de advertencias una vez validado todo   
        recuperar()
    }


    const recuperar = React.useCallback(async() => {
        try {
            
            await auth.sendPasswordResetEmail(email)
            console.log('Correo enviado')
            props.history.push('/login')

        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }, [email, props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                Reiniciar contraseña
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

                        <button className="btn btn-outline-info btn-lg btn-block" type="submit">
                            Reiniciar contraseña
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter (Reset)
