import React from 'react'
import styles from './LoginSignup.module.css'

function Button({name}) {
  return (
    <div className={styles.buttonContainer}>
        <button className={styles.button}>{name}</button>
    </div>
  )
}

export default Button