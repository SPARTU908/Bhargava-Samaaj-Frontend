import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import styles from "./Membership.module.css"
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const navigate = useNavigate();
  const handleSoon = () => {
    navigate("/newmember");
  };
  return (
    <>
   <Navbar/>
    <div className={styles.heading} onClick={handleSoon}> Coming Soon!</div>
     </>
  )
}

export default Membership