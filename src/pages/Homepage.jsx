import React, { useState } from "react";
import styles from "./Homepage.module.css";
import banner from "../assets/banner.jpg";
import president from "../assets/President.jpeg";
import sanjay from "../assets/sanjay.jpg";
import announcement from "../assets/announce.jpg";
import ImageSlider from "../components/ImageSlider/ImageSlider.jsx";
import img1 from "../assets/imgs1.png";
import img2 from "../assets/imgs2.png";
import img3 from "../assets/imgs3.png";
import bannerHaridwar from "../assets/haridwar-banner.png";
import activity from "../assets/activity.png";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { FaClock } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import Haridwar from "../assets/Haridwar.jpeg";
import anil from "../assets/Anil Bhargava.jpeg";
import sanjay2 from "../assets/Sanjay Bhargava.jpeg";
import vijay from "../assets/Vijay Bhargava.jpeg";
import mohit from "../assets/Mohit Bhargava.jpeg";
import ajay from "../assets/Ajay Bhargava.jpeg";
import vivek from "../assets/Vivek Bhargava.jpeg";
import ramesh from "../assets/Ramesh Bhargava.jpeg";
import girish from "../assets/Girish.jpg";
import pankaj from "../assets/Pankaj.jpg";
import sanjeev from "../assets/sanjeev.jpg";
import anil2 from "../assets/anil.jpg";
import saurabh from "../assets/Saurabh.jpg";
import deepesh from "../assets/deepesh.jpg";
import harish from "../assets/harish.png";
import salil from "../assets/salil.jpg";
import sanjay3 from "../assets/sanjay2.jpg";
import sohan from "../assets/sohan.jpg";
import narayan from "../assets/narayan.jpeg";

import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };
  const navigate = useNavigate();
  const handleHaridwar = () => {
    navigate("/haridwar");
  };
  return (
    <>
      <Navbar />
      <div>
        <img src={banner} alt="" className={styles.banner} />
      </div>
      <div className={styles.newsWrapper}>
        <div className={styles.news}>
          <div className={styles.scrollText}>
            <span className={styles.latest}>Latest News</span>
            -Bhargava Samaj announces the Annual Cultural Meet 2025, celebrating
            heritage and unity.Scholarship applications for meritorious Bhargava
            students are now open until May 31st.
          </div>
        </div>
      </div>

      {/* Annoucement Section */}
      <div className={styles.announceSection}>
        <div className={styles.announce}>
          <img src={announcement} alt="" className={styles.announceImg} />
        </div>
        <div className={styles.headingAnnounce}>
          {" "}
          वार्षिक आम बैठक निर्धारित – 15 जून 2025
          <div className={styles.content}>
            भर्गव समाज को यह सूचित करते हुए प्रसन्नता हो रही है कि वार्षिक आम
            बैठक (AGM) रविवार, 15 जून 2025 को कम्युनिटी हॉल, वाराणसी में आयोजित
            की जाएगी। समाज के सभी सदस्यों से निवेदन है कि वे इस बैठक में उपस्थित
            होकर आगामी वर्ष की योजनाओं और महत्वपूर्ण चर्चाओं में भाग लें। बैठक
            का एजेंडा और समय की जानकारी शीघ्र ही साझा की जाएगी।भर्गव समाज को यह
            सूचित करते हुए प्रसन्नता हो रही है कि वार्षिक आम बैठक (AGM) रविवार,
            15 जून 2025 को कम्युनिटी हॉल, वाराणसी में आयोजित की जाएगी।
          </div>
        </div>
      </div>

      {/* Festival */}
      <div className={styles.festival}>
        <div className={styles.festHead}> Upcoming Festival 2025</div>
        <div className={styles.festivalBox}>
          <div className={styles.col1}>
            <div className={styles.festBox1}>Festival1</div>
            <div className={styles.festBox1}>Festival2</div>
          </div>
          <div className={styles.col2}>
            <div className={styles.festBox2}>Festival3</div>
            <div className={styles.festBox2}>Festival4</div>
            <div className={styles.festBox2}>Festival5</div>
          </div>
        </div>
      </div>

      {/* Activities-Section */}
      <div className={styles.activities}>
        <div className={styles.activityHeading}> Upcoming Activities</div>
        <div className={styles.activities_row_1}>
          <div className={styles.imageContainer}>
            <img src={activity} alt="" className={styles.actImg} />
            <div className={styles.topRightBox}>
              03 <br />
              April <br />
              2025
            </div>
          </div>
          <div className={styles.rightAct}>
            <div className={styles.actBox1}>
              <div className={styles.line}></div>
              <div className={styles.date}>
                <div className={styles.three}>03</div>
                <div className={styles.month}>DEC</div>
                <div className={styles.year}>2025</div>
              </div>
              <div className={styles.actInfo}>
                <div className={styles.actName}>Rajendra Prasad Jayanti</div>
                <div className={styles.actTiming}>
                  <FaClock className={styles.clockIcon} />
                  12:00-2:00
                </div>
                <div className={styles.actTiming}>
                  <IoLocation className={styles.clockIcon} />
                  Hazaribagh
                </div>
              </div>
              <div className={styles.actName}>Sunday</div>
            </div>
            <div className={styles.actBox2}>
              <div className={styles.line}></div>
              <div className={styles.date}>
                <div className={styles.three}>03</div>
                <div className={styles.month}>DEC</div>
                <div className={styles.year}>2025</div>
              </div>
              <div className={styles.actInfo}>
                <div className={styles.actName}>Rajendra Prasad Jayanti</div>
                <div className={styles.actTiming}>
                  <FaClock className={styles.clockIcon} />
                  12:00-2:00
                </div>
                <div className={styles.actTiming}>
                  <IoLocation className={styles.clockIcon} />
                  Hazaribagh
                </div>
              </div>
              <div className={styles.actName}>Sunday</div>
            </div>
            <div className={styles.actBox2}>
              <div className={styles.line}></div>
              <div className={styles.date}>
                <div className={styles.three}>03</div>
                <div className={styles.month}>DEC</div>
                <div className={styles.year}>2025</div>
              </div>
              <div className={styles.actInfo}>
                <div className={styles.actName}>Rajendra Prasad Jayanti</div>
                <div className={styles.actTiming}>
                  <FaClock className={styles.clockIcon} />
                  12:00-2:00
                </div>
                <div className={styles.actTiming}>
                  <IoLocation className={styles.clockIcon} />
                  Hazaribagh
                </div>
              </div>
              <div className={styles.actName}>Sunday</div>
            </div>
          </div>
        </div>
      </div>

      {/* Message of President */}
      <div className={styles.row1}>
        <div>
          <img src={president} alt="" className={styles.presImg} />
        </div>
        <div className={styles.rightContent}>
          <div className={styles.heading}>अध्यक्ष</div>
          <div className={styles.contentPres}>
            <div className={styles.message}>
              प्रधान की कलम से.... <br />
              प्रिय बंधुवर, सादर अभिनन्दन !! सर्वप्रथम में आप सभी स्नेहीजनों,
              बड़े व छोटे भाई. बहनों का का मुझे व मेरी कार्यकारिणी को भारी मतों
              से विजय का आशीर्वाद देने के लिए हृदय से आभार व्यक्त करता हूँ। आप
              सभी हमारी उर्जा हैं, हमारी ताकत हैं, चुनाव अधिकारी श्री एल पी
              भार्गव, जयपुर के सानिध्य में चुनाव शांति पूर्वक संपन्न हुए, आपको
              हृदय से साधुवाद! मैं पूर्व प्रधान श्री नरेश जी भार्गव (भार्गव
              लोढ़ा) जी का भी विशेष आभारी हैं जिनके नेतृत्व में इस बार चुनाव में
              प्रयोग किये गए मतपत्रो की गणना का कार्य स्कैनर के द्वारा करवाया
              गया, जिसमे सभी प्रत्याशियो ने अपना विश्ववास व्यक्त किया और भारी
              मतों की गणना का कार्य कुछ घंटो में संपन्न हो गया! आपकी अपेक्षाओ का
              दायित्व स्वीकार करते हुए मेरे द्वारा किये गए सभी वादों को पूरा
              करने का मेरे प्रयास रहेगा और आपका प्रत्येक परिस्थितियो में साथ
              देने हेतु मैं और मेरी कार्यकारिणी दृढ संकल्पित हैं। आपका भरोसा और
              यही ऊर्जा हमारे साथ आगे भी बनाये रखिये हम आप सभी के विश्वास और
              जनभागीदारी के माध्यम से आने वाले समय में निश्चित रूप से इतिहास
              रचेंगे। मेरे सन्देश लिखे जाने तक मेरे द्वारा दिए गए आश्वासनों में
              कार्यकारिणी की प्रथम बैठक में ही राष्ट्रीय स्तर पर दो महिला सभा के
              लंबित विवाद को समाप्त करते हुए हल निकालने का प्रयास किया गया हैं
              उम्मीद करता हूँ आपने वाले समय में दोनों सभाओ का एकीकरण कर एक सभा
              को अखिल भारतीय भार्गव सभा की और से संबद्धीकरण (affilation) दे दिया
              जावेगा ! नए न्यायाधीकरण का गठन भी संदन द्वारा कर दिया गया हैं!
              मुझे यह कहते हुए गर्व होता है की हमारे आराध्य भगवान् श्री परशुराम
              जी के आशीर्वाद से हमारा समाज भौतिक व् बौद्धिक रूप से साधन
              सम्पन्नता में अग्रणी हैं हमारी युवा पीढ़ी पर भी मुझे गर्व हैं की
              हमारी गौरवमयी परम्परा को नई ऊंचाइयों पर पहुंचाने के लिए तन मन धन
              और पूर्ण समर्पण की भावना से सामाजिक सुधार हेतु पूर्ण प्रयास किये
              जायेंगे और अपनी भूमिका का निर्वाहन करेंगे। विगत वर्षों में सभा
              द्वारा अपने पूर्वजो या समाज के महापुरषों से प्राप्त अचल समपत्तियो
              पर भवनों के नवीन निर्माण कराके उनसे आय के नियमित साधन उत्पन्न किये
              जाने का मेरा प्रयास रहेंगा ताकि महंगाई के इस युग में इस प्रकार से
              प्राप्त होने वाली आय से समाज के जरूरत मंद परिवारों को अधिक से अधिक
              सहायता राशि उपलब्ध कराई जा सके ! सभा की आय में बढ़ोतरी हेतु सभी
              प्रयास किये जाने का भी मेरा संकल्प हैं ! अलवर में प्रदाश्रम का
              निर्माण, रेवाड़ी में हनुमान मंदिर के समाने की बगीची, भार्गव
              बोर्डिंग हॉउस (हिन्दू हाई स्कूल) की भूमि एवं मोहिनी धर्मशाला,
              प्रयाग्राम स्थित धर्मशाला का पुननिर्माण हमारी प्राथमिकता होगी! हॉल
              ही देश की कई शहरो में सभा द्वारा जमींन खरीदी गई उस पर भव्य भवन
              बनाए जाने हेतु हमारी प्राथमिकता रहेगी ! समाज में अविवाहित युवक /
              युवतियो हेतु सुयोग्य वर / वधु की तलाश एक अत्यंत चुनौतीपूर्ण कार्य
              हो गया हैं। हालाँकि सभा अपने स्वजाति बंधुओ के विवाह योग्य युवक,
              युवतियो के लिए वेबसाइट, मासिक पत्रिका के माध्यम से वैवाहिक विवरण
              जन जन तक पहुंचाने के पूर्ण प्रयास कर रही हैं। हर साल प्रोजेक्टर
              एवम बड़ी स्क्रीन के माध्यम से विवाह परामर्श समिति द्वारा विवाह
              योग्य युवक, युवतियो का परिचय सम्मेलन का आयोजन भी किया जाता हैं, इस
              बार और अच्छा करने का हमारा प्रयास रहेंगा! विवाह विच्छेद जैसी
              कुरुतियो पर अंकुश लगाने की दिशा में भी हम प्रयास करेंगे ! मुझे आशा
              ही नहीं अपितु पूर्ण विश्वास हैं की आप सभी के सतत सहयोग एम्
              मार्गदर्शन में समाज अपनी प्रगति शील छवि के अनुरूप शिखर पर
              पहुंचेंगा । पुनः आपको, मुझमे और मेरी कार्यकारिणी में विश्वास जताने
              के लिए हार्दिक आभार, अभिनन्दन | आपका अपना भवदीय
              <br />
              अनिल भार्गव
              <br />
              1855, सेक्टर-04,
              <br />
              रेवाड़ी <br />
              <br />
            </div>
          </div>
        </div>
      </div>

      {/* Message of Pradhan Sachiv */}
      <div className={styles.row2}>
        <div className={styles.rightContent2}>
          <div className={styles.heading}>प्रधान सचिव</div>
          <div className={styles.contentPres2}>
            <div>
              सत्र 2025-2027 के लिये जनादेश ने जो उत्तरदायित्व हमारी कार्यकारिणी
              को दिया है, उसे हमने आत्मसात कर कार्य प्रारम्भ कर दिया है।
              कार्यकारिणी की प्रथम बैठक मे सहयोग व समर्पण का जो आभास हुआ, उससे
              मुझे प्रेरणा दी है व नया जोश भरा है। इसीलिये मैं अपके सम्मुख एक
              महत्वपूर्ण विषय पर अपने विचार रखने का प्रयास कर रहा हूँ। मेरा
              मानना है कि सीधे संवाद हमेशा सीधा ही प्रभाव डालते हैं लेकिन
              इलेक्ट्रोनिक युग में वेब-साइट बहुउद्देशीय प्रभाव डालती है, यह
              हमारा संवाद भी हैं और हमारा सम्पूर्ण चित्रण भी है। हम भार्गव सभा
              की वेबसाइट को अधिक प्रभवी व समाज को द्रुतगति से आवश्यक जानकारी
              उपलब्ध कराने का और समाज के साथ जुडने के लिए एक सुव्यवस्थित व
              नियोजित मंच प्रदान करने का प्रयास करेंगे।मेरा परोक्ष रूप से व
              वेबसाइट के माध्यम से भार्गव समाज के वैश्विक समुदाय के भविष्य और
              समाज के प्रत्ये व्यक्ति की भूमिका सुनिश्चित करना चाहते हैं। हम एक
              ऐसे दौर में जी रहे हैं जहाँ परिवर्तन तेजी से हो रहा है। तकनीकी
              प्रगति, आर्थिक विकास, और सामाजिक बदलाव हमारे जीवन को हर पल
              प्रभावित कर रहे हैं। इन परिवर्तनों के बीच, यह आवश्यक है कि हमारे
              पूर्वजों से विरासत में मिले अपने मूल्यों को न भूलें और एक मजबूत,
              एकजुट और प्रगतिशील समाज के निर्माण के लिए मिलकर काम करें। हमारी
              सबसे बड़ी ताकत हमारी एकता ही हो सकती है। जब हम कंधे से कंधा मिलाकर
              चलते हैं, तो कोई भी चुनौती बहुत बड़ी नहीं लगती। हमें एक दूसरे का
              सम्मान करना चाहिए, मतभेदों को भूलाकर संवाद के माध्यम से समाधान
              खोजने का प्रयास करना चाहिए। शिक्षा हमारे समाज की नींव है। हमें
              अपने बच्चों को गुणवत्तापूर्ण शिक्षा प्रदान करने के लिए हर संभव
              प्रयास करना है, ताकि वे ज्ञान और कौशल से युक्त होकर कल के
              नेतृत्वकर्ता बन सकें। शिक्षा ही वह शक्ति है जो गरीबी, असमानता और
              अन्याय को दूर कर सकती है। विकास का मापदण्ड केवल आर्थिक नहीं होता,
              इसमें सामाजिक परिवर्तन और समाज के उन्नयन में सक्रीय भागीदारी का
              पहलू भी शामिल हैं। हमें अपने भार्गव समाज के लिये एक ऐसा विकास मॉडल
              अपनाना होगा जो टिकाऊ हो और हमारी आने वाली पीढ़ियो के लिए आदर्श भी
              हो। हमारी संस्कृति और हमारी परंपराएं हमारी पहचान हैं, हमारा इतिहास
              हमारी विरासत का जीवंत प्रमाण हे। हमें इनका सम्मान करना चाहिए और
              इन्हें अगली पीढ़ी तक पहुँचाना चाहिए। मैं जानता हूँ कि हमारे सामने
              कई चुनौतियाँ हैं। समाज में कुछ लोगों में आर्थिक पक्ष कमजोर होने से
              परेशानी, प्राप्त शिक्षानुसार रोजगार की उपलब्धता और सामाजिक
              बुराइयाँ अभी भी मौजूद हैं। लेकिन मुझे यह भी विश्वास है कि हमारी
              सामूहिक शक्ति और दृढ़ संकल्प से हम इन चुनौतियों का सामना कर सकते
              हैं। मैं समझता हूँ शत प्रतिशत भार्गव समाज आधुनिक इलेक्ट्रोनिक
              विधाओं से भलीभँति परिचित हैं। अतः परोक्ष रूप से चाहे हम अपन समाज
              से नही जुड पाते हों, यह प्रमाणित सत्य है क्योंकि वार्षिक सम्मेलन
              में 1-3 हजार की उपस्थित समस्त विश्व में अपना परचम फहरा रहे भार्गव
              समाज का प्रतिनिधित्व नही कर सकता। मैं आप सभी से आग्रह करता हूँ कि
              आप भार्गव सभा की वेब-साइट से जुड़ें व सक्रिय सदस्य बनें। अपने
              अधिकारों और कर्तव्यों को समझें और समाज के विकास में अपना योगदान भी
              दें । अपनी आवाज उठाएं, अन्याय के खिलाफ खड़े हों और सकारात्मक बदलाव
              लाने के लिए हमें सुझाव दें व स्वयं भी प्रयास करें। आइए, हम सब
              मिलकर एक ऐसे समाज का निर्माण करें जो न्यायपूर्ण, समावेशी और समृद्ध
              हो। एक ऐसा समाज जहाँ हर सदस्य को समाज के विकास में अपने मौलिक
              विचारों को अभिव्यक्त करने का अवसर मिलें और समाज का प्रत्येक बन्धु
              अपने को समाज का अभिन्न अंग मान सके। आपके सहयोग और समर्थन के लिए
              मैं आभारी हूँ।
              <br />
              जय परशुराम
              <br />
              भवदीय,
            </div>
          </div>
        </div>
        <div>
          <img src={sanjay} alt="" className={styles.presImg2} />
        </div>
      </div>

      {/* Office Bearers */}
      <div className={styles.office}>
        <div className={styles.headingOffice}>पदाधिकारी</div>
        <div className={styles.offrow1}>
          <div>
            <img src={anil} alt="" className={styles.anil} />
            <div className={styles.anilName}> श्री अनिल भार्गव</div>
            <div className={styles.anilOcc}>अध्यक्ष</div>
          </div>
          <div>
            <img src={sanjay2} alt="" className={styles.sanjay2} />
            <div className={styles.sanjayName}> श्री संजय भार्गव</div>
            <div className={styles.sanjayOcc}>प्रधान सचिव</div>
          </div>
          <div>
            <img src={vijay} alt="" className={styles.vijay} />
            <div className={styles.vijayName}> श्री विजय भार्गव</div>
            <div className={styles.vijayOcc}>कोषाध्यक्ष</div>
          </div>
          <div>
            <img src={mohit} alt="" className={styles.mohit} />
            <div className={styles.mohitName}> श्री मोहित भार्गव</div>
            <div className={styles.mohitOcc}>उपाध्यक्ष</div>
          </div>
          <div>
            <img src={ajay} alt="" className={styles.ajay} />
            <div className={styles.ajayName}> श्री अजय भार्गव</div>
            <div className={styles.ajayOcc}>उपाध्यक्ष</div>
          </div>
        </div>
        <div className={styles.offrow2}>
          <div>
            <img src={vivek} alt="" className={styles.vivek} />
            <div className={styles.vivekName}> डा.श्री विवेक भार्गव</div>
            <div className={styles.vivekOcc}>उपाध्यक्ष</div>
          </div>
          <div>
            <img src={ramesh} alt="" className={styles.ramesh} />
            <div className={styles.rameshName}> श्री रमेश भार्गव</div>
            <div className={styles.rameshOcc}>उपाध्यक्ष</div>
          </div>
          <div>
            <img src={girish} alt="" className={styles.girish} />
            <div className={styles.girishName}> श्री गिरीश भार्गव</div>
            <div className={styles.girishOcc}>उपाध्यक्ष</div>
          </div>

          <div>
            <img src={harish} alt="" className={styles.harish} />
            <div className={styles.harishName}> श्री हरीश भार्गव</div>
            <div className={styles.harishOcc}>क्षेत्रीय उपाध्यक्ष</div>
          </div>
          <div>
            <img src={salil} alt="" className={styles.salil} />
            <div className={styles.salilName}> श्री सलिल भार्गव</div>
            <div className={styles.salilOcc}>क्षेत्रीय उपाध्यक्ष</div>
          </div>
        </div>

        <div className={styles.offrow3}>
          <div>
            <img src={sanjay3} alt="" className={styles.sanjay3} />
            <div className={styles.mohitName}> श्री संजय भार्गव</div>
            <div className={styles.narayanOcc}>क्षेत्रीय उपाध्यक्ष</div>
          </div>
          <div>
            <img src={sohan} alt="" className={styles.narayan} />
            <div className={styles.mohitName}> श्री नारायण भार्गव</div>
            <div className={styles.narayanOcc}>क्षेत्रीय उपाध्यक्ष</div>
          </div>
          <div>
            <img src={narayan} alt="" className={styles.sohan} />
            <div className={styles.mohitName}> श्री सोहन भार्गव</div>
            <div className={styles.narayanOcc}>क्षेत्रीय उपाध्यक्ष</div>
          </div>
          <div>
            <img src={pankaj} alt="" className={styles.girish} />
            <div className={styles.girishName}> श्री पंकज भार्गव</div>
            <div className={styles.pankajOcc}>सचिव</div>
          </div>
          <div>
            <img src={sanjeev} alt="" className={styles.girish} />
            <div className={styles.girishName}> श्री संजीव भार्गव</div>
            <div className={styles.sanjeevOcc}>सचिव</div>
          </div>
        </div>

        <div className={styles.offrow4}>
          <div>
            <img src={anil2} alt="" className={styles.girish} />
            <div className={styles.girishName}> श्री अनिल भार्गव</div>
            <div className={styles.sanjeevOcc}>सचिव</div>
          </div>
          <div>
            <img src={saurabh} alt="" className={styles.girish} />
            <div className={styles.girishName}> श्री सौरभ भार्गव</div>
            <div className={styles.sanjeevOcc}>सचिव</div>
          </div>

          <div>
            <img src={deepesh} alt="" className={styles.girish} />
            <div className={styles.girishName}> श्री दीपेश भार्गव</div>
            <div className={styles.sanjeevOcc}>सचिव</div>
          </div>
        </div>
      </div>

      {/* Event Gallery Section */}

      {/* Ashrams Section */}
      <div className={styles.ashramSection}>
        <div className={styles.headingAshram}>भार्गव आश्रम</div>
        <div>
          <img src={bannerHaridwar} alt="" className={styles.bg} />
          <div>
            <img src={Haridwar} alt="" className={styles.imgHari} />
            <div className={styles.nameHari}>हरिद्वार</div>
            <div className={styles.details} onClick={handleHaridwar}>
              View Full Details
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gallery}>
        <div className={styles.galleryHeading}>Event Gallery</div>
        <ImageSlider images={[img1, img2, img3]} interval={4000} />
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
