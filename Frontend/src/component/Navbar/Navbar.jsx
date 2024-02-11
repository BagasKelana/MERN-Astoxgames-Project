import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { BiMenu } from 'react-icons/bi';
import { FaUserAstronaut } from 'react-icons/fa';

import { MyContext } from '@/App';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosLogOut, IoIosSettings } from 'react-icons/io';
import { FiInbox } from 'react-icons/fi';

import axios from 'axios';
import { useDebounce } from 'use-debounce';

const Navbar = () => {
  const { showSideBar, setShowSideBar, popUser, setPopUser } =
    useContext(MyContext);
  const { currentUser } = useSelector((state) => state.user);

  const showPopUser = (e) => {
    e.stopPropagation();
    setPopUser((current) => !current);
  };

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <>
      <header className="navbar fixed top-0 z-[100] flex h-[64px] w-full bg-main-color shadow shadow-[rgb(25,25,25)] ">
        <nav
          onClick={(e) => {
            if (popUser) {
              showPopUser(e);
            }
          }}
          className="flex w-full items-center"
        >
          <div className=" flex h-full items-center border-r border-gray-900   px-[10px] ">
            <span onClick={handleSideBar} className="cursor-pointer text-3xl">
              <BiMenu />
            </span>
          </div>

          <div className={` flex h-full w-full   pl-0  pr-6 `}>
            <Link
              className="flex h-full w-fit justify-start px-4 md:w-2/4 md:px-0"
              to={'/'}
            >
              <span className="sr-only">Nav home</span>

              <img
                className=" aspect-video h-full object-cover invert"
                src="/images/logo1.png"
                alt="logo"
              />
            </Link>
            <SearchInput />
            <div className="hidden h-full w-2/4 items-center justify-end gap-4 md:flex">
              <span className=" cursor-pointer text-lg">
                {currentUser ? (
                  <Link to="/user">
                    {`${currentUser.firstName} ${currentUser.lastName}`}
                  </Link>
                ) : (
                  <Link to={'/login'}>Login here!</Link>
                )}
              </span>
              {currentUser?.photo ? (
                <span className="rounded border-[1px] border-solid bg-gradient-to-r from-[#0c2135] to-[#09092b]  text-2xl">
                  <img
                    className="h-6 w-6"
                    src={currentUser.photo}
                    alt="photo"
                  />
                </span>
              ) : (
                <div
                  onClick={showPopUser}
                  className=" relative cursor-pointer rounded border-[1px] border-solid bg-gradient-to-r from-[#0c2135] to-[#09092b] px-1 pt-1 text-2xl"
                >
                  <FaUserAstronaut />
                  <div
                    className={`${
                      popUser ? 'flex' : 'hidden'
                    } absolute right-0 top-[40px] z-[100]  rounded bg-gray-900 shadow shadow-black`}
                  >
                    <ul className="flex h-full w-44 flex-col text-sm">
                      <Link
                        to={'/user'}
                        className="flex w-full items-center gap-4 px-4 py-2 hover:bg-gray-800"
                      >
                        <FaUserAstronaut />
                        My Profile
                      </Link>
                      <Link
                        to={'/user/setting'}
                        className="flex w-full items-center gap-4 px-4 py-2 hover:bg-gray-800"
                      >
                        <IoIosSettings /> Edit Profile
                      </Link>
                      <Link className="flex w-full items-center gap-4 px-4 py-2 hover:bg-gray-800">
                        <FiInbox />
                        Inbox
                      </Link>
                      <Link className="flex w-full items-center gap-4 px-4 py-2 hover:bg-gray-800">
                        <IoIosLogOut /> Sign Out
                      </Link>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

const SearchInput = () => {
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState('');
  const [showDropDownSearch, setShowDropDownSearch] = useState(false);
  const [value] = useDebounce(term, 1000);
  const [data, setData] = useState(null);
  const [gameCount, setGameCount] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (value) {
      const fecthData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/games/search?term=${value}`);
          const result = await response.data;
          setData(() => result.games);
          setGameCount(() => result.count);
          console.log(result);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      fecthData();
    }
    return setData(() => null);
  }, [value]);

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (e.target.value) {
        const url = `/search?term=${e.target.value}&categories=&platform=&genre=`;
        navigate(url);
      }

      return setTerm(() => '');
    }
  };
  const handleOnChange = (e) => {
    setTerm(() => e.target.value);
    setLoading(() => true);
  };
  const handleOnCLick = (e) => {
    e.preventDefault();
    navigate();
  };
  const hiddenDropMenu = () => {
    return setShowDropDownSearch(false);
  };
  const handleOnFocus = () => {
    setShowDropDownSearch(true);
    console.log('halo');
  };
  return (
    <div className="flex h-full w-full items-center">
      <div className=" relative flex h-fit w-full items-center ">
        <form
          autoComplete="off"
          className={`flex h-full w-full items-center justify-between gap-2 rounded-2xl border-[1px] border-neutral-400 bg-gradient-to-r px-4  py-2 text-neutral-400  focus-within:border-[2px] focus-within:border-white focus-within:bg-white  focus-within:text-black `}
        >
          <input
            onFocus={handleOnFocus}
            value={term}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            className="flex h-full w-full items-center bg-transparent placeholder-neutral-400 outline-none"
            type="text"
            name="search"
            id="search"
            placeholder="Find your games"
          />
          <span onClick={handleOnCLick} className="cursor-pointer text-lg ">
            <BsSearch />
          </span>
        </form>
        {loading ? (
          <div
            className={`${
              term && showDropDownSearch ? 'flex' : 'hidden'
            } fixed right-0 top-[60px] z-[100] flex h-[calc(100%_-_60px)] w-full  flex-col  gap-4 overflow-auto bg-gray-900 px-4 py-4 md:absolute md:top-0 md:mt-10 md:h-fit md:max-h-[336px] md:rounded-lg`}
          >
            <div className="flex w-full animate-pulse gap-4 ">
              <div className="h-12 w-24 rounded bg-gray-700" />
              <div className="flex flex-col gap-2 ">
                <div className="h-full w-32 rounded bg-gray-700" />
                <div className="flex h-full w-20 items-center gap-2  ">
                  <div className="h-5 w-5 rounded bg-gray-700" />
                  <div className="h-5 w-5 rounded bg-gray-700" />
                  <div className="h-5 w-5 rounded bg-gray-700" />
                  <div className="h-5 w-5 rounded bg-gray-700" />
                </div>
              </div>
            </div>
            <div className="flex w-full animate-pulse gap-4 ">
              <div className="h-12 w-24 rounded bg-gray-700" />
              <div className="flex flex-col gap-2 ">
                <div className="h-full w-32 rounded bg-gray-700" />
                <div className="flex h-full w-20 items-center gap-2  ">
                  <div className="h-5 w-5 rounded bg-gray-700" />
                  <div className="h-5 w-5 rounded bg-gray-700" />
                  <div className="h-5 w-5 rounded bg-gray-700" />
                  <div className="h-5 w-5 rounded bg-gray-700" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={hiddenDropMenu}
            className={`${
              term && showDropDownSearch ? 'flex' : 'hidden'
            } fixed right-0 top-[60px] z-[100] h-[calc(100%_-_60px)] w-full flex-col gap-4 overflow-auto bg-gray-900 px-4 py-4 md:absolute md:top-0 md:mt-10 md:h-fit md:max-h-[336px] md:rounded-lg`}
          >
            {data?.map((game) => {
              return (
                <Link
                  to={`game/${game._id}/${game.name}`}
                  key={game._id}
                  className="flex w-full gap-4"
                >
                  <div className="h-12 w-24">
                    <img
                      width={500}
                      height={500}
                      className="h-full w-full rounded-md object-cover"
                      src={`/api${game.card_image}`}
                      alt="search-image"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <div className="font-medium">{game.name}</div>
                    <div className="flex h-full w-full items-center gap-2">
                      {game.parent_platforms.map((image) => {
                        return (
                          <img
                            key={image._id}
                            className="h-4 w-4"
                            src={`/images/logo-platform/${image.platform.slug}.svg`}
                            alt="platforms"
                          />
                        );
                      })}
                    </div>
                  </div>
                </Link>
              );
            })}
            <hr />
            <div className=" flex w-full justify-between">
              <div>See all result</div>
              <div>{gameCount && gameCount} Games</div>
            </div>
          </div>
        )}
        {
          <div
            onClick={hiddenDropMenu}
            className={`${
              term && showDropDownSearch ? 'flex' : 'hidden'
            } fixed left-[50px] right-0 top-[60px] z-[50]  h-[calc(100%_-_60px)] w-full bg-black opacity-70`}
          />
        }
      </div>
    </div>
  );
};

export default Navbar;
