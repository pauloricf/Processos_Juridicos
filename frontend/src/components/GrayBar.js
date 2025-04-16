import React from 'react'
import styles from "./GrayBar.module.css"
const GrayBar = ({children}) => {
  return (
    <div className={styles.filter_section_bar}>{children}</div>
  )
}

export default GrayBar