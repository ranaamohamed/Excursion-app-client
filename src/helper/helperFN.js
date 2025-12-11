import { jwtDecode } from "jwt-decode";

// Check if Token Expired

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return true;
  }
};

// Check Token if exist or expired

export const checkAUTH = () => {
  const authToken = localStorage.getItem("token");
  if (authToken && !isTokenExpired(authToken)) {
    return true;
  } else {
    // console.log("token is null Or expired");
    return false;
  }
};

export const GetMyUser = () => {
  const userLocal = localStorage.getItem("user");
  if (userLocal) {
    const user = JSON.parse(userLocal);
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
  }
  return "";
};

export const GetMyData = () => {
  const userLocal = localStorage.getItem("user");
  if (userLocal) {
    const user = JSON.parse(userLocal);
    if (user) {
      return { name: `${user.firstName} ${user.lastName}`, email: user.email };
      //return `${user.firstName} ${user.lastName}`;
    }
  }
  return "";
};
