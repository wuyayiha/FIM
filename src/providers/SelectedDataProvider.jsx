
import { useState, } from "react";
import { SelectedDataContext } from '../contexts/createContext';

const defaultQuery = {
    1: {
        tableId: 1,
        secTab: "未过期未完成",
        viewId: 0,
        filterCriterias: [
            {
                "colName": "item_code",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "item_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "customer_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "item_type",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_type",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_code",
                "condition": "like",
                "value": ""
            }
        ],
    },
    2: {
        tableId: 2,
        secTab: null,
        viewId: 0,
        filterCriterias: [
            {
                "colName": "item_code",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "item_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "customer_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "item_type",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_type",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_code",
                "condition": "like",
                "value": ""
            }
        ]
    },
    3: {
        tableId: 3,
        secTab: null,
        viewId: 0,
        filterCriterias: [
            {
                "colName": "item_code",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "item_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "customer_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "item_type",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_type",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_code",
                "condition": "like",
                "value": ""
            }
        ]
    },
    4: {
        tableId: 4,
        secTab: null,
        viewId: 0,
        filterCriterias: [
            {
                "colName": "item_code",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "item_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "customer_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "item_type",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_type",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_code",
                "condition": "like",
                "value": ""
            }
        ]
    },
    5: {
        tableId: 5,
        secTab: null,
        viewId: 1,
        filterCriterias: [
            {
                "colName": "item_code",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "item_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "customer_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_type",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_code",
                "condition": "like",
                "value": ""
            }
        ]
    },
    6: {
        tableId: 6,
        secTab: null,
        viewId: 0,
        filterCriterias: [
            {
                "colName": "item_code",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "item_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "customer_name",
                "condition": "like",
                "value": ""
            },
            {
                "colName": "inquiry_code",
                "condition": "like",
                "value": ""
            }
        ]
    }
}

const SelectedDataProvider = ({ children }) => {
    const [selectedData, setSelectedData] = useState();
    const [selectedQuery, setSelectedQuery] = useState(defaultQuery)
    const [selectedCustomerDisplay, setSelectedCustomerDisplay] = useState()
    const [savedNewData, setSavedNewData] = useState(null)
    function updateSelectedQuery(tableId, key, newValue) {
        setSelectedQuery(prev =>
        ({
            ...prev,
            [tableId]: {
                ...prev[tableId],
                [key]: newValue,
            },
        })
        )
    }

    function resetSelectedQuery(tableId, key, viewId) {
        if (tableId === 1 && viewId > 0) {
            setSelectedQuery(prev =>
            ({
                ...prev,
                1: {
                    ...prev[1],
                    filterCriterias: prev[1].filterCriterias.map(criteria => ({
                        ...criteria,
                        value: ""
                    }))
                },
            }))
        }
        else {
            setSelectedQuery(prev =>
            ({
                ...prev,
                [tableId]: {
                    ...prev[tableId],
                    [key]: [...defaultQuery[tableId][key]]
                },
            })
            )
        }
    }
    return (
        <SelectedDataContext.Provider value={{ selectedData, setSelectedData, selectedQuery, updateSelectedQuery, resetSelectedQuery, savedNewData, setSavedNewData, selectedCustomerDisplay, setSelectedCustomerDisplay }}>
            {children}
        </SelectedDataContext.Provider>
    );
}

export default SelectedDataProvider;