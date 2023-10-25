import { createContext, useContext, useState } from "react";

interface ILoading{
    isVisible: boolean;
    setIsVisible: (value: boolean) => void;
}

const LoadingContext = createContext<ILoading>({
    isVisible: false,
    setIsVisible: () => {},
});

interface ILoadingProvider{
    children: React.ReactNode;
}

const LoadingProvider = ({ children }: ILoadingProvider) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <LoadingContext.Provider value={{ isVisible, setIsVisible }}>
            {children}
        </LoadingContext.Provider>
    );
}


const useLoading = () => useContext(LoadingContext);

export { LoadingProvider, useLoading };