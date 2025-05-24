import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";
// import Header from '../../components/Header/Header';
// import Navbar from '../../components/Navbar/Navbar';
// import back from '../../assets/logo/arrow.png';
// import arrow from '../../assets/logo/ArrowRight.png';
// import addDebit from '../../assets/logo/addDebit.png';
// import mastercard from '../../assets/logo/mastercard.png';
// import wallet from '../../assets/logo/wallet.png';
// import paypal from '../../assets/logo/paypal.png';
// import stripe from '../../assets/logo/stripe.png';
// import payment from '../../assets/logo/payment.png';
// import home from '../../assets/logo/home.png';
// import placed from '../../assets/logo/placed.png';
// import { deleteCart } from '../../apis/cart';


function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cart, finalPrice } = state || {};
  const [order, setOrder] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(cart);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleHome = async () => {
    await deleteCart();
    navigate("/homepage");
    setOrder(false);
  };

  const handleOrder = async () => {
    setOrder(true);
    await deleteCart();
  };

  return (
    <>
      <div className={styles.container}>
      
        {!order && (
          <div className={styles.sectionFirst}>
            <div className={styles.headingBox}>
              <img
                src=""
                alt=""
                style={{ cursor: "pointer" }}
                onClick={handleGoBack}
              />
              <div className={styles.heading}>Choose and Pay</div>
            </div>
            <div className={styles.paymentSection}>
              <div className={styles.paymentLeft}>
                <div className={styles.wallet} onClick={() => handleSelect("")}>
                  <div className={styles.dFlex}>
                    <img src="" alt="" />
                    <div>
                      <div>Wallet</div>
                      <div className={styles.available}>
                        Available balance: ₹300
                      </div>
                    </div>
                  </div>
                  <img src="" alt="" />
                </div>
                <div className={styles.line}></div>
                <div
                  className={styles.others}
                  style={{
                    border:
                      selectedOption === "mastercard"
                        ? "1px solid #FC8A06"
                        : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelect("mastercard")}
                >
                  <div className={styles.dFlex}>
                    <img src="" alt="" />
                    <div>MasterCard</div>
                  </div>

                  <input
                    type="radio"
                    checked={selectedOption === "mastercard"}
                    readOnly
                  />
                </div>
                <div
                  className={styles.others}
                  style={{
                    border:
                      selectedOption === "paypal"
                        ? "1px solid #FC8A06"
                        : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelect("paypal")}
                >
                  <div className={styles.dFlex}>
                    <img src="" alt="" />
                    <div>Paypal</div>
                  </div>

                  <input
                    type="radio"
                    checked={selectedOption === "paypal"}
                    readOnly
                  />
                </div>
                <div
                  className={styles.others}
                  style={{
                    border:
                      selectedOption === "stripe"
                        ? "1px solid #FC8A06"
                        : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelect("stripe")}
                >
                  <div className={styles.dFlex}>
                    <img src="" alt="" />
                    <div>Stripe</div>
                  </div>

                  <input
                    type="radio"
                    checked={selectedOption === "stripe"}
                    readOnly
                  />
                </div>
                <div className={styles.others}>
                  <div className={styles.dFlex}>
                    <img src="" alt="" />
                    <div>Add Debit Card</div>
                  </div>
                </div>
              </div>
              <div className={styles.amountSection}>
                <div className={styles.amountBox}>
                  <div className={styles.amountText}>Amount to be payed</div>
                  <div className={styles.amount}>&#8377;{finalPrice}</div>
                </div>
                <div className={styles.line}></div>
                <img
                  src=""
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={handleOrder}
                />
              </div>
            </div>
          </div>
        )}
        {order && (
          <div className={styles.sectionSecond}>
            <img src="" alt="" />
            <div className={styles.homeSection}>
              <div className={styles.names}>
                {cart?.map((item, index) => {
                  return <div key={index}>{item.foodId.title}</div>;
                })}
              </div>
              <img
                src=""
                alt=""
                style={{ cursor: "pointer" }}
                onClick={handleHome}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.containerMob}>
        {/* <Header />
                <Navbar /> */}
        {!order && (
          <div className={styles.sectionFirst}>
            <div className={styles.headingBox}>
              <img
                src=""
                alt=""
                style={{ cursor: "pointer" }}
                onClick={handleGoBack}
              />
              <div className={styles.heading}>Choose and Pay</div>
            </div>
            <div className={styles.paymentSection}>
              <div className={styles.paymentLeft}>
                <div className={styles.wallet} onClick={() => handleSelect("")}>
                  <div className={styles.dFlex}>
                    <img src="" alt="" />
                    <div>
                      <div>Wallet</div>
                      <div className={styles.available}>
                        Available balance: ₹300
                      </div>
                    </div>
                  </div>
                  <img src="" alt="" />
                </div>
                <div className={styles.line}></div>
                <div
                  className={styles.others}
                  style={{
                    border:
                      selectedOption === "mastercard"
                        ? "1px solid #FC8A06"
                        : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelect("mastercard")}
                >
                  <div className={styles.dFlex}>
                    <img src="" alt="" />
                    <div>MasterCard</div>
                  </div>

                  <input
                    type="radio"
                    checked={selectedOption === "mastercard"}
                    readOnly
                  />
                </div>
                <div
                  className={styles.others}
                  style={{
                    border:
                      selectedOption === "paypal"
                        ? "1px solid #FC8A06"
                        : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelect("paypal")}
                >
                  <div className={styles.dFlex}>
                    <img src="" alt="" />
                    <div>Paypal</div>
                  </div>

                  <input
                    type="radio"
                    checked={selectedOption === "paypal"}
                    readOnly
                  />
                </div>
                <div
                  className={styles.others}
                  style={{
                    border:
                      selectedOption === "stripe"
                        ? "1px solid #FC8A06"
                        : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSelect("stripe")}
                >
                  <div className={styles.dFlex}>
                    <img src="" alt="" />
                    <div>Stripe</div>
                  </div>

                  <input
                    type="radio"
                    checked={selectedOption === "stripe"}
                    readOnly
                  />
                </div>
                <div className={styles.others}>
                  <div className={styles.dFlex}>
                    <img src="" alt="" />
                    <div>Add Debit Card</div>
                  </div>
                </div>
              </div>
              <div className={styles.amountSection}>
                <div className={styles.amountBox}>
                  <div className={styles.amountText}>Amount to be payed</div>
                  <div className={styles.amount}>&#8377;{finalPrice}</div>
                </div>
                <div className={styles.line}></div>
                <img
                  src=""
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={handleOrder}
                />
              </div>
            </div>
          </div>
        )}
        {order && (
          <div className={styles.sectionSecond}>
            <img src="" alt="" />
            <div className={styles.homeSection}>
              <div className={styles.names}>
                {cart?.map((item, index) => {
                  return <div key={index}>{item.foodId.title}</div>;
                })}
              </div>
              <img
                src=""
                alt=""
                style={{ cursor: "pointer" }}
                onClick={handleHome}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Payment;
