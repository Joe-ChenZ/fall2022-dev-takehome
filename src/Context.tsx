import React, { useState, useContext, createContext } from "react";
export type CheckedTagsTypes = {
    checkedTags: any[]
    setCheckedTags: ((checkedTags: any[]) => void)
    // any props that come into the component
}
export const Context = createContext<CheckedTagsTypes>({
    checkedTags: [],
    setCheckedTags: () => {},
})
export const useGlobalContext = () => useContext(Context);
// export const ContextProvider = ({ checkedTags, setCheckedTags } : CheckedTagsProps) => {
//     const [checkedTags, setSelectedTags] = useState<any[]>([]);
  
//     return (
//         <Context.Provider value={{ checkedTags, setSelectedTags }}>
//             {children}
//         </Context.Provider>
//     );
// };