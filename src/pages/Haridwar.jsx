import Navbar from "../components/Navbar/Navbar";
import styles from "./Haridwar.module.css";
import img1 from "../assets/haridwar1.jpg";
import img2 from "../assets/haridwar2.jpg";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaWater } from "react-icons/fa6";
import { BsSignNoParkingFill } from "react-icons/bs";
import { TbDeviceCctvFilled } from "react-icons/tb";
import { FaGlassWater } from "react-icons/fa6";
import { FaToiletsPortable } from "react-icons/fa6";
import { FaMattressPillow } from "react-icons/fa6";
import { LuMapPinCheckInside } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineWifiCalling } from "react-icons/md";

const Haridwar = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>Bhargava Ashram - Haridwar</div>
        <div className={styles.image}>
          <div>
            <img src={img1} alt="" className={styles.img1} />
          </div>
          <div>
            <img src={img2} alt="" className={styles.img2} />
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <IoLocationSharp className={styles.icon1} />
          </div>
          <div className={styles.address}>
            Bhargav Ashram, Opp. Ramleela Ground, Birla Road, Haridwar,
            Uttarkhand - 249401
          </div>
          <div>
            <MdEmail className={styles.icon2} />
          </div>
          <div className={styles.email}>info@yatradham.org</div>
          {/* <div>
            <MdOutlineWifiCalling className={styles.iconCall}/>
            <div className={styles.call}>Toll Free Number - 08069266023.</div>
          </div> */}
        </div>

        <div className={styles.facilities}>
          <div>
            <div className={styles.facility}>Facilities</div>
            <div className={styles.row1}>
              <div>
                <IoFastFoodSharp className={styles.icon3} />
              </div>
              <div className={styles.food}>
                Food Facility &nbsp; :&nbsp; Yes
              </div>
              <div>
                <FaWater className={styles.icon4} />
              </div>
              <div className={styles.water}>Hot Water</div>
            </div>
            <div className={styles.row2}>
              <div className={styles.icon5}>
                <BsSignNoParkingFill />
              </div>
              <div className={styles.parking}>Parking&nbsp; :&nbsp; No</div>
              <div className={styles.icon6}>
                <TbDeviceCctvFilled />
              </div>
              <div className={styles.cctv}>CCTV</div>
            </div>
            <div className={styles.row3}>
              <div className={styles.icon7}>
                <FaGlassWater />
              </div>
              <div className={styles.water2}>Drinking Water</div>
              <div className={styles.icon8}>
                <FaToiletsPortable />
              </div>
              <div className={styles.toilet}>Attached Toilet</div>
            </div>
            <div className={styles.row4}>
              <div className={styles.icon9}>
                <FaMattressPillow />
              </div>
              <div className={styles.mattress}>Extra Mattress Available</div>
            </div>
          </div>
          <div className={styles.col2}>
            <div className={styles.icon10}>
              <LuMapPinCheckInside />
            </div>
            <div className={styles.checkin}>Check-In: 10:00 AM</div>
            <div className={styles.icon11}>
              <IoBagCheckOutline />
            </div>
            <div className={styles.checkout}>Check-Out: 09:00 AM</div>
          </div>
        </div>

        <div className={styles.room}>
          <div className={styles.rooms}>Haridwar Ashrams Rooms</div>
          <div className={styles.booking}>
            <div>Name</div>
            <div>Inclusions</div>
            <div>Contribution</div>
          </div>
          <div className={styles.infoRoom}>
            <div className={styles.ac}>2 Bed Deluxe AC Room</div>
            <div className={styles.inclusions}>
              <div>Double Bed</div>
              <div>Including GST</div>
              <div>Attached Bathrooms</div>
            </div>
            <div className={styles.rupee}>Rs.1,000.00</div>
          </div>
          <div className={styles.deluxRoom}>
            <div className={styles.delux}>2 Bed Super Deluxe AC Room</div>
            <div className={styles.inclusions2}>
              <div>Double Bed</div>
              <div>Including GST</div>
              <div>Attached Bathrooms</div>
            </div>
            <div className={styles.rupee2}>Rs.1,000.00</div>
          </div>
        </div>

        {/* how to reach bhargava ashram */}
        <div className={styles.reach}>
          <div className={styles.headingReach}>
            {" "}
            How To Reach Bhargava Ashrams
          </div>
          <div className={styles.bus}>
            <FaArrowRight />
            Haridwar Bus Stand - 1.1 km
          </div>
          <div className={styles.railway}>
            <FaArrowRight />
            Haridwar Railway Station - 1.6 km
          </div>
          <div className={styles.airport}>
            <FaArrowRight />
            Jolly Grant Airport (Dehradun) - 38.9 km
          </div>
        </div>

        {/* Places to visit in Haridwar from Bhargav Ashram: */}
        <div className={styles.places}>
          <div className={styles.headingPlace}>
            Places to visit in Haridwar from Bhargav Ashram
          </div>
          <div className={styles.kund}>
            <FaArrowRight />
            Bhimgoda Kund - 2.1 km
          </div>
          <div className={styles.kund}>
            <FaArrowRight />
            Maa Mansa Devi Mandir - 2.6 km
          </div>
          <div className={styles.kund}>
            <FaArrowRight />
            Har Ki Pauri - 3.6 km
          </div>
          <div className={styles.kund}>
            <FaArrowRight />
            Bharat Mata Temple - 6.2 km
          </div>
          <div className={styles.kund}>
            <FaArrowRight />
            Shanti Kunj - 7.7 km
          </div>
        </div>

        {/* faq */}
        {/* <div className={styles.faq}>
          <div className={styles.faqs}>Frequently Asked Questions</div>
          <div className={styles.questions}>
            <div className={styles.ques}>1. How do I contact Bhargav Ashram in Haridwar?</div>
            <div className={styles.ans}>
              You can contact Bhargav Ashram by using toll-free number
              08069266023.
            </div>
            <div className={styles.ques}>2. How far Bhargav Ashram is from Har ki Pauri?</div>
            <div className={styles.ans}>
              The distance between Bhargav Ashram and Har ki Pauri is around 3.6
              km.
            </div>
            <div className={styles.ques}>3. What amenities can I expect at Bhargav Ashram?</div>
            <div className={styles.ans}>
              The accommodation provides amenities like hot water and drinking
              water.
            </div>
            <div className={styles.ques}>4. What types of rooms are available at Bhargav Ashram?</div>
            <div className={styles.ans}>
              At Bhargav Ashram 2 Bed Deluxe AC Rooms and 2 Bed Super Deluxe AC
              Rooms are available.
            </div>
            <div className={styles.ques}>
              5. What are the check-in and check-out times of Bhargav Ashram?
            </div>
            <div className={styles.ans}>
              The check-in and check-out times at Bhargav Ashram are 10:00 AM
              and 09:00 AM.
            </div>
            <div className={styles.ques}>
              6. What is the distance of Bhargav Ashram from Haridwar Railway
              Station?
            </div>
            <div className={styles.ans}>
              The distance between Bhargav Ashram and Haridwar Railway Station
              is around 1.1 km.
            </div>
            <div className={styles.ques}>7. Do Bhargav Ashram provides any food facility?</div>
            <div className={styles.ans}>No, Food facility is not available at Bhargav Ashram.</div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Haridwar;
