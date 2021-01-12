import React , {useContext,useState} from 'react';

export const AlertContext = React.createContext();
export const AlertContextToggle = React.createContext();


export const AlertProvider = ({ children }) => {
    const [al, setAl] = useState(false);
    
    const toggle = () => {
        setAl(prev => !prev);
    }

    return (
        <AlertContext.Provider value={al}>
            <AlertContextToggle.Provider value={toggle}>
                { children }
            </AlertContextToggle.Provider>
        </AlertContext.Provider>
    )
}