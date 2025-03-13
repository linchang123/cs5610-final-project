{/**
    Text Editor is implemented using "react-simple-wysiwyg" package.
    Reference: https://github.com/megahertz/react-simple-wysiwyg/tree/master?tab=readme-ov-file
    */}

import Editor from 'react-simple-wysiwyg';
    
export default function TextEditor({object, setObjectData, field}: {object: any; setObjectData: (object: any) => void; field: string}) {
    // const [html, setHtml] = useState('my <b>HTML</b>');
    
    function onChange(e: { target: { value: any; }; }) {
    // setHtml(e.target.value);
    setObjectData({...object, [field]: e.target.value})
    }

    return (
    <Editor containerProps={{ style: { height: "150px", margin: "10px" } }} value={object[field]} onChange={onChange} className="text-start"/>
    );
}