import { FaPlus } from "react-icons/fa";

const Filter = ({ onAddClick, searchTerm, setSearchTerm, genderFilter, setGenderFilter }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      {/* Search bar */}
      <input
        type="search"
        placeholder="Search by Name, Family Name ,Reg Number or Course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-md p-2 flex-1"
      />

      {/* Gender filter */}
      <select
        name="filter"
        id="filter"
        value={genderFilter}
        onChange={(e) => setGenderFilter(e.target.value)}
        className="border rounded-md p-2"
      >
        <option value="all">All Students</option>
        <option value="male">Male Students</option>
        <option value="female">Female Students</option>
      </select>

      {/* Add student button */}
      <button
        onClick={onAddClick}
        className="bg-[#009d57] rounded-md cursor-pointer hover:opacity-90 flex items-center px-4 gap-2 font-bold py-2 text-white"
      >
        <FaPlus size={20} />
        Add Student
      </button>
    </div>
  );
};

export default Filter;

