import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../ui/Header";
import Statics from "../components/Statics";
import Filter from "../components/Filter";
import Form from "../components/Form";
import List from "../components/List";
import { fetchStudents } from "../redux/slices/studentSlice";

const Students = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // filter students based on searchTerm and genderFilter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender =
      genderFilter === "all" ? true : student.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  return (
    <div className="p-4 space-y-4">
      <Header />
      <Statics />
      <Filter
        onAddClick={() => setShowForm(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genderFilter={genderFilter}
        setGenderFilter={setGenderFilter}
      />
      {showForm && <Form onClose={() => setShowForm(false)} />}
      <List students={filteredStudents} />
    </div>
  );
};

export default Students;

