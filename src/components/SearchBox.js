import React, { useEffect, useState } from "react";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";
import ls from "../css/SearchBox.module.css";
import Aggregator from "../models/Aggregator";

const searchData = ({ type, value }) => {
  if (type === "skill") {
    return { skill: { term: value, experience: "1-plus-year" } };
  } else if (type === "compensationrange") {
    let data = {
      compensationrange: {
        minAmount: 0,
        maxAmount: 10,
        currency: "USD$",
        periodicity: "hourly",
      },
    };
    let [range, period] = value.substr(4).split("/");
    if (range.includes("-")) {
      data = {
        compensationrange: {
          minAmount: range.split("-")[0],
          maxAmount: range.split("-")[1],
          currency: "USD$",
          periodicity: period,
        },
      };
    } else {
      data = {
        compensationrange: {
          minAmount: range.replace(">", "").replace(" ", ""),
          currency: "USD$",
          periodicity: period,
        },
      };
    }
    return data;
  } else if (type === "remoter") {
    return {
      remoter: {
        term: value === "yes",
      },
    };
  } else if (type === "opento") {
    return {
      opento: { term: value },
    };
  } else {
    return {
      name: {
        term: value,
      },
    };
  }
};

export default function SearchBox() {
  const [aggregators] = useState(Object.keys(Aggregator));
  const aggMap = {
    opento: "Employment Type",
    remoter: "Works Remotely",
    skill: "Skill",
    compensationrange: "Salary Range",
  };
  const [aggregatorValue, setAggregatorValue] = useState([]);
  const [searchFilter, setSearchFilter] = useState({ type: "", value: "" });
  const handleFilterBy = (selected) => {
    setSearchFilter({ type: selected, value: "" });
  };
  const handleFilterValue = (selected) => {
    setSearchFilter({ ...searchFilter, value: selected });
  };
  useEffect(() => {
    if (!searchFilter.type) {
      return;
    }
    setAggregatorValue(Aggregator[searchFilter.type].map((x) => x.value));
  }, [searchFilter.type]);

  useEffect(() => {
    if (!searchFilter.value) {
      return;
    }
    console.log(searchData({ ...searchFilter }));
  }, [searchFilter.value, searchFilter]);
  return (
    <div>
      <InputGroup className="mb-2">
        <InputGroup.Text className={`${ls.custom_left}`}>
          <RiSearch2Line size={22} color="#26396b" />
        </InputGroup.Text>
        <FormControl
          className={`${ls.custom_right} ${ls.remove_lb}`}
          placeholder="Search for Programmers"
        />
      </InputGroup>
      <Col>
        <Row className={`g-1`}>
          <Col>
            <Form.Select
              value={searchFilter.type}
              onChange={(x) => handleFilterBy(x.target.value)}
              className={`${ls.custom_left}`}
            >
              <option value="">Filter By</option>
              {aggregators.map((agg, i) => (
                <option value={agg} key={"agg_" + i}>
                  {aggMap[agg]}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Select
              value={searchFilter.value}
              onChange={(e) => handleFilterValue(e.target.value)}
              className={`${ls.custom_right}`}
            >
              <option>Values</option>
              {aggregatorValue.map((aggV, i) => (
                <option value={aggV} key={"aggV_" + i}>
                  {aggV}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Col>
    </div>
  );
}
