import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ href, icon: Icon, title }) => {
  const { pathname } = useLocation();

  const isActive = pathname.startsWith(href) || false;

  return (
    <Link
      to={href}
      className="flex h-fit w-full items-center justify-center gap-1 bg-slate-800 py-2  "
    >
      <div className="flex h-fit w-full flex-col items-center justify-center gap-1 bg-slate-800 px-2">
        <span className="cursor-pointer text-2xl">
          <Icon />
        </span>
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
