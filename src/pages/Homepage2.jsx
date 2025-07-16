import React from "react";
import {
  Container,
  Row,
  Col,

  Nav,
  NavDropdown,
  Image,
  Card,
  Carousel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
// Image imports
import banner from "../assets/banner.jpg";
import announcement from "../assets/announce.png";
import activity from "../assets/newad.jpeg";
import president from "../assets/President.jpeg";
import secretary from "../assets/sanjay.jpg";
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

// Sample content data
const festivals = [
  "सोमवार, 14 जुलाई – चतुर्थी (बैल चौथ)",
  "मंगलवार, 15 जुलाई - नागपंचमी (भार्गव में )",
  "सोमवार, 21 जुलाई - एकादशी (कामदा)",
  "मंगलवार, 22 जुलाई - प्रदोष",
  "गुरुवार, 24 जुलाई - अमावस्या ( हरियाली )",
];

const officers = [
  { src: anil, name: "श्री अनिल भार्गव", role: "अध्यक्ष" },
  { src: sanjay2, name: "श्री संजय भार्गव", role: "प्रधान सचिव" },
  { src: vijay, name: "श्री विजय भार्गव", role: "कोषाध्यक्ष" },
  { src: mohit, name: "श्री मोहित भार्गव", role: "उपाध्यक्ष" },
  { src: ajay, name: "श्री अजय भार्गव", role: "उपाध्यक्ष" },
  { src: vivek, name: "डा.श्री विवेक भार्गव", role: "उपाध्यक्ष" },
  { src: ramesh, name: "श्री रमेश भार्गव", role: "उपाध्यक्ष" },
  { src: girish, name: "श्री गिरीश भार्गव", role: "उपाध्यक्ष" },
  { src: harish, name: "श्री हरीश भार्गव", role: "क्षेत्रीय उपाध्यक्ष" },
  { src: salil, name: "श्री सलिल भार्गव", role: "क्षेत्रीय उपाध्यक्ष" },
  { src: sanjay3, name: "श्री संजय भार्गव", role: "क्षेत्रीय उपाध्यक्ष" },
  { src: narayan, name: "श्री नारायण भार्गव", role: "क्षेत्रीय उपाध्यक्ष" },
  { src: sohan, name: "श्री सोहन भार्गव", role: "क्षेत्रीय उपाध्यक्ष" },
  { src: pankaj, name: "श्री पंकज भार्गव", role: "सचिव" },
  { src: sanjeev, name: "श्री संजीव भार्गव", role: "सचिव" },
  { src: anil2, name: "श्री अनिल भार्गव", role: "सचिव" },
  { src: saurabh, name: "श्री सौरभ भार्गव", role: "सचिव" },
  { src: deepesh, name: "श्री दीपेश भार्गव", role: "सचिव" },
];

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* BANNER */}
      <Image src={banner} alt="banner" fluid className="w-100" />

      {/* ANNOUNCEMENT */}
      <Container className="my-5">
        <Row>
          <Col md={2}>
            <Image src={announcement} fluid />
          </Col>
          <Col>
            <p>
               अखिल भारतीय भार्गव सभा (रजि.) के सत्रा 2025-2027 की कार्यकारिणी की
            द्वितीय बैठक रविवार, दिनांक 20.07.2025 को प्रातः 10.00 बजे से
            ‘NITTTR Auditorium, श्यामला हिल्स, भोपाल’ में आयोजित की जायेगी। साथ
            ही एक दिन पूर्व अर्थात् शनिवार 19.07.2025 को आवश्यकतानुसार समितियों
            की बैठकें होटल विज्ञा श्री/NITTTR Auditorium में रखी जा सकती हैं,
            जिसकी सूचना समितियों द्वारा सम्बन्ध्ति को भेजी जाएगी।
            </p>
          </Col>
        </Row>
      </Container>

      {/* FESTIVALS */}
     <Container id="festivals" className="my-5">
  <h3 className="text-center mb-4" style={{ color: "#ea8d0c" }}>
    अपकमिंग फेस्टिवल्स 2025
  </h3>
  <Row xs={1} sm={2} md={3} className="g-4">
    {festivals.map((fest, index) => (
      <Col key={index}>
        <Card
          className="h-100 text-center shadow"
          style={{
            backgroundColor: "#1e1e2f", // dark background
            color: "#ffffff",           // white text
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #444",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Card.Body>
            <p style={{ fontSize: "1.1rem", fontWeight: "500", marginBottom: 0 }}>
              {fest}
            </p>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>

      {/* ACTIVITIES */}
      <Container id="activities" className="my-5">
  <h3 className="text-center mb-4" style={{ color: "#ea8d0c" }}>
    अपकमिंग एक्टिविटीज 2025
  </h3>
  <Row className="justify-content-center mt-4">
    <Col md={8}>
      <div
        style={{
          backgroundColor: "#1e1e2f",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <Image
          src={activity}
          alt="activity"
          fluid
          rounded
          style={{
            border: "3px solid #ea8d0c",
            maxHeight: "400px",
            objectFit: "cover",
          }}
        />
      </div>
    </Col>
  </Row>
</Container>


      {/* PRESIDENT MESSAGE */}
      <Container id="president" className="my-5">
      <Row className="align-items-center">
        <Col md={4}>
          <Image src={president} fluid rounded style={{ maxHeight: "250px", objectFit: "cover" }} />
        </Col>
        <Col md={8}>
          <h4>अध्यक्ष का संदेश</h4>

          {/* SCROLLABLE MESSAGE */}
          <div
            style={{
               maxHeight: "250px", 
              overflowY: "auto",
              paddingRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              whiteSpace: "pre-line",
            }}
          >
            <p>
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
              आपका अपना भवदीय <br />
              अनिल भार्गव <br />
              1855, सेक्टर-04, <br />
              रेवाड़ी <br />
            </p>
          </div>
        </Col>
      </Row>
    </Container>

      {/* SECRETARY MESSAGE */}
      <Container id="secretary" className="my-5">
      <Row className="align-items-center">
        <Col md={8}>
          <h4>प्रधान सचिव का संदेश</h4>

          <div
            style={{
               maxHeight: "250px", 
              overflowY: "auto",
              paddingRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              whiteSpace: "pre-line",
            }}
          >
            <p>
              {/* Secretary's full message */}
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
            </p>
          </div>
        </Col>
        <Col md={4}>
          <Image src={secretary} fluid rounded style={{ maxHeight: "250px", objectFit: "cover" }}/>
        </Col>
      </Row>
    </Container>

      {/* OFFICERS SECTION */}
     <Container id="officers" className="my-5">
  <h3 className="text-center mb-4 text-primary fw-bold">पदाधिकारी</h3>
  <Row xs={2} sm={3} md={4} lg={6} className="g-4">
    {officers.map((officer, index) => (
      <Col key={index} className="text-center">
        <div
          className="border rounded shadow-sm p-3 h-100"
          style={{
            backgroundColor: "#fdf8f3",
            borderColor: "#ea8d0c",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Image
            src={officer.src}
            alt={officer.name}
            className="mb-2 officer-img-square rounded-circle border"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderColor: "#ea8d0c",
              borderWidth: "3px",
              borderStyle: "solid",
            }}
          />
          <h6 className="mb-1 fw-semibold">{officer.name}</h6>
          <p className="text-muted small">{officer.role}</p>
        </div>
      </Col>
    ))}
  </Row>
</Container>


      

      {/* FOOTER */}
    <Footer/>
    </>
  );
};

export default Homepage;
