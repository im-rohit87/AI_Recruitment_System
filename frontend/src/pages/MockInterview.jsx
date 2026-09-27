import { useEffect, useRef, useState } from "react";
import axios from "axios";

function MockInterview() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);

  const chunksRef = useRef([]);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

      videoRef.current.srcObject = stream;

      mediaRecorderRef.current =
        new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable =
        (event) => {
          chunksRef.current.push(event.data);
        };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(
          chunksRef.current,
          {
            type: "video/webm",
          }
        );

        setVideoBlob(blob);

        chunksRef.current = [];
      };
    } catch (error) {
      console.error(error);
      alert("Camera access denied");
    }
  };

  const startRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.start();

    setRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();

    setRecording(false);
  };

  const uploadRecording = async () => {
    if (!videoBlob) {
      alert("No recording found");
      return false;
    }

    const formData = new FormData();

    formData.append(
      "video",
      videoBlob,
      "interview.webm"
    );

    formData.append(
      "userId",
      1
    );

    try {
      const response =
        await axios.post(
          "http://localhost:5000/api/interviews/upload-video",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      alert(response.data.message);

      return true;
    } catch (error) {
      console.error(error);

      alert("Video upload failed");

      return false;
    }
  };

  const finishInterview = async () => {
    try {
      const uploaded =
        await uploadRecording();

      if (!uploaded) {
        return;
      }

      await axios.post(
        "http://localhost:5000/api/interviews/complete",
        {
          interviewId: 1,
        }
      );

      await axios.post(
        "http://localhost:5000/api/evaluation/evaluate",
        {
          userId: 1,
        }
      );

      alert(
        "Interview Completed Successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to complete interview"
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1>Mock Interview</h1>

      <video
        ref={videoRef}
        autoPlay
        muted
        width="700"
        style={{
          borderRadius: "10px",
          border: "2px solid #ccc",
        }}
      />

      <br />
      <br />

      {!recording ? (
        <button
          onClick={startRecording}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
          }}
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
          }}
        >
          Stop Recording
        </button>
      )}

      <button
        onClick={uploadRecording}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
        }}
      >
        Upload Recording
      </button>

      <button
        onClick={finishInterview}
        style={{
          padding: "10px 20px",
        }}
      >
        Finish Interview
      </button>
    </div>
  );
}

export default MockInterview;