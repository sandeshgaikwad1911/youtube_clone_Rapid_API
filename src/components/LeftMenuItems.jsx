// eslint-disable-next-line react/prop-types
const LeftMenuItems = ({ text, icon, className, action }) => {
  return (
    <div
      className={"text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[1px] rounded-lg hover:bg-white/[0.15] " + className}
      onClick={action}
    >
      <span className="text-xl mr-5">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export default LeftMenuItems;
