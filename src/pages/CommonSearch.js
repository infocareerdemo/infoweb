import React, { useState } from "react";
import authservice from "../service/authservice";
import MainHeader from "../MainHeader";
import Sidepannel from "../sidepannel";

const CommonSearch = () => {
    const [isListOpen, setIsListOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState(""); 
    const [searchValue, setSearchValue] = useState(""); 

    const columns = ["spid", "spisin", "spinstrument", "spsymbol"];

    const select = (item) => {
        setSelectedData((prevSelectedData) => [...prevSelectedData, item]);
        setIsListOpen(false);
    };

    const CommonSearch = (searchQuery) => {
        if (searchQuery.length >= 3) {
            authservice.commonSearch(searchQuery)
                .then((response) => {
                   // setSelectedColumn(columns[0]); 
                    setSelectedData([]); 
                    console.log(response);
                    setSelectedData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching search results:", error);
                });
        } else {
            setSelectedData([]);
        }
    };

    return (
        <div>
            <MainHeader />
            <Sidepannel />
            <div className="page-wrapper">
                <label>Search Box</label>
                <input
                    type="search"
                    style={{ width: "150px" }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsListOpen(false)}
                />
                {/* <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
                    {columns.map((col) => (
                        <option key={col} value={col}>
                            {col}
                        </option>
                    ))}
                </select> */}
                <button onClick={() => CommonSearch(searchValue)}>Search</button>

                {isListOpen && selectedData.length > 0 && (
                    <div style={{ border: "1px solid", width: "150px", marginLeft: "6%" }}>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {selectedData.map((item) => (
                                <li
                                    key={item}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => select(item)}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <h1 style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Datatable</h1>
                <div className="searchTable">
                    <table>
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th key={col} style={{ border: "1px solid black", textAlign: "center" }}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {selectedData.map((item, index) => (
                                <tr key={item}>
                                    {columns.map((col) => (
                                        <td key={col} style={{ border: "1px solid black" }}>
                                            {item[col]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CommonSearch;
