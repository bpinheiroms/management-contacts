/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../contexts/Auth/hooks/useAuth';
import { useTranslation } from 'next-i18next';

const NavBar = () => {
  const { logOut, userLogged } = useAuth();
  const { t } = useTranslation('common');

  return (
    <Disclosure as="nav" className=" bg-black">
      <>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"></div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <p className="text-gray-300">{t('greeting', { name: userLogged?.userInfo?.name })}</p>
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://media-exp1.licdn.com/dms/image/C4D03AQEQ5Sqxz_2_ew/profile-displayphoto-shrink_200_200/0/1604945187613?e=1652918400&v=beta&t=fuUa8hMvR6OOhcv-8u8mL4Ao7cda6T1R8TsLb-xho6s"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700"
                        onClick={logOut}>
                        {t('log-out')}
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default NavBar;
