import "./success.css";

function SuccessMessage() {
  return (
    <div className="success-container">
      <div className="success-title">User is already Signed Up!</div>
      <p className="success-para_1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
        fugiat nulla pariatur.
      </p>
      <p className="success-para_2"> For further information contact us</p>
      {/* <img className="success-mobileLogo" src="images/Thankyou/MobileIcon.svg" alt="" /> */}
      <p className="success-para_3"> (487) 1070 1087 </p>
      <p className="success-para_4"> sales.salonprauge@sp.com </p>
    </div>
  );
}

export default SuccessMessage;
