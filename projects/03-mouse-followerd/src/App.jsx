import { useEffect, useState } from "react"

function App() {
  
  // Hook useState: al cambiar vuelve a renderizar el componente para reflejar los cambios en la interfaz
  const [enabled, setEnabled] = useState(false)

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
    }
  
    window.addEventListener('pointermove', handleMove)
  
  }, [enabled])

  return(
    <main>
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
        transform: 'translate(0px, 0px)'
      }}
      />
      
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

export default App
