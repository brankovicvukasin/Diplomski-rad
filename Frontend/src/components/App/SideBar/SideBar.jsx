import { FaUserFriends } from 'react-icons/fa';
import { IoPersonAddSharp } from 'react-icons/io5';
import { HiUserGroup } from 'react-icons/hi2';
import { MdGroupAdd } from 'react-icons/md';
import { BiSolidCartAdd } from 'react-icons/bi';
import { FaMoneyBill } from 'react-icons/fa';
import { SiSimpleanalytics } from 'react-icons/si';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import Logo from '../../../components/Reusable/Logo';
import Element from './Element.jsx';
import PropTypes from 'prop-types';

SideBar.propTypes = {
  open: PropTypes.bool,
  onSidebar: PropTypes.func,
};

function SideBar({ open, onSidebar }) {
  const sidebarSections = [
    {
      title: 'Prijatelji',
      elements: [
        { type: 'Prijatelji', icon: <FaUserFriends />, url: 'friends' },
        {
          type: 'Dodaj prijatelja',
          icon: <IoPersonAddSharp />,
          url: 'addfriend',
        },
      ],
    },
    {
      title: 'Grupe',
      elements: [
        { type: 'Grupe', icon: <HiUserGroup />, url: 'groups' },
        { type: 'Napravi grupu', icon: <MdGroupAdd />, url: 'addgroup' },
      ],
    },
    {
      title: 'Troškovi',
      elements: [
        { type: 'Troškovi', icon: <FaMoneyBill />, url: 'expenses' },
        { type: 'Dodaj trošak', icon: <BiSolidCartAdd />, url: 'addexpense' },
      ],
    },
  ];

  return (
    <div
      className={`${
        open ? ' min-w-[220px] px-2' : 'w-0 overflow-hidden'
      } relative min-h-screen bg-slate-900 duration-500  `}
    >
      {open && (
        <>
          <div className="flex pl-2 pt-4">
            <Logo style="w-[50px] h-[50px]" source="/logo1.png" link="/app" />
            <h1 className="self-center pl-2 text-xl font-bold text-zinc-100">
              FairShare
            </h1>
          </div>

          {sidebarSections.map((section, index) => (
            <div key={index}>
              <div className="my-4 h-[1px] bg-gray-600" />
              {section.elements.map((element, elementIndex) => (
                <Element
                  key={elementIndex}
                  type={element.type}
                  url={element.url}
                  onSidebar={onSidebar}
                >
                  {element.icon}
                </Element>
              ))}
            </div>
          ))}
          <div className="my-4 h-[1px] bg-gray-600" />

          <Element
            key="analytics"
            type="Analitika"
            url="analytics"
            onSidebar={onSidebar}
          >
            <SiSimpleanalytics />
          </Element>

          <Element
            key="maps"
            type="Mapa troškova"
            url="maps"
            onSidebar={onSidebar}
          >
            <FaMapMarkedAlt />
          </Element>

          <div className="my-4 h-[1px] bg-gray-600" />
          <Element key="logout" type="Logout" url="/" onSidebar={onSidebar}>
            <MdLogout />
          </Element>

          <div className="my-11 text-center">
            <p className="text-sm text-zinc-100">
              &copy; FairShare {new Date().getFullYear()}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default SideBar;
