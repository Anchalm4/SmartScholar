import { useState } from "react";
import { motion } from "framer-motion";
import { updateProfile } from "../api";
import "./ProfileForm.css";

export default function ProfileForm() {

  // GET USER FROM LOCAL STORAGE
  const savedUser = localStorage.getItem("user");
  const user = savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
  const userId = user?.id;

  const [step, setStep] = useState(1);

  // ✔ FIXED FIELDS (match backend exactly)
const [form, setForm] = useState({
  semester: "",
  cgpa: "",
  desired_cgpa: "",
  area_of_interest: "",
  phone_no: "",
  dream_company: "",
  dream_role: "",
  skills: [],
});


  const [loading, setLoading] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
await updateProfile(userId, {
  semester: parseInt(form.current_semester),
  cgpa: parseFloat(form.current_cgpa),
  desired_cgpa: parseFloat(form.desired_cgpa),
  area_of_interest: form.area_of_interest,
  phone_no: form.phone_no,
  dream_company: form.dream_company,
  dream_role: form.dream_role,
  skills: form.skills,   // array
  roadmap: [],           // jsonb, not string
});


      alert("Profile Updated Successfully!");
    } catch (err) {
      console.log(err);
      alert("Error: " + (err.response?.data?.detail || err.message));
    }

    setLoading(false);
  };

  return (
    <div className="form-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="form-card"
      >
        <h1 className="form-title">
          Smart<span>Scholar</span>
        </h1>

        <p className="form-subtitle">
          Step {step} of 2 — Complete your profile
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleNext}>

            <div className="form-group">
              <label className="form-label">Current CGPA</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={form.cgpa}
                onChange={(e) =>
                  setForm({ ...form, cgpa: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Semester</label>
              <select
                className="form-select"
                value={form.semester}
                onChange={(e) =>
                  setForm({ ...form, semester: e.target.value })
                }
                required
              >
                <option value="">Select Semester</option>
                {[1,2,3,4,5,6,7,8].map((s) => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
            </div>

            <motion.button whileHover={{ scale: 1.03 }} type="submit" className="submit-btn">
              Next →
            </motion.button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label className="form-label">Area of Interest</label>
              <input
                type="text"
                className="form-input"
                value={form.area_of_interest}
                onChange={(e) =>
                  setForm({ ...form, area_of_interest: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Desired CGPA</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={form.desired_cgpa}
                onChange={(e) =>
                  setForm({ ...form, desired_cgpa: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-input"
                value={form.phone_no}
                onChange={(e) =>
                  setForm({ ...form, phone_no: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Dream Company</label>
              <input
                type="text"
                className="form-input"
                value={form.dream_company}
                onChange={(e) =>
                  setForm({ ...form, dream_company: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Dream Role</label>
              <input
                type="text"
                className="form-input"
                value={form.dream_role}
                onChange={(e) =>
                  setForm({ ...form, dream_role: e.target.value })
                }
              />
            </div>

            <div className="button-row">
              <button className="back-btn" type="button" onClick={handleBack}>
                ← Back
              </button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Saving..." : "Submit Profile"}
              </motion.button>
            </div>
          </form>
        )}

      </motion.div>
    </div>
  );
}
