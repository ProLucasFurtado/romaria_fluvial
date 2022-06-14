import { createContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type UserContextType = {
  modifyMenu: () => void;
  menuOpen: boolean;
};

export const UserContext = createContext({} as UserContextType);

export function UserProvider({ children }: any) {
  const { data: session } = useSession();

  console.log('session', session);
  const [menuOpen, setMenuOpen] = useState(true);

  const router = useRouter();

  function modifyMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    if (!session) setMenuOpen(false);
    else setMenuOpen(true);
  }, [session]);

  useEffect(() => {}, [router.asPath]);

  return <UserContext.Provider value={{ modifyMenu, menuOpen }}>{children}</UserContext.Provider>;
}
