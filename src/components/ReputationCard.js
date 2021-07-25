import React from "react";
import { Card, Col } from "react-bootstrap";
import { RiShieldStarFill } from "react-icons/ri";
import SubHeader from "./SubHeader";
import ls from "../css/ReputationCard.module.css";

const ReputationCard = () => {
  const progressLevel = 85;
  return (
    <div>
      <div>
        <Col sm={12}>
          <SubHeader text="Reputation" />
        </Col>
        <Card className={`${ls.thickBorder}`}>
          <Card.Body className="p-2 ">
            <div className="d-flex justify-content-start">
              <div className={`${ls.rep_stat_icon}`}>
                <RiShieldStarFill size={28} />
              </div>
              <div className={`${ls.rep_stat}`}>
                <p class="h6 mb-3">
                  <div className="d-flex justify-content-between">
                    <div>Profile Completetion</div> <div>85%</div>
                  </div>
                </p>
                <div className={`${ls.rep_progress} progress`}>
                  <div
                    className={`progress-bar ${ls.rep_progress_bar}`}
                    role="progressbar"
                    style={{ width: progressLevel + "%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ReputationCard;
