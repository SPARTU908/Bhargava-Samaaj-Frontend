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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Haridwar = () => {
  const position = [29.9506, 78.1634];
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
          <div className={styles.mobile}>
            <div>
              <IoLocationSharp className={styles.icon1} />
            </div>
            <div className={styles.address}>
              Bhargav Ashram, Opp. Ramleela Ground, Birla Road, Haridwar,
              Uttarkhand - 249401
            </div>
          </div>

          <div className={styles.mobile}>
            <div>
              <MdEmail className={styles.icon2} />
            </div>
            <div className={styles.email}>info@yatradham.org</div>
          </div>

          <div className={styles.mobile}>
            <div>
              {" "}
              <MdOutlineWifiCalling className={styles.iconCall} />
            </div>
            <div className={styles.call}>8069266004</div>
          </div>
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
            <div className={styles.rupee2}>Rs.1200.00</div>
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

        {/* Map */}
        <div className={styles.location}>
          <p>Click the button below to know the exact location:</p>
          <a
            href="https://www.google.com/maps/place/Bhargava+Ashram,+Haridwar/@29.950568,78.163441,1325m/data=!3m1!1e3!4m6!3m5!1s0x39094703c19347d3:0x7a2eef53be8f3200!8m2!3d29.9505681!4d78.1634405!16s%2Fg%2F11ckdz3c01?hl=en&entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.locationBtn}
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </>
  );
};

export default Haridwar;


