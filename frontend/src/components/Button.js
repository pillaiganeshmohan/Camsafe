import React from 'react'
import styles from './LoginSignup.module.css'

function Button({name, onClick}) {
  return (
    <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={onClick}>{name}</button>
    </div>
  )
}

export default Button