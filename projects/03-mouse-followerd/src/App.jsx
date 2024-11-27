import { useEffect, useState } from "react"

const FollowMouse = () => {
  
  // Hook useState: al cambiar el estado vuelve a renderizar el componente para reflejar los cambios en la interfaz
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0})

  /* Hook useEffect: permite ejectutar código al montarse el componente en el DOM (minimo esta vez se ejecuta) y cada vez 
  que cambian las dependencias que le indiquemos. El código a ejecutar va entre llaves {} y al final las dependencias 
  entre [] (un array). 
  ATENCIÓN: Si no se le pasa NADA como dependencia, se ejecutara el código cada vez que se renderice
  el componente. Si se le pasa un array vacío: [], solo se ejecutara la primera vez que renderice y si se le especifica */
  
  useEffect(()=> {
    console.log('effect', { enabled })
  
    const handleMove = (event) => {
      const { clientX, clientY} = event
      console.log('handleMove', { clientX, clientY })
      setPosition({ x: clientX, y: clientY})
    }

    // Suscripción a un evento de manejo del ratón
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    /* Para limpiar el los eventos (así eliminamos las suscripciones que seguirán activas) utlizamos return.
      Esto limpiara cada vez que se desmonte el componente o que cambien las dependencias */
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }

  }, [enabled])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity:0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

// El cuerpo de las funciones de componentes se ejecutan cada vez que se renderiza el componente
function App() {
  return(
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
