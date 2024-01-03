import React from "react";
import Form from "react-bootstrap/Form";

const Search = ({ data, setSearchedData, type, placeholder }) => {
  const handelOnSearch = (e) => {
    const { value } = e.target;
    let matchedData;
    if (type === "books") {
      matchedData = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    if (type === "reviewBook") {
      matchedData = data.filter((item) =>
        item.bookName.toLowerCase().includes(value.toLowerCase())
      );
    }
    if (type === "users") {
      matchedData = data.filter((item) =>
        item.email.toLowerCase().includes(value.toLowerCase())
      );
    }

    setSearchedData(matchedData);
  };
  return (
    <Form>
      <Form.Control
        type="text"
        placeholder={placeholder}
        onChange={handelOnSearch}
      />
    </Form>
  );
};

export default Search;
