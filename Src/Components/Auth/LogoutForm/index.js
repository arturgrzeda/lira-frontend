'use client';

import { LogOut } from '@/Src/Api/AuthApi'

function Logout() {
    return ( <button className="font-mono uppercase" onClick={(e) => LogOut()}>Wyloguj</button> );
}

export default Logout;