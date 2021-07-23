import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { RiSearch2Line } from "react-icons/ri";
import ls from "../css/SearchBox.module.css";

export default function SearchBox() {
  return (
    <div>
      <InputGroup>
        <InputGroup.Text className={`${ls.white}`}>
          <RiSearch2Line size={22} color="#26396b" />
        </InputGroup.Text>
        <FormControl
          className={`${ls.remove_lb}`}
          placeholder="Search for Programmers"
        />
      </InputGroup>
    </div>
  );
}
