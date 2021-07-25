import React from "react";
import { Card, Container } from "react-bootstrap";
import MobileAccountListItem from "./MobileAccountListItem";

const MobileAccountList = ({ accounts, onItemClick, hidden = true }) => {
  return (
    <div className={`d-flex flex-column ${hidden ? "d-none" : ""}`}>
      {Object.keys(accounts).length > 0 ? (
        accounts.map(
          (
            { name, avatarUrl, compensation, headline, skills, username },
            i
          ) => (
            <MobileAccountListItem
              clickAction={onItemClick}
              key={"mali_" + i}
              fullname={name}
              avatarUrl={avatarUrl}
              headline={headline}
              compensation={compensation}
              username={username}
              skills={skills}
            />
          )
        )
      ) : (
        <Container fluid>
          <Card body>Loading...</Card>
        </Container>
      )}
    </div>
  );
};

export default MobileAccountList;
