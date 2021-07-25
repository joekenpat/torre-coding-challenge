import React from "react";
import MobileAccountListItem from "./MobileAccountListItem";

const MobileAccountList = ({ accounts }) => {
  return (
    <div className="d-flex flex-column">
      {Object.keys(accounts).length > 0
        ? accounts.map(
            ({ name, avatarUrl, compensation, headline, skills }) => (
              <MobileAccountListItem
                fullname={name}
                avatarUrl={avatarUrl}
                headline={headline}
                compensation={compensation}
                skills={skills}
              />
            )
          )
        : "Select A filter to start"}
    </div>
  );
};

export default MobileAccountList;
