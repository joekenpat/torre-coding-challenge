import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";
import ls from "../css/SearchBox.module.css";

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

const prepareAccountsData = (data) => {
  if (Array.isArray(data))
    return data.map((pd) => ({
      name: pd.name,
      headline: pd.professionalHeadline,
      avatarUrl: pd.picture,
      compensation: pd.compensations.employee || pd.compensations.employee,
      skills: pd.skills
        .sort((a, b) => parseInt(b.weight) - parseInt(a.weight))
        .slice(0, 2)
        .map((x) => x.name),
      remoteWorking: pd.remoter,
      username: pd.username,
      weight: pd.weight,
      location: pd.locationName,
    }));
  return [];
};

export default function SearchBox({ sendAvailAccounts, hidden = false }) {
  const [loading, setLoading] = useState(false);
  const [aggregatorData, setAggregatorData] = useState({});
  const [aggregators, setAggregators] = useState(Object.keys(aggregatorData));
  const [filterData, setFilterData] = useState({ and: [] });
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
  const handleFilterButton = () => {
    setFilterData({
      and: [...filterData.and, searchData({ ...searchFilter })],
    });
    loadData();
  };
  const loadData = () => {
    if (!filterData.and) {
      return;
    }
    setLoading(true);
    axios({
      method: "POST",
      url: "https://search.torre.co/people/_search",
      params: {
        offset: 0,
        size: 10,
        aggregate: true,
        limit: 20,
      },
      data: filterData,
      config: { headers: { Accept: "application/json" } },
    })
      .then((res) => {
        setAggregatorData(res.data.aggregators);
        sendAvailAccounts(prepareAccountsData(res.data.results));
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    setAggregators(Object.keys(aggregatorData));
  }, [aggregatorData]);
  useEffect(() => {
    if (!searchFilter.type) {
      return;
    }
    setAggregatorValue(aggregatorData[searchFilter.type].map((x) => x.value));
  }, [searchFilter.type, aggregatorData]);
  useEffect(loadData, []);
  return (
    <div className={`${hidden ? "d-none" : ""}`}>
      {/* <InputGroup className="mb-2">
        <InputGroup.Text className={`${ls.custom_left}`}>
          <RiSearch2Line size={22} color="#26396b" />
        </InputGroup.Text>
        <FormControl
          className={`${ls.custom_right} ${ls.remove_lb}`}
          placeholder="Search for Programmers"
        />
      </InputGroup> */}
      <Col className={`${ls.filter_box}`}>
        <InputGroup>
          <Form.Select
            disabled={loading}
            value={searchFilter.type}
            onChange={(x) => handleFilterBy(x.target.value)}
          >
            <option value="">Filter By</option>
            {aggregators.map((agg, i) => (
              <option value={agg} key={"agg_" + i}>
                {aggMap[agg]}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            disabled={loading}
            value={searchFilter.value}
            onChange={(e) => handleFilterValue(e.target.value)}
          >
            <option>Options</option>
            {aggregatorValue.map((aggV, i) => (
              <option value={aggV} key={"aggV_" + i}>
                {aggV}
              </option>
            ))}
          </Form.Select>
          <Button
            size="sm"
            className={`${ls.filter_button}`}
            onClick={handleFilterButton}
            disabled={loading}
          >
            <RiSearch2Line size={22} color="#f6faff" />
          </Button>
        </InputGroup>
      </Col>
    </div>
  );
}
