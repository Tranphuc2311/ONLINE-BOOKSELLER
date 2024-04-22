import { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Giả sử mặc định chưa đăng nhập

	return (
		<MyContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			{props.children}
		</MyContext.Provider>
	);
};

export { MyContext, MyContextProvider };
