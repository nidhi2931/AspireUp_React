import React, { useState, useEffect } from "react";
import axios from "axios";
import SideMenu from "../sidemenu/Sidemenu";
import { FaDownload } from "react-icons/fa"; // Import Download Icon

const AddDocs = () => {
  const [topics, setTopics] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topicsResponse, filesResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/topics/get"),
          axios.get("http://127.0.0.1:8000/add_docs/get"),
        ]);

        console.log("Topics Data:", topicsResponse.data);
        console.log("Files Data:", filesResponse.data);

        // Map topics with corresponding files
        const updatedTopics = topicsResponse.data.map((topic) => {
          const topicFiles = filesResponse.data
            .filter((file) => file.topic === topic.id)
            .map((file) => file.files);

          return {
            ...topic,
            files: topicFiles.length > 0 ? topicFiles : ["NA"],
          };
        });

        setTopics(updatedTopics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (topicId, event) => {
    const files = event.target.files;
    setSelectedFiles((prev) => ({
      ...prev,
      [topicId]: files,
    }));
  };

  const handleUploadAll = async () => {
    try {
      const uploadPromises = Object.entries(selectedFiles).map(async ([topicId, files]) => {
        const formData = new FormData();
        formData.append("topic", topicId);
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
        return axios.post("http://127.0.0.1:8000/add_docs/create/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      });

      await Promise.all(uploadPromises);
      alert("Files uploaded successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to upload files.");
    }
  };

  return (
    <SideMenu>
      <div className="container">
        <h2 className="title">Topics List</h2>
        <table className="topics-table">
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Topic Name</th>
              <th>Existing Files</th>
              <th>Choose File</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic, index) => {
              const fileCount = topic.files && topic.files.length > 0 ? topic.files.length : 1;

              return (
                <React.Fragment key={topic.id}>
                  {(topic.files && topic.files.length > 0 ? topic.files : ["NA"]).map((file, fileIndex) => (
                    <tr key={`${topic.id}-${fileIndex}`}>
                      {fileIndex === 0 && (
                        <>
                          <td rowSpan={fileCount}>{topic.subject_name || "No Subject"}</td>
                          <td rowSpan={fileCount}>{topic.name || "No Topic"}</td>
                        </>
                      )}
                      <td>
                        {file !== "NA" && typeof file === "string" ? (
                          <>
                            <a href={file} target="_blank" rel="noopener noreferrer" className="file-link">
                              📄 {file.split("/").pop()}
                            </a>
                            <br />
                            {/* Download Button Below */}
                            <a
                              href={file}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="download-btn"
                            >
                              <FaDownload size={14} /> Download
                            </a>
                          </>
                        ) : (
                          <span className="no-file">NA</span>
                        )}
                      </td>
                      {fileIndex === 0 && (
                        <td rowSpan={fileCount}>
                          <input type="file" multiple onChange={(e) => handleFileChange(topic.id, e)} className="file-input" />
                        </td>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        <button onClick={handleUploadAll} className="upload-btn">Upload All</button>

        {/* Add CSS for styling */}
        <style>{`
          .container {
            width: 80%;
            margin: auto;
            text-align: center;
            font-family: Arial, sans-serif;
          }
          .title {
            color: #333;
            margin-bottom: 20px;
          }
          .topics-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .topics-table th, .topics-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: center;
          }
          .topics-table th {
            background-color: #f4f4f4;
          }
          .file-link {
            text-decoration: none;
            color: #007bff;
            font-weight: bold;
          }
          .file-link:hover {
            text-decoration: underline;
          }
          .download-btn {
            display: inline-flex;
            align-items: center;
            margin-top: 5px;
            padding: 5px 10px;
            font-size: 14px;
            color: white;
            background-color: #007bff;
            border-radius: 5px;
            text-decoration: none;
          }
          .download-btn:hover {
            background-color: #0056b3;
          }
          .download-btn svg {
            margin-right: 5px;
          }
          .no-file {
            color: #888;
            font-style: italic;
          }
          .file-input {
            border: 1px solid #ddd;
            padding: 5px;
            border-radius: 4px;
          }
          .upload-btn {
            background-color: #28a745;
            color: white;
            padding: 10px 15px;
            border: none;
            cursor: pointer;
            margin-top: 15px;
            font-size: 16px;
            border-radius: 5px;
          }
          .upload-btn:hover {
            background-color: #218838;
          }
        `}</style>
      </div>
    </SideMenu>
  );
};

export default AddDocs;
