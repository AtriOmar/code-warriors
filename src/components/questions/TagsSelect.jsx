import axios from "axios";
import React from "react";
import { useEffect } from "react";
// import AsyncSelect from "react-select/async";
import dynamic from "next/dynamic";
const AsyncSelect = dynamic(() => import("react-select/async"), { ssr: false });
import makeAnimated from "react-select/animated";
import reactStringReplace from "react-string-replace";

const animatedComponents = makeAnimated();

function UsersSelect({ otherUsers, setUsers, role }) {
  async function fetchUsers(userName) {
    const res = await axios.get("/api/getUsersWithName", {
      params: {
        userName,
      },
    });

    const data = res.data;
    return data.map((obj) => ({
      value: obj._id,
      label: userName.length
        ? reactStringReplace(obj.userName, userName, (match, i) => <b key={i}>{match}</b>)
        : obj.userName,
    }));
  }

  return (
    <div>
      <AsyncSelect
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        defaultOptions
        loadOptions={fetchUsers}
        filterOption={(option) => !otherUsers.includes(option.value)}
        className="mt-2"
        onChange={(newUsers) => setUsers(newUsers.map((curr) => curr.value))}
      />
    </div>
  );
}

export default UsersSelect;
