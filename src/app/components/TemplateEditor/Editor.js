import React, { useEffect, useRef } from 'react';
import tinymce from 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/table';
import 'tinymce/plugins/code';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/searchreplace';

const MyEditor = props => {
  const fillEditor = props.fillEditor || 'Create your template.';

  useEffect(() => {
    tinymce.init({
      selector: '#my-editor',
      plugins: ['table', 'code', 'advlist', 'lists', 'searchreplace', 'print'],
      toolbar:
        'undo redo print | bold italic forecolor backcolor fontsize fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | table | bullist numlist searchreplace | removeformat code',
      menubar: false,
      height: 1000,
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; }',
      font_size_formats: '8pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 24pt ',

      setup: editor => {
        editor.on('change', () => {
          const content = editor.getContent();
          props.setContentEditor(content);
        });
      },
      init_instance_callback: editor => {
        editor.setContent(fillEditor); // Set the initial value
      }
    });

    return () => {
      tinymce.remove('#my-editor');
    };
  }, []);

  return <textarea id="my-editor" />;
};

export default MyEditor;
