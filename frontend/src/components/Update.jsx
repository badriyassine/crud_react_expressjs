import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../redux/slices/studentSlice";

export const Update = ({ student, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.students);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formData, setFormData] = useState({
    name: student?.name || "",
    familyName: student?.familyName || "",
    age: student?.age || "",
    birthday: student?.birthday || "",
    regNumber: student?.regNumber || "",
    email: student?.email || "",
    course: student?.course || "",
    gender: student?.gender || "",
  })
  const birthdayDate = () => {
    if (!student?.birthday) return "";
    const date = new Date(student.birthday);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };
  

  // Validation functions
  const validateName = (value) => /^[a-zA-Z\s]*$/.test(value);
  const validateRegNumber = (value) => /^[A-Z0-9]*$/.test(value);
  const validateCourse = (value) => /^[a-zA-Z\s]*$/.test(value);
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validateAge = (value) => value >= 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...fieldErrors };
    delete newErrors[name];

    // validation 9bl update
    if (name === "name" || name === "familyName") {
      if (value && !validateName(value)) {
        newErrors[name] = "Only letters allowed";
      }
    }
    if (name === "regNumber") {
      if (value && !validateRegNumber(value)) {
        newErrors[name] = "Only uppercase letters and numbers allowed";
      }
    }
    if (name === "course") {
      if (value && !validateCourse(value)) {
        newErrors[name] = "Only letters allowed";
      }
    }
    if (name === "email") {
      if (value && !validateEmail(value)) {
        newErrors[name] = "Invalid email format";
      }
    }
    if (name === "age") {
      if (value && !validateAge(value)) {
        newErrors[name] = "Age must be 5 or higher";
      }
    }

    setFieldErrors(newErrors);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: student?.name || "",
      familyName: student?.familyName || "",
      age: student?.age || "",
      birthday: student?.birthday || "",
      regNumber: student?.regNumber || "",
      email: student?.email || "",
      course: student?.course || "",
      gender: student?.gender || "",
    });
    setFieldErrors({});
    onClose?.();
  };

  const handleUpdate = async () => {
    // Validate all fields
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    else if (!validateName(formData.name)) errors.name = "Only letters allowed";

    if (!formData.familyName) errors.familyName = "Family name is required";
    else if (!validateName(formData.familyName))
      errors.familyName = "Only letters allowed";

    if (!formData.regNumber)
      errors.regNumber = "Registration number is required";
    else if (!validateRegNumber(formData.regNumber))
      errors.regNumber = "Only uppercase letters and numbers allowed";

    if (!formData.email) errors.email = "Email is required";
    else if (!validateEmail(formData.email)) errors.email = "Invalid email";

    if (!formData.course) errors.course = "Course is required";
    else if (!validateCourse(formData.course))
      errors.course = "Only letters allowed";

    if (!formData.age) errors.age = "Age is required";
    else if (!validateAge(formData.age)) errors.age = "Age must be 5 or higher";

    if (!formData.birthday) errors.birthday = "Birthday is required";
    if (!formData.gender) errors.gender = "Gender is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    await dispatch(updateStudent({ id: student._id, data: formData }));
    onClose?.();
  };

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      {/* Popup card */}
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Update Student
        </h2>

        <div className="space-y-5">
          {/* Name & Family */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`border p-2 rounded-md ${
                  fieldErrors.name ? "border-red-500" : "border-green-500"
                }`}
              />
              {fieldErrors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldErrors.name}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Family Name</label>
              <input
                type="text"
                name="familyName"
                value={formData.familyName}
                onChange={handleChange}
                className={`border p-2 rounded-md ${
                  fieldErrors.familyName ? "border-red-500" : "border-green-500"
                }`}
              />
              {fieldErrors.familyName && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldErrors.familyName}
                </span>
              )}
            </div>
          </div>

          {/* Age & Birthday */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`border p-2 rounded-md ${
                  fieldErrors.age ? "border-red-500" : "border-green-500"
                }`}
              />
              {fieldErrors.age && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldErrors.age}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Birthday</label>
              <input
                type="date"
                name="birthday"
                value={birthdayDate()}
                onChange={handleChange}
                className={`border p-2 rounded-md ${
                  fieldErrors.birthday ? "border-red-500" : "border-green-500"
                }`}
              />
              {fieldErrors.birthday && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldErrors.birthday}
                </span>
              )}
            </div>
          </div>

          {/* Registration & Email */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1">Registration Number</label>
              <input
                type="text"
                name="regNumber"
                value={formData.regNumber}
                onChange={handleChange}
                className={`border p-2 rounded-md ${
                  fieldErrors.regNumber ? "border-red-500" : "border-green-500"
                }`}
              />
              {fieldErrors.regNumber && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldErrors.regNumber}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`border p-2 rounded-md ${
                  fieldErrors.email ? "border-red-500" : "border-green-500"
                }`}
              />
              {fieldErrors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldErrors.email}
                </span>
              )}
            </div>
          </div>

          {/* Course & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-1">Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Web Development, Design..."
                className={`border p-2 rounded-md ${
                  fieldErrors.course ? "border-red-500" : "border-green-500"
                }`}
              />
              {fieldErrors.course && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldErrors.course}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1">Gender</label>
              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="accent-green-500"
                  />
                  Male
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="accent-green-500"
                  />
                  Female
                </label>
              </div>
              {fieldErrors.gender && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldErrors.gender}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 ">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border cursor-pointer"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-4 py-2 cursor-pointer rounded-md bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Student"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
