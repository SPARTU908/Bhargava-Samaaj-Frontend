// import React, { useState } from 'react';
// import Membership from '../pages/Membership';
// import DisplayForm from '../pages/DisplayForm';
// import Payment from '../pages/Payment';
// import Upload from "../pages/Upload"
// import styles from './Download.module.css';


// const Download = () => {
//   const [step, setStep] = useState(1);
//   const nextStep = () => setStep((prev) => prev + 1);
//   const prevStep = () => setStep((prev) => prev - 1);
//   const [showModal, setShowModal] = useState(true); 

  
//   const handleSubmit = () => {
//    console.log("Submitting all data...");
//     alert("Form submitted!");
//   };

//   const steps = [
//     <Membership nextStep={nextStep} />,
//     <DisplayForm   nextStep={nextStep} />,
//     <Payment prevStep={prevStep} nextStep={nextStep} />,
//     <Upload prevStep={prevStep} handleSubmit={handleSubmit}/>
//   ];

//   const stepTitles = ['Fill the Membership Form ', 'Download The Form', 'Pay the Fees', 'Upload the form'];

//   return (
//     <div className={styles.container}>
    
//       {showModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modalContent}>
//             <h2>Instructions</h2>
//             <ol>
//               <li>1.Fill the membership form carefully.</li>
//               <li>2.Download the form .</li>
//               <li>3.Make the required payment.</li>
//               <li>4.Upload the signed form with reference signatures.</li>
//             </ol>
//             <button onClick={() => setShowModal(false)}>Got it!</button>
//           </div>
//         </div>
//       )}
//       <div className={styles.stepper}>
//         {stepTitles.map((title, index) => {
//           const stepNumber = index + 1;
//           const isCompleted = step > stepNumber;
//           const isActive = step === stepNumber;

//           return (
//             <div
//               key={index}
//               className={`${styles.step} ${
//                 isCompleted ? styles.completed : isActive ? styles.active : ''
//               }`}
//             >
//               <div className={styles.circle}>{stepNumber}</div>
//               <div className={styles.label}>{title}</div>
//             </div>
//           );
//         })}
//       </div>

//       <div className={styles.form}>{steps[step - 1]}</div>

//       {/* <div className={styles.navigation}>
//         {step > 1 && <button onClick={prevStep}>Back</button>}
//         {step < steps.length && <button onClick={nextStep}>Next</button>}
//         {step === steps.length && <button onClick={handleSubmit}>Submit</button>}
//       </div> */}
//     </div>
//   );
// };

// export default Download;

import React from 'react'
import Navbar from "../components/Navbar/Navbar";

const Download = () => {
  return (
    <>
    <Navbar/>
     <div>Coming Soon</div>
    </>
   
  )
}

export default Download
