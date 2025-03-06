import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onChange: (base64: string) => void;
  value: string;
  label: string;
  disabled: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  label,
  disabled,
}) => {
  const [base64, setBase64] = useState(value);
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event?.target?.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height={100} width={100} alt="Upload Image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;

// without using react dropzone
// import Image from "next/image";
// import React, { useState, useCallback } from "react";

// interface ImageUploadProps {
//   onChange: (base64: string) => void;
//   value: string;
//   label: string;
//   disabled: boolean;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   onChange,
//   value,
//   label,
//   disabled,
// }) => {
//   const [base64, setBase64] = useState(value);
//   const [dragging, setDragging] = useState(false);

//   const handleFile = useCallback(
//     (file: File) => {
//       if (!file) return;

//       const reader = new FileReader();
//       reader.onload = (e: ProgressEvent<FileReader>) => {
//         if (e.target?.result) {
//           const base64String = e.target.result.toString();
//           setBase64(base64String);
//           onChange(base64String);
//         }
//       };
//       reader.readAsDataURL(file);
//     },
//     [onChange]
//   );

//   // 📌 Handle file input change
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) handleFile(file);
//   };

//   // 📌 Handle drag events
//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragging(false);
//   };

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setDragging(false);

//     const file = event.dataTransfer.files?.[0];
//     if (file) handleFile(file);
//   };

//   return (
//     <div
//       className={`w-full p-4 text-center border-2 border-dotted rounded-md border-neutral-700 ${
//         dragging ? "bg-gray-800 border-white" : "bg-transparent"
//       }`}
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//     >
//       <input
//         type="file"
//         accept="image/png, image/jpeg"
//         onChange={handleFileChange}
//         disabled={disabled}
//         className="hidden"
//         id="fileInput"
//       />
//       <label htmlFor="fileInput" className="cursor-pointer">
//         {base64 ? (
//           <div className="flex items-center justify-center">
//             <Image src={base64} height={100} width={100} alt="Uploaded Image" />
//           </div>
//         ) : (
//           <p className="text-white">
//             {dragging ? "Drop the image here" : label}
//           </p>
//         )}
//       </label>
//     </div>
//   );
// };

// export default ImageUpload;
