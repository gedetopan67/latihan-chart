interface NavChildProps {
  menu: { label: string; link: string };
  image: any;
}

const NavChild = ({ menu, image }: NavChildProps) => {
  return (
    <div className="flex flex-row">
      <a href={menu.link}>
        <div className="mr-2 bg-[#cccc]">{menu.label}</div>
      </a>
    </div>
  );
};

export default NavChild;
