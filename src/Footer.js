import React from 'react'

const Footer = () => {
  const t=new Date()
  return (
    <footer className='Footer'>
      <p>Copyright &copy; {t.getFullYear()}</p>
    </footer>
  )
}

export default Footer