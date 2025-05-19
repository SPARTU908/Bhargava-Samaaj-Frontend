import React, {useEffect} from 'react'

const GoogleTranslate = () => {
    useEffect(()=>{

        const script=document.createElement("script");
        script.src="https://translate.google.com/translate_a/element.js?"
        document.body.appendChild(script);

        window.googleTranslateElementInit=()=>{
            new google.translate.TranslateElement({
                pageLanguage: 'hi',
                includedLanguages:"en,hi",
            }
                ,
                'google_translate_element');
        };

    },[])
  return (
    <>
    <h4>Google Translate</h4>
    <div id='google_translate_element'></div>
    </>
    
  )
}

export default GoogleTranslate;




// import React, { useEffect } from 'react';

// const GoogleTranslate = () => {
//   useEffect(() => {
//     // Avoid re-adding the script
//     if (document.getElementById('google-translate-script')) return;

//     // Define callback before loading script
//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: 'hi',
//           includedLanguages: 'en,hi',
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           autoDisplay: false
//         },
//         'google_translate_element'
//       );
//     };

//     // Create and append the script
//     const script = document.createElement('script');
//     script.id = 'google-translate-script';
//     script.src =
//       'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <div>
//       <h4>Translate this page</h4>
//       <div id="google_translate_element"></div>
//     </div>
//   );
// };

// export default GoogleTranslate;
