import React, { useState } from "react";
import authservice from "../service/authservice";
import MainHeader from "../MainHeader";
import Sidepannel from "../sidepannel";

const CompanySearch = () => {

    const [isListOpen, setIsListOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState("")

    
    const select = (item) => {
        console.log(item)
        setSelectedData((prevSelectedData => [...prevSelectedData, item]));
        setSelectedSymbol(item.spsymbol)
        setIsListOpen(false);
        console.log(selectedData)
    };

    const [searchData, setSearchData] = useState([])
    const companySearch = (searchQuery) => {
        if (searchQuery.length >= 3) {
            authservice.companySearch(searchQuery)
                .then((response) => {
                    console.log(response);
                    setSearchData(response.data);
                });
        } else {
            setSearchData([]);
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
                // value={searchData}
                onChange={(e) => companySearch(e.target.value)}
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
                <table >
                    <tr>
                        <th style={{border: '1px solid black' ,textAlign:"center"}}>S.no</th>
                        <th style={{border: '1px solid black' ,textAlign:"center"}}>Spid</th>
                        <th style={{border: '1px solid black' ,textAlign:"center"}}>Spisin</th>
                        <th style={{border: '1px solid black' ,textAlign:"center"}}>Spinstrument</th>
                        <th style={{border: '1px solid black' ,textAlign:"center"}}>Spsymbol</th>
                        
                    </tr>
                    {selectedData.map((item, i) => {
                        console.log(item, "llolo")
                        return (
                            <tr>
                                <td style={{border: '1px solid black'}}>{i = i + 1}</td>
                                <td style={{border: '1px solid black'}}>{item.spid}</td>
                                <td style={{border: '1px solid black'}}>{item.spisin}</td>
                                <td style={{border: '1px solid black'}}>{item.spinstrument}</td>
                                <td style={{border: '1px solid black'}}>{item.spsymbol}</td>
                                
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div >
   </div>

    );
}
export default CompanySearch;