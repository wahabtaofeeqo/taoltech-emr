import CustomButton from "@/components/ui/Button";
import CustomInput from "@/components/ui/Input";
import React, { useState, useRef } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { ImFolderUpload } from "react-icons/im";
import { MdEmail, MdOutlineFileDownload } from "react-icons/md";

interface LabFile {
  id: string;
  docName: string;
  docDate: string;
  uploadedBy: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  uploadDate: string;
  fileUrl?: string;
}

const Laboratory = () => {
  const tableHeaders = ["Test", "Document Date", "Uploaded By", "View"];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [docName, setdocName] = useState("");
  const [docDate, setdocDate] = useState("");
  const [uploadedBy, setUploadedBy] = useState("Dr. Smith");
  const [labFiles, setLabFiles] = useState<LabFile[]>([
    {
      id: "1",
      docName: "Blood Test",
      docDate: "2024-01-15",
      uploadedBy: "Dr. Johnson",
      fileName: "blood_test_results.pdf",
      fileType: "pdf",
      fileSize: "2.4 MB",
      uploadDate: "2024-01-15",
    },
    {
      id: "2",
      docName: "CT Scan",
      docDate: "2024-01-10",
      uploadedBy: "Dr. Wilson",
      fileName: "ct_scan_report.pdf",
      fileType: "pdf",
      fileSize: "5.7 MB",
      uploadDate: "2024-01-10",
    },
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      // Check file type
      const allowedTypes = [
        ".jpg",
        ".jpeg",
        ".png",
        ".pdf",
        ".docx",
        ".svg",
        ".zip",
      ];
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension || "")) {
        alert(
          "Please select a valid file type (JPG, PNG, PDF, DOCX, SVG, ZIP)"
        );
        return;
      }

      setSelectedFile(file);

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !docName || !docDate) {
      alert("Please fill in all required fields and select a file");
      return;
    }

    const newLabFile: LabFile = {
      id: Date.now().toString(),
      docName,
      docDate,
      uploadedBy: uploadedBy || "Dr. Smith",
      fileName: selectedFile.name,
      fileType: selectedFile.name.split(".").pop()?.toLowerCase() || "",
      fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split("T")[0],
    };

    setLabFiles((prev) => [newLabFile, ...prev]);

    // Reset form
    setSelectedFile(null);
    setFilePreview(null);
    setdocName("");
    setdocDate("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    alert("File uploaded successfully!");
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = (file: LabFile) => {
    // Simulate file download
    alert(`Downloading ${file.fileName}`);
    console.log("Downloading file:", file);
  };

  const handleView = (file: LabFile) => {
    // Simulate file view
    alert(`Viewing ${file.fileName}`);
    console.log("Viewing file:", file);
  };

  const handleDelete = (fileId: string) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setLabFiles((prev) => prev.filter((file) => file.id !== fileId));
    }
  };

  const formatFileType = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toUpperCase();
    return extension || "FILE";
  };

  const getFileIcon = (fileType: string) => {
    const imageTypes = ["jpg", "jpeg", "png", "svg"];
    if (imageTypes.includes(fileType)) {
      return "🖼️";
    } else if (fileType === "pdf") {
      return "📄";
    } else if (fileType === "docx") {
      return "📝";
    } else if (fileType === "zip") {
      return "📦";
    }
    return "📁";
  };

  return (
    <div className="text-sm px-2 pb-8">
      <div className="grid grid-cols-3 gap-4">
        {/* Patient Info */}
        <div>
          <div className="flex items-start gap-4 p-4">
            <div>
              <img
                src="https://picsum.photos/200/?random=1"
                alt="patient"
                className="rounded-full w-[150px] shadow"
              />
            </div>
            <div className="space-y-2">
              <p className="font-bold text-lg mb-4">John Carter</p>
              <p className="font-bold">Male</p>
              <p className="">Age: 45</p>
              <p className="">ID: MD/2005/12</p>
            </div>
          </div>
          <div className="p-2 font-medium text-base space-y-1">
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary-blue" />
              <span>09035653117</span>
            </p>
            <p className="flex items-center gap-2">
              <MdEmail className="text-primary-blue" />
              <span>sammatt@gmail.com</span>
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-blue" />
              <span>12, Araromi Road, Surulere, Lagos</span>
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-lighter-blue rounded-lg shadow-md p-4 h-full overflow-y-auto scrollbar-hide text-xs">
          <p className="text-lg font-lora font-medium mb-2">Upload File(s)</p>

          {/* Test Information */}
          <div className="space-y-2 mb-4">
            <CustomInput
              name="docName"
              label="Document Name"
              placeholder="Enter document name"
              value={docName}
              onChange={(e) => setdocName(e.target.value)}
              required
            />
            <CustomInput
              name="docDate"
              label="Document Date"
              type="date"
              value={docDate}
              onChange={(e) => setdocDate(e.target.value)}
              required
            />
            <CustomInput
              name="uploadedBy"
              label="Uploaded By"
              placeholder="Enter your name"
              value={uploadedBy}
              onChange={(e) => setUploadedBy(e.target.value)}
            />
          </div>

          {/* File Upload Area */}
          <div
            className={`min-h-[150px] bg-white border-2 border-dashed ${
              selectedFile ? "border-green-500" : "border-primary-blue"
            } flex flex-col items-center justify-center gap-2 rounded-lg p-4 transition-colors`}
          >
            {selectedFile ? (
              <div className="text-center">
                <div className="flex flex-col items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">
                    {getFileIcon(selectedFile.name.split(".").pop() || "")}
                  </span>
                  <div>
                    <p className="font-medium truncate max-w-[200px]">
                      {selectedFile.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <p className="text-green-600 text-xs">
                    File selected successfully
                  </p>
                  <CustomButton
                    size="sm"
                    variant="danger"
                    onClick={handleRemoveFile}
                  >
                    Remove file
                  </CustomButton>
                </div>
              </div>
            ) : (
              <>
                <ImFolderUpload color="#155dfc" size={30} />
                <p className="text-gray-500 text-center">
                  Drag & drop or click to upload
                </p>
                <div className="w-full text-center relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,.docx,.svg,.zip"
                    onChange={handleFileSelect}
                    className="absolute w-full h-full top-0 bottom-0 left-0 right-0 cursor-pointer opacity-0"
                  />
                  <CustomButton variant="outline" size="sm">
                    Browse Files
                  </CustomButton>
                </div>
              </>
            )}
          </div>

          <p className="text-gray-500 mt-4 text-center text-xs">
            Supports .jpg, .pdf, .png, .svg, .docx and .zip files (10MB below)
          </p>

          <CustomButton
            onClick={handleUpload}
            className="w-full mt-4"
            disabled={!selectedFile || !docName || !docDate}
          >
            Upload File
          </CustomButton>
        </div>

        {/* File Preview Section */}
        <div className="bg-lighter-blue rounded-lg shadow-md p-4 h-full overflow-y-auto scrollbar-hide">
          <p className="text-lg font-lora font-medium mb-2">File Preview</p>
          <div className="min-h-[200px] bg-white rounded-lg border border-gray-200 flex items-center justify-center">
            {filePreview ? (
              <div className="p-4 text-center">
                <img
                  src={filePreview}
                  alt="File preview"
                  className="max-h-32 mx-auto mb-2 rounded"
                />
                <p className="text-xs text-gray-600">Image Preview</p>
              </div>
            ) : selectedFile ? (
              <div className="text-center p-4">
                <div className="text-4xl mb-2">
                  {getFileIcon(selectedFile.name.split(".").pop() || "")}
                </div>
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {formatFileType(selectedFile.name)} •{" "}
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  No preview available
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <p>No file selected</p>
                <p className="text-xs mt-1">Select a file to see preview</p>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
              <p className="font-medium text-sm mb-2">File Information</p>
              <div className="space-y-1 text-xs">
                <p>
                  <span className="text-gray-600">Name:</span>{" "}
                  {selectedFile.name}
                </p>
                <p>
                  <span className="text-gray-600">Type:</span>{" "}
                  {formatFileType(selectedFile.name)}
                </p>
                <p>
                  <span className="text-gray-600">Size:</span>{" "}
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <p>
                  <span className="text-gray-600">Test:</span>{" "}
                  {docName || "Not specified"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lab Files Table */}
      <div className="mt-8">
        <div className="bg-[#F0FAFF] p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-2">
            <h4 className="mb-4 text-[#020714] font-lora font-semibold text-lg">
              Uploaded Lab Files ({labFiles.length})
            </h4>
          </div>
          <div className="rounded-xl overflow-hidden bg-white">
            <table className="min-w-full rounded-lg font-manrope">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-4 py-4 text-left border-b border-gray-3 font-medium"
                    >
                      {header}
                    </th>
                  ))}
                  <th className="px-4 py-4 text-left border-b border-gray-3 font-medium">
                    Download
                  </th>
                  <th className="px-4 py-4 text-left border-b border-gray-3 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {labFiles.map((file) => (
                  <tr
                    key={file.id}
                    className="text-xs font-bold hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-left border-b border-gray-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                          <span className="text-sm">
                            {getFileIcon(file.fileType)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{file.docName}</p>
                          <p className="text-gray-500 text-xs">
                            {file.fileName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-left border-b border-gray-3">
                      {new Date(file.docDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-left border-b border-gray-3">
                      {file.uploadedBy}
                    </td>
                    <td className="px-4 py-3 text-left border-b border-gray-3">
                      <CustomButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(file)}
                      >
                        View
                      </CustomButton>
                    </td>
                    <td className="px-4 py-3 text-left border-b border-gray-3">
                      <button
                        className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onClick={() => handleDownload(file)}
                      >
                        <MdOutlineFileDownload
                          className="text-green-500"
                          size={20}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-left border-b border-gray-3">
                      <CustomButton
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(file.id)}
                      >
                        Delete
                      </CustomButton>
                    </td>
                  </tr>
                ))}
                {labFiles.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center border-b border-gray-3"
                    >
                      <div className="text-gray-500">
                        <p>No lab files uploaded yet</p>
                        <p className="text-xs mt-1">
                          Upload your first lab file using the form above
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Laboratory;
