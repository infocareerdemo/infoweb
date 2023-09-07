import React, { useState } from "react";
import MainHeader from "../MainHeader";
import Sidepannel from "../sidepannel"; // Ensure the correct import path
import { postApi } from '../service/APICall';

const CommonSearch1 = () => {
    const [isListOpen, setIsListOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State to store the user input

    const apiUrl = "search";

    const companySearch = async (searchQuery) => {
        if (searchQuery.length >= 3) {
            const data = {
                keyword: searchQuery, // Set the keyword from user input
            };
            try {
                const response = await postApi('POST', apiUrl, data);
                setSearchData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const select = (item) => {
        setSelectedData((prevSelectedData => [...prevSelectedData, item]));
        setIsListOpen(false);
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery when the input changes
                    onFocus={() => setIsListOpen(true)}
                />
                <input type="button" name="Search" value="search" onClick={companySearch} />
                {isListOpen && searchData.length > 0 && (
                    <div style={{ border: "1px solid", width: "150px", marginLeft: "6%" }}>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {searchData.map((item) => (
                                <li
                                    key={item.spsymbol}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => select(item)}
                                >
                                    {item.spsymbol}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <h1 style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>Datatable</h1>
                <div className="searchTable" >
                    <table>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', textAlign: "center" }}>S.no</th>
                                <th style={{ border: '1px solid black', textAlign: "center" }}>Spid</th>
                                <th style={{ border: '1px solid black', textAlign: "center" }}>Spisin</th>
                                <th style={{ border: '1px solid black', textAlign: "center" }}>Spinstrument</th>
                                <th style={{ border: '1px solid black', textAlign: "center" }}>Spsymbol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedData.map((item, i) => (
                                <tr key={item.spsymbol}>
                                    <td style={{ border: '1px solid black' }}>{i + 1}</td>
                                    <td style={{ border: '1px solid black' }}>{item.spid}</td>
                                    <td style={{ border: '1px solid black' }}>{item.spisin}</td>
                                    <td style={{ border: '1px solid black' }}>{item.spinstrument}</td>
                                    <td style={{ border: '1px solid black' }}>{item.spsymbol}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default CommonSearch1;
