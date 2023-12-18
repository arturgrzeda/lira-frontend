'use client';

import { LogOut } from '@/Src/Api/AuthApi';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
;
function LogoutButton() {
  const [cookies] = useCookies(['jwt']);
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false)


  useEffect(() => {
    setisUserLoggedIn(!!cookies.jwt)
  }, [cookies])


  const handleLogout = () => {
    const shouldLogout = window.confirm("Czy napewno chcesz się wylogować ?");
    if (shouldLogout) {
      LogOut();
    }
  };

  return (
    <>
      {isUserLoggedIn && <button className="p-2 font-mono text-sm" onClick={handleLogout}>
        Wyloguj
      </button>}
    </>
  );
}

export default LogoutButton;