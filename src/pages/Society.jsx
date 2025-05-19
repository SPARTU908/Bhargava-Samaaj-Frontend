import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "./Society.module.css";
import img1 from "../assets/bharagu.jpg";
import img2 from "../assets/charan.jpg";
import img3 from "../assets/chav.jpg";
import img4 from "../assets/hemu.jpg";
import img5 from "../assets/vanshavali-1.png";
import img6 from "../assets/vanshavali-2.png";

const Society = () => {
    useEffect(() => {
    // Get the hash from the URL and scroll to the element with that id
    const hash = window.location.hash;

    if (hash) {
      const section = document.getElementById(hash.slice(1)); // Remove the '#' from the hash
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [window.location.hash]);
  return (
    <>
      <Navbar />
      {/* Hamare Purvaz */}
      <div  id="ancestors" className={styles.container}>
        <div className={styles.heading}>हमारे पूर्वज</div>
        <div className={styles.content}>
          भार्गव इतिहास में भार्गव वंश के आदि प्रवर्तक महर्षि भृगु के काल से
          लेकर सन् 1773 के अन्त तक का संक्षिप्त विवरण प्रस्तुत है। ऋग्वेद तथा
          परवर्ती वैदिक साहित्य से स्पष्ट ज्ञात होता है कि आर्यों में जाति पांति
          का बन्धन नहीं था। वे सब अपने को एक ही जाति का मानते थे। परन्तु जिस
          प्रकार इंग्लैंड आदि पश्चिमी देशों में जन समुदाय तीन वर्गों में विभक्त
          माना जाता है उसी प्रकार वैदिक काल में भी आयो में तीन वर्ग थे। यज्ञ हवन
          करने कराने वाले ब्राह्मण कहलाते थे, जिन में मंत्रों के रचयिता ऋषि पद
          प्राप्त करते थे। राजा और उसके भाई बेटे क्षत्रिय कहलाते थे। शेष सब आर्य
          विश् कहलाते थे जिसका अर्थ साधारण जन है। क्या ग्राम का मुखिया और क्या
          किसान, क्या सैनिक और क्या ग्वाला, क्या बढ़ई और क्या जुलाहा सब इसी विश्
          वर्ग में माने जाते थे। ब्राह्मणों के आज जितने गोत्र पाये जाते हैं वे
          सब वैदिक काल के सात मूल वंशों की ही शाखा-प्रशाखा हैं। ये सात वंश
          भार्गव, आंगिरस, आत्रेय, काश्यप, वसिष्ठ, आगस्त्य और कौशिक हैं। इनमें
          सबसे प्राचीन भार्गव, आत्रेय और काश्यप हैं जिनके प्रवर्तक भृगु, अत्रि
          और काश्यप नामक ऋषि थे, जो वैदिक युग के आरम्भ में हुए थे, और वैवस्वत
          मनु के समकालीन थे। महिर्ष भृगु अग्नि क्रिया के प्रवर्तक होने के कारण
          अथर्वन् और अंगिरस् भी कहलाते थे। इसीलिए इनके वंशज प्रारंभ में भार्गव
          और आंगिरस दोनों नामों से प्रसिद्ध थे।
        </div>
        <div className={styles.btnBox}>
          <button className={styles.btn}>
             <a 
              href="/pdfs/Samaaj/Purvaz.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
              और पढ़ें
            </a>
          </button>
        </div>
      </div>

      {/* Hamare Mahapurush */}
      <div  id="greatMen" className={styles.container1}>
        <div className={styles.heading}>हमारे-महापुरुष</div>
        <div className={styles.people}>
          <div>
            <img src={img1} alt="" className={styles.img} />
            <div className={styles.name}>हमारे आदि पुरुष महिर्ष भृगु</div>
          </div>
          <div>
            <img src={img2} alt="" className={styles.img} />
            <div className={styles.name}>हमारे पूज्य बाबा चरणदास जी महाराज</div>
          </div>
          <div>
            <img src={img4} alt="" className={styles.img} />
            <div className={styles.name}>
              अन्तिम हिन्दू सम्राट हेमचन्द्र विक्रमादित्य
            </div>
          </div>
          <div>
            <img src={img3} alt="" className={styles.img} />
            <div className={styles.name}>ऋषिवर च्यवन और सुकन्या</div>
          </div>
        </div>
        <div className={styles.btnBox1}>
          <button className={styles.btn2}>
            <a
              href="/pdfs/Samaaj/Mahapurush.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
              और पढ़ें
            </a>
          </button>
        </div>
      </div>

      {/* Vanshavali */}
      <div id="genealogy" className={styles.container2}>
        <div className={styles.heading}>वंशावली</div>
        <div className={styles.vanshavali}>
          <div>
            <img src={img5} alt="" className={styles.vanshavali1} />
          </div>
          <div>
            <img src={img6} alt="" className={styles.vanshavali2} />
            <div className={styles.para}>
              महर्षि च्यवन मन्दिर, कोसी धाम पर आगे वाले हिस्से की दो गुमटी नई
              बनने तथा रंग रोगन के पश्चात का एक दृश्य
            </div>
          </div>
        </div>
        <div className={styles.btnBox2}>
          <button className={styles.btn2}>
             <a
              href="/pdfs/Samaaj/vanshawali.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
              और पढ़ें
            </a>
          </button>
        </div>
      </div>

      {/* hmare tirth esthal */}
      <div id="holyPlace" className={styles.container3}>
        <div className={styles.heading}>हमारे-र्तीथ-स्थल</div>
      </div>

      {/*  hmare sanskar*/}
      <div id="values" className={styles.container4}>
        <div className={styles.heading}>हमारे-संस्कार</div>
        <div className={styles.sanskar}>
          संस्कार संसार के विभिन्न भागों में मानव समुदायों ने, व्यक्ति के -
          विकास और समाज से उसका सामंजस्य स्थापित करने के लिए अलग-अलग प्रकार की
          व्यवस्थाएँ विकसित की हैं। भारतीय मनीषियों तथा विचारकों ने इस प्रयोजन
          को 'संस्कार' का नाम दिया है। संस्कार का मोटा ( स्थूल ) अर्थ है किसी
          वस्तु को शुद्धया परिमार्जित करना । जैसे भूमि से निकलने वाला हीरा अपने
          मूल रूप में मिट्टी लगा साधारण काँच का टुकड़ा दिखाई देता है; परन्तु
          कारीगर उसे तराश कर उसमें अनेक कोने काटकर तेजस्वी चमकदार रूप प्रदान
          करता है। सोने को भी अपना तेजस्वी स्वरूप प्राप्त करने के लिए अनेक
          प्रक्रियाओं (परिमार्जन व उपचार) से गुजरना पड़ता है। तात्पर्य यह है कि
          बिना परिमार्जन या शोधन की क्रिया के उनका गुण नहीं प्रकट होता है।
          परिमार्जन की यही क्रिया 'संस्कार' है। अतः संस्कार का व्यापक अर्थ है-
          सुधारना, शुद्ध करना, माँजना, चमकाना, उत्तम गुण धारण करना, पाप दूर करना
          तथा ऐसे कार्य जो जीवन को सुन्दर, कलापूर्ण, शुभ कर्मों में प्रवृत्त बना
          दें; उन्हें 'संस्कार' कहते हैं । मानव-शिशु वंशानुगत और पूर्वजन्म के
          गुण लेकर जन्म लेता है। उन गुणों को जाग्रत कर उसे अपने विकास और समाज के
          लिए उपयोगी बनाने के लिए ही हमारे मनीषी ऋषियों ने 'संस्कार' रूप में कुछ
          क्रियायें (विधान व उपचार) निर्धारित की हैं।
        </div>
        <div className={styles.btnBox2}>
          <button className={styles.btn2}>
             <a
              href="/pdfs/Samaaj/Hamare-Sanskar.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
              और पढ़ें
            </a>
          </button>
        </div>
      </div>

      {/* hmare tyohar */}
      <div id="festivals" className={styles.container1}>
        <div className={styles.heading}>हमारे-त्यौहार</div>
        <div className={styles.tyohar}>
          हमारी जाति में बहुत से त्योहार और पर्व मनाये जाते हैं। कुछ त्योहार
          वैज्ञानिक होने के साथ-साथ रहस्यपूर्ण भी हैं। कुछ ऐसे भी हैं जिनके
          सम्बन्ध में जानकारी नहीं है, केवल परम्परागत रूप में उनका समाज में
          प्रचलन है । पूर्वज करते आये हैं, इसलिए हम भी करते जा रहे हैं। यदि हम
          विचार करें, समझें और ध्यानपूर्वक सोचें, तो इन त्योहारों के महत्त्व और
          गंभीरता का आभास होगा । नेह-नाते निभाने पर हमारे पूर्वजों ने बहुत ध्यान
          दिया और हमारे त्योहार इसी प्रेरणा से ओतप्रोत हैं। सम्बन्धों को प्रगाढ़
          करने और परस्पर स्नेह-बंधनों को सुदृढ़ करने में ये भरे-पूरे हैं। प्रायः
          त्योहार और व्रत निम्न कारणों अथवा उद्देश्यों से मनाये जाते हैं: नवीन
          अन्न आने पर ( अग्नि में हवन करके ) | १. २. देवताओं की पूजा में ( भोग
          लगाकर ) । ३. पूर्व पुरुषों की यादगार में । ४. पति की दीर्घायु के
          निमित्त । ५. बहन-भाई के प्रेम भाव में। ६. मनोरंजन के लिए । ७. ८. पुत्र
          की शुभ कामना के लिए। बुजुर्गों के सम्मान के लिए ।
        </div>
        <div className={styles.btnBox2}>
          <button className={styles.btn2}>
             <a
              href="/pdfs/Samaaj/Hamare-Tyohar.pdf"
              className={styles.btn1}
              target="_blank"
              rel="noopener noreferrer"
            >
              और पढ़ें
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Society;
