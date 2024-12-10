import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultvalue = '' }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}

      <Controller
        name={name || 'content'}
        control={control}
        defaultValue={defaultvalue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="YOUR_TINYMCE_API_KEY" // Replace with your TinyMCE API key
            value={value} // Use value from react-hook-form
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | removeformat | help',
                content_style:' body {font-family:Helvetica,Arial sans-sarif ; font-size-14px}'
            }}
            onEditorChange={onChange} // Pass content updates to react-hook-form
          />
        )}
      />
    </div>
  );
}
