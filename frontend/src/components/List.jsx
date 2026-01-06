import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../redux/slices/studentSlice";
import Update from "./Update";
import ConfirmDelete from "./ConfirmDelete";

const List = ({ students }) => {
  const dispatch = useDispatch();
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudentData, setDeleteStudentData] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleEdit = (student) => {
    setEditStudent(student);
  };

  const handleDelete = (student) => {
    setDeleteStudentData(student);
  };

  const confirmDelete = async () => {
    if (deleteStudentData) {
      setLoading(true);
      await dispatch(deleteStudent(deleteStudentData._id));
      setDeleteStudentData(null);
      setLoading(false);
    }
  };

  // hna return jsx dyal table
  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-[#009d57] text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Family Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Reg Number</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Birthday</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Gender</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Edit</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="10" className="border border-gray-300 px-4 py-2 text-center">
                Loading...
              </td>
            </tr>
          ) : students.length === 0 ? (
            <tr>
              <td colSpan="10" className="border border-gray-300 px-4 py-2 text-center">
                No students found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id || student.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                <td className="border border-gray-300 px-4 py-2">{student.familyName}</td>
                <td className="border border-gray-300 px-4 py-2">{student.regNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{student.course}</td>
                <td className="border border-gray-300 px-4 py-2">{student.age}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {(() => {
                    const date = new Date(student.birthday);
                    const mm = String(date.getMonth() + 1).padStart(2, "0"); // months start at 0
                    const dd = String(date.getDate()).padStart(2, "0");
                    const yyyy = date.getFullYear();
                    return `${mm}-${dd}-${yyyy}`;
                  })()}
                </td>
                <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {student.gender === "male" ? "Male" : "Female"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-blue-500 text-white cursor-pointer p-2 rounded hover:bg-blue-600"
                  >
                    <FaEdit size={16} />
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(student)}
                    className="bg-red-500 cursor-pointer text-white p-2 rounded hover:bg-red-600"
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editStudent && (
        <Update student={editStudent} onClose={() => setEditStudent(null)} />
      )}

      {deleteStudentData && (
        <ConfirmDelete
          studentName={`${deleteStudentData.name} ${deleteStudentData.familyName}`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteStudentData(null)}
        />
      )}
    </div>
  );
};

export default List;

