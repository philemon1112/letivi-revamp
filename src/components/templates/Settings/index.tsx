import React from "react";
import BaseTemplate from "../BaseTemplate";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import DeactivateAccount from "./DeactivateAccount";
import LinkedAccount from "./LinkedAccount";
import TwoFactorAuthentication from "./TwoFactorAuth";

function Settings() {
  return (
    <div>
      <BaseTemplate>
        <div className="xl:pt-[150px] md:pt-[90px] pb-10 py-24 lg:px-10 max-w-screen-xl px-4 mx-auto">
          <ChangeEmail />
          <hr />
          <ChangePassword />
          <hr />
          <TwoFactorAuthentication />
          <hr />
          <LinkedAccount />
          <hr />
          <DeactivateAccount />
        </div>
      </BaseTemplate>
    </div>
  );
}

export default Settings;
