import { Alert } from "react-native";
// import ApiStatusTable, { API_LIST_TABLE } from "../database/ApiStatusTable";

// export const saveApiHistoryInDb=async(payload,url,response)=>{
//     const apiStatusTable=new ApiStatusTable();

//     let length=await apiStatusTable.getRowCount({},API_LIST_TABLE,);

//     //Alert.alert(JSON.stringify(length));

//     if(length>50){
//         apiStatusTable.deleteAll(API_LIST_TABLE);
//     }

//     const res=apiStatusTable.insert({},{

//         name:API_LIST_TABLE,
//         url:JSON.stringify(url),
//         payload:JSON.stringify(payload),
//         response:JSON.stringify(response),
//         updatedOn:new Date().getTime()

//     });

// };