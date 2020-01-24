import React from 'react'
import styles from './Loader.module.css'

const Loader = ({
    children
}) => (
    <div className={styles.loader}>{ children }</div>
)

export default Loader