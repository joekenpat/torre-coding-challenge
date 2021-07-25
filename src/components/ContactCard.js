import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { FaPen, FaUsers } from "react-icons/fa";
import { HiBell, HiLockClosed } from "react-icons/hi";
import avatar from "../images/avatar.png";
import ls from "../css/ContactCard.module.css";

const ContactCard = ({
  fullname,
  headline,
  avatarUrl,
  remoteWorking,
  stats,
  links,
  bio,
  hidden = false,
}) => {
  return (
    <div className={`mb-4 p-1 ${hidden ? "d-none" : ""}`}>
      <div className="d-flex justify-content-between mb-2">
        <Button
          className={`rounded-circle ${ls.sab}`}
          variant="outline-secondary"
        >
          <HiBell />
        </Button>
        <Button
          className={`rounded-circle ${ls.sab}`}
          variant="outline-secondary"
        >
          <FaPen />
        </Button>
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <Image
            src={avatar ? avatarUrl : avatar}
            className="mb-1"
            roundedCircle
            height={120}
            width={120}
          ></Image>
          <h5 className={`h5 text-center my-3 ${ls.contact_name}`}>
            {fullname}
          </h5>
          <small className={`text-muted ${ls.mini_stat_label}`}>
            {headline}
          </small>
        </div>
      </div>

      <div className="">
        <Card className={`${ls.thickBorder} mb-2`}>
          <Card.Body className="p-2 d-flex justify-content-around">
            <div className="d-flex justify-content-center">
              <div className={`${ls.mini_stat_icon}`}>
                <HiLockClosed size={28} />
              </div>
              <div className={`${ls.mini_stat}`}>
                <p class="h6">{stats?.education}</p>
                <small className={`text-muted ${ls.mini_stat_label}`}>
                  Education
                </small>
              </div>
            </div>
            <div className={`${ls.mini_stat_divider}`}></div>
            <div className="d-flex justify-content-center">
              <div className={`${ls.mini_stat_icon}`}>
                <FaUsers size={28} />
              </div>
              <div className={`${ls.mini_stat}`}>
                <p class="h6">{stats?.jobs}</p>
                <small className={`text-muted ${ls.mini_stat_label}`}>
                  Jobs
                </small>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card className={`${ls.thickBorder}`}>
          <Card.Body className="p-2 d-flex justify-content-around">
            <div className="d-flex justify-content-center">
              <div className={`${ls.mini_stat_icon}`}>
                <HiLockClosed size={28} />
              </div>
              <div className={`${ls.mini_stat}`}>
                <p class="h6">{stats?.education}</p>
                <small className={`text-muted ${ls.mini_stat_label}`}>
                  Education
                </small>
              </div>
            </div>
            <div className={`${ls.mini_stat_divider}`}></div>
            <div className="d-flex justify-content-center">
              <div className={`${ls.mini_stat_icon}`}>
                <FaUsers size={28} />
              </div>
              <div className={`${ls.mini_stat}`}>
                <p class="h6">{stats?.learning}</p>
                <small className={`text-muted ${ls.mini_stat_label}`}>
                  Learning
                </small>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ContactCard;
