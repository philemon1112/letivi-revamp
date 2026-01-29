import React from "react";

interface FileInputProps {
  setcv: React.Dispatch<React.SetStateAction<File | any>> ;
  setfilename: React.Dispatch<React.SetStateAction<string>>;
  filename: string;
}

const FileInputField = ({ setcv, setfilename, filename }: FileInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setcv(file);
      setfilename(file.name );
      
    }
  };

  return (
    <div className=" flex w-full border-2 bg-white/50 border-gray-400 divide-x-2 divide-gray-400  rounded-[10px] mb-6">
      <div className="p-4">
        <label className="lg:text-base text-sm" htmlFor="CV">
          Choose files
        </label>
      </div>
      <input
        onChange={handleChange}
        required
        type="file"
        name="CV"
        accept=".doc, .docx, .docs, .pdf"
        id="CV"
        hidden
      />
      <div className="lg:text-base text-sm p-4"> {filename}</div>
    </div>
  );
};

export default FileInputField;
