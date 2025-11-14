import { useState } from "react";
import axios from "axios";
import "./AtsChecker.css";

export default function AtsChecker() {
  const [jobRole, setJobRole] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !jobRole) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await axios.post(
      `http://127.0.0.1:8000/ats/score?job_role=${jobRole}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    setResult(res.data);
    setLoading(false);
  };

  return (
    <div className="ats-container">
      <h1>ATS Resume Checker</h1>

      <form className="ats-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Target Job Role (e.g. Web Developer)"
          onChange={(e) => setJobRole(e.target.value)}
        />

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button disabled={loading} type="submit">
          {loading ? "Analyzing..." : "Check ATS Score"}
        </button>
      </form>

      {result && (
        <div className="ats-result">
          <h2>ATS Score: {result.ats_score}%</h2>

          <p><strong>Missing Keywords:</strong></p>
          <ul>
            {result.missing_keywords.map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>

          <p className="preview">
            <strong>Resume Preview:</strong>
            <pre>{result.resume_text_preview}</pre>
          </p>
        </div>
      )}
    </div>
  );
}
