import React from "react";
import { Badge, Image } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import ls from "../css/MobileAccountListItem.module.css";
import { default as NumAbv } from "../misc/NumberAbbreviator";
const MobileAccountListItem = ({
  fullname,
  avatarUrl,
  compensation,
  headline = "",
  skills = [],
}) => {
  const periodicityMap = {
    yearly: "YR",
    monthly: "MTH",
    hourly: "HR",
  };
  return (
    <a href="/#" class="list-group-item list-group-item-action p-1">
      <div className="d-flex justify-content-start">
        {avatarUrl ? (
          <Image
            className={`${ls.info_img} align-self-center`}
            title={fullname}
            src={avatarUrl}
            height={65}
            width={55}
            alt={fullname + "'s avatar"}
          />
        ) : (
          <div className={`${ls.info_icon}`}>
            <AiOutlineUser className="align-self-center" size={40} />
          </div>
        )}
        <div className={`${ls.info_txt}`}>
          <div className="d-flex w-100 justify-content-between">
            <p className={`${ls.name_clip} mb-0`} title={fullname}>
              <strong>{fullname}</strong>
            </p>
            {compensation && (
              <small>
                <Badge bg="success">
                  {compensation?.currency.slice(-1)}
                  {NumAbv(compensation?.amount)} /{" "}
                  {periodicityMap[compensation?.periodicity]}
                </Badge>
              </small>
            )}
          </div>
          <p className={`mb-0 ${ls.headline_clip}`} title={headline}>
            {headline}
          </p>
          <small className="text-muted">
            {skills && skills[0] && (
              <Badge pill bg="secondary">
                {skills[0]}
              </Badge>
            )}{" "}
            {skills && skills[1] && (
              <Badge pill bg="secondary">
                {skills[1]}
              </Badge>
            )}
          </small>
        </div>
      </div>
    </a>
  );
};

export default MobileAccountListItem;
