import { MyContext } from '@/App';
import { useContext } from 'react';
import { BiSolidHome } from 'react-icons/bi';
import { FaGamepad, FaUserAstronaut } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { showSideBar, popUser, setPopUser } = useContext(MyContext);

  const showPopUser = (e) => {
    e.stopPropagation();
    setPopUser((current) => !current);
  };
  return (
    <aside
      onClick={(e) => {
        if (popUser) {
          showPopUser(e);
        }
      }}
      className={`${
        !showSideBar
          ? 'w-0 shadow-none md:w-[50px]'
          : 'w-[50px] shadow shadow-gray-900 md:w-[300px]'
      } fixed  mt-[60px] z-[50] flex h-screen`}
    >
      <div className="flex h-full w-[50px] flex-col items-center justify-start  border-r-[1px]  border-neutral-900 bg-black py-4 text-center text-xs">
        <Link to={'/user'} className="flex w-full items-center ">
          <svg className="h-[54px] w-[2px] bg-orange-400 " />
          <div className="flex h-fit w-full flex-col items-center justify-center gap-1 bg-slate-800 py-2  ">
            <span className="cursor-pointer text-2xl">
              <FaUserAstronaut />
            </span>
            <span>User</span>
          </div>
        </Link>

        <Link
          className="flex h-fit w-full flex-col items-center justify-center gap-1 px-4 py-2"
          to={'/'}
        >
          <span className="text-2xl">
            <BiSolidHome />
          </span>
          <span>Home</span>
        </Link>

        <Link
          to={'/search'}
          className="flex h-fit w-full flex-col items-center justify-center gap-1 px-4 py-2"
        >
          <span className="text-2xl">
            <FaGamepad />
          </span>
          <span>Games</span>
        </Link>
      </div>
      <div className="w-[250px] justify-center bg-gray-900"></div>
    </aside>
  );
};

export default Sidebar;
