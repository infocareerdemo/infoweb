import React, { useState } from "react";
import { getApi } from '../service/APICall';
import MainHeader from "../MainHeader";
import Sidepannel from "../sidepannel";

const CommonSearch = () => {
    const [isListOpen, setIsListOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedColumn, setSelectedColumn] = useState(""); 
    const [searchValue, setSearchValue] = useState(""); 
    const [loading, setLoading] = useState(false); // Loading indicator state
    const [serverError, setServerError] = useState(null); // Server error state

    const columns = ["spid", "spisin", "spinstrument", "spsymbol"];

    const select = (item) => {
        setSelectedData((prevSelectedData) => [...prevSelectedData, item]);
        setIsListOpen(false);
    };
    const apiUrl = "search";
    
    const commonSearch = async (searchQuery) => {
        setLoading(true); // Show loading indicator
        setServerError(null); // Clear previous server errors

        if (searchQuery.length >= 3) {
            const params = {
                keyword: searchQuery, 
            };
            try {
                const response = await getApi('GET', apiUrl, params);
                setSelectedData([]); 
                console.log(response);
                setSelectedData(response);
            } catch (error) {
                console.error(error);
                setServerError("An error occurred while fetching data. Please try again later.");
            } finally {
                setLoading(false); // Hide loading indicator
            }
        } else {
            setSelectedData([]);
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <div>
            <MainHeader></MainHeader>
            <Sidepannel></Sidepannel>
            <div className="page-wrapper">
                <label>Search Box</label>
                <input
                    type="search"
                    style={{ width: "150px" }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsListOpen(false)}
                />
            
                <button onClick={() => commonSearch(searchValue)}>Search</button>

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

                {loading && <p>Loading...</p>} {/* Display loading indicator */}
                {serverError && <p style={{ color: "red" }}>{serverError}</p>} {/* Display server error message */}

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
}

export default CommonSearch;
