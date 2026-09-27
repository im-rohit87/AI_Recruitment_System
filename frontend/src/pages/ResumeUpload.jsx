// import { useState } from "react";
// import axios from "axios";

// function ResumeUpload() {
//   const [resume, setResume] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//     setResume(e.target.files[0]);
//   };

//   const uploadResume = async () => {
//     if (!resume) {
//       alert("Select a PDF resume");
//       return;
//     }

//     const formData = new FormData();

//     formData.append("resume", file);

//     // Temporary user id
//     formData.append("userId", 1);

//     await axios.post(
//   "http://localhost:5000/api/resumes/upload",
//   formData
// );

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/resumes/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setMessage(response.data.message);

//     } catch (error) {
//       console.error(error);

//       setMessage(
//         error.response?.data?.message ||
//         "Upload Failed"
//       );
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Resume Upload</h1>

//       <input
//         type="file"
//         accept=".pdf"
//         onChange={handleFileChange}
//       />

//       <br />
//       <br />

//       <button onClick={uploadResume}>
//         Upload Resume
//       </button>

//       {message && (
//         <p>{message}</p>
//       )}
//     </div>
//   );
// }

// export default ResumeUpload;


import { useState } from "react";
import axios from "axios";

function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const uploadResume = async () => {
    try {
      if (!resume) {
        alert("Please select a PDF resume");
        return;
      }

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("userId", 1);

      const response = await axios.post(
        "http://localhost:5000/api/resumes/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);

      console.log(response.data);

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
        "Resume upload failed"
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Resume Upload</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      <br />
      <br />

      <button onClick={uploadResume}>
        Upload Resume
      </button>

      <br />
      <br />

      {message && (
        <p>
          <strong>{message}</strong>
        </p>
      )}
    </div>
  );
}

export default ResumeUpload;