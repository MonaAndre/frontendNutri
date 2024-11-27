import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useUserState } from '../hooks/useUserState';
import { useUserDispatch } from '../hooks/useUserDispatch';
import { signOut } from '../services/authService';
import { UserActionType } from '../reducers/UserReducer';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';
import { BigLogo } from './BigLogo';

const navigation = [
  { name: 'Hem', href: '/' },
  { name: 'Profil', href: '/userStartPage/userProfile', requiresAuth: true },
  { name: 'Inställningar', href: '/userStartPage/userSettings', requiresAuth: true },
];

const navigationNotSignedIn = [
  { name: 'Registrering', href: '/register', requiresAuth: false },
  { name: 'Logga in', href: '/login', requiresAuth: false },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const location = useLocation();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut();
      userDispatch({ type: UserActionType.LOGOUT });
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-slate-900 w-screen">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-1">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center">
              <Link to="/" className="text-white text-xl font-semibold">
                {/* Logo text or image */}
              <BigLogo/>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex gap-10 items-center">
                {navigation
                  .filter((item) => !item.requiresAuth || userState.isLoggedIn)
                  .map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                      className={classNames(
                        location.pathname === item.href
                          ? 'bg-gray-900 text-white font-bold border-b border-blue-500'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}

                {/* User Links */}
                {userState.isLoggedIn ? (
                  <button
                    onClick={handleLogOut}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md p-3 text-sm font-medium"
                  >
                    Logga ut
                  </button>
                ) : (
                  <>
                    {navigationNotSignedIn
                      .filter((item) => !item.requiresAuth || userState.isLoggedIn)
                      .map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          aria-current={location.pathname === item.href ? 'page' : undefined}
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-gray-900 text-white font-bold border-b border-blue-500'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation
            .filter((item) => !item.requiresAuth || userState.isLoggedIn)
            .map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={location.pathname === item.href ? 'page' : undefined}
                className={classNames(
                  location.pathname === item.href
                    ? 'bg-gray-900 text-white font-medium border-b border-blue-500'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-sm font-normal'
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}

          {/* User Links for Mobile */}
          {userState.isLoggedIn ? (
            <DisclosureButton
              as="button"
              onClick={handleLogOut}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-sm font-normal"
            >
              Logga ut
            </DisclosureButton>
          ) : (
            <>
              {navigationNotSignedIn
                .map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    to={item.href}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                    className={classNames(
                      location.pathname === item.href
                        ? 'bg-gray-900 text-white font-medium border-b border-blue-500'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-1 text-sm font-normal'
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
