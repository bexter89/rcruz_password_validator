import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validLength, setValidLength] = useState(false);
  const [hasLowercaseChar, setHasLowercaseChar] = useState(false);
  const [notMatchEmail, setNotMatchEmail] = useState(true);
  const [hasCapChar, setHasCapChar] = useState(false);
  const [has1Num, setHas1Num] = useState(false);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/09e642b5-b52f-43c1-837b-8ebf70c10813")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((responseData) => setUserData(responseData))
      .catch((err) => console.error("Error fetching data! ", err));
  }, []);

  function handleChange(e) {
    setPassword(e.target.value);
  };

  function handleTogglePass() {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (userData) {
      validatePass(password);
    }
  }, [password]);

  function validatePass (pass) {
    let charRequirements = {
      upperCase: 0,
      lowerCase: 0,
      num: 0,
    };

    for (let i = 0; i < pass.length; i++) {
      //If the ASCII value is between [65, 90], then it is an uppercase letter.
      if (pass.codePointAt(i) <= 90 && pass.codePointAt(i) >= 65) {
        charRequirements.upperCase += 1;
      }
      //If the ASCII value is between [97, 122], then it is a lowercase letter.
      if (pass.codePointAt(i) <= 122 && pass.codePointAt(i) >= 97) {
        charRequirements.lowerCase += 1;
      }
      //If the ASCII value is between [48, 57], then it is a number.
      if (pass.codePointAt(i) <= 57 && pass.codePointAt(i) >= 48) {
        charRequirements.num += 1;
      }
    }

    pass.length <= 71 && pass.length >= 8 ? setValidLength(true) : setValidLength(false);
    pass.includes(userData.user.email) ? setNotMatchEmail(false) : setNotMatchEmail(true);
    charRequirements.upperCase > 0 ? setHasCapChar(true) : setHasCapChar(false);
    charRequirements.lowerCase > 0 ? setHasLowercaseChar(true) : setHasLowercaseChar(false)
    charRequirements.num > 0 ? setHas1Num(true) : setHas1Num(false);

  };

  return (
    <>
      <main>
        <form className="passwordForm">
          <div className="container">
            <div className="item">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="item" id="checkbox">
              <input
                type="checkbox"
                id="toggle-password"
                name="toggle password"
                value="Show"
                onClick={handleTogglePass}
              />
              <label htmlFor="toggle-password">Show</label>
              <br />
            </div>
          </div>
        </form>
        <div className="container">
          <div className="item">
            <ul>
              <li className={validLength ? "isValid" : "isNotValid"}>
                8-72 Characters
              </li>
              <li className={hasLowercaseChar ? "isValid" : "isNotValid"}>
                1 Lowercase Character
              </li>
              <li className={notMatchEmail ? "isValid" : "isNotValid"}>
                Should Not Match Your Email Address
              </li>
            </ul>
          </div>
          <div className="item">
            <ul>
              <li className={hasCapChar ? "isValid" : "isNotValid"}>
                1 Uppercase Character
              </li>
              <li className={has1Num ? "isValid" : "isNotValid"}>1 Number</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
