import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  useEffect(() => {
    // 컴포넌트 마운트 시 로컬 스토리지의 토큰 확인
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedin(true);
      // 토큰이 있으면 사용자 정보도 로컬 스토리지에서 가져옴
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  const login = async (user_id, password) => {
    try {
      const response = await fetch(
        "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user_id, user_password: password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log(data.user);
        setIsLoggedin(true);
        setToken(data.token);
        // 로컬 스토리지에 토큰과 사용자 정보 저장
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        "https://rw2644hx4c.execute-api.us-east-1.amazonaws.com/api/users/logout",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setUser(null);
        setIsLoggedin(false);
        // 로컬 스토리지에서 토큰과 사용자 정보 제거
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        // 상태 초기화
        setUser(null);
        setIsLoggedin(false);
        setToken(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, isLoggedin, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
