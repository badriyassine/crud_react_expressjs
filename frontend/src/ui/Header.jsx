import { FaCog } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-[#009d57] text-white p-4 rounded ">
      <div className="flex items-center ">
        <h1 className="font-bold">Students Management System</h1>
      </div>
      <div className="items-center flex gap-4">
        <FaCog
          size={24}
          className="cursor-pointer transition-transform duration-700 ease-in-out hover:rotate-[360deg] hover:text-gray-200"
        />
        <img
          className="w-10 cursor-pointer"
          src="/src/assets/profile.png"
          alt="profile"
        />
      </div>
    </div>
  );
};

export default Header;
