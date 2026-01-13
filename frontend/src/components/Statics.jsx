import { FaUserGraduate, FaMars, FaVenus } from "react-icons/fa";
import { useSelector } from "react-redux";

const Statics = () => {
  const { students } = useSelector((state) => state.students);

  const totalMales = students.filter(
    (student) => student.gender === "male"
  ).length;
  const totalFemales = students.filter(
    (student) => student.gender === "female"
  ).length;

  const StatCard = ({ title, count, icon: Icon, bgColor, iconColor }) => (
    <div className="p-4 bg-white border font-medium rounded-lg flex-1">
      <h1 className="text-lg text-gray-600 mb-3">{title}</h1>
      <div className="flex items-center gap-4">
        <Icon className={`${bgColor} p-3 rounded-lg ${iconColor}`} size={48} />
        <h2 className="text-3xl font-bold">{count}</h2>
      </div>
    </div>
  );

  // hna return jsx dyal static cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Total Students"
        count={students.length}
        icon={FaUserGraduate}
        bgColor="bg-gray-200"
        iconColor="text-[#009d57]"
      />
      <StatCard
        title="Total Males"
        count={totalMales}
        icon={FaMars}
        bgColor="bg-gray-200"
        iconColor="text-blue-600"
      />
      <StatCard
        title="Total Females"
        count={totalFemales}
        icon={FaVenus}
        bgColor="bg-gray-200"
        iconColor="text-pink-600"
      />
    </div>
  );
};

export default Statics;
