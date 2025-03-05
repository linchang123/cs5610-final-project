{/**
    Text Editor is implemented using "react-simple-wysiwyg" package.
    Reference: https://github.com/megahertz/react-simple-wysiwyg/tree/master?tab=readme-ov-file
    */}

import Editor from 'react-simple-wysiwyg';
import quizProps from '../Quizzes/QuizProps';
    
export default function TextEditor({quiz, setQuizData}: {quiz: quizProps; setQuizData: (quiz: quizProps) => void}) {
    // const [html, setHtml] = useState('my <b>HTML</b>');
    
    function onChange(e: { target: { value: any; }; }) {
    // setHtml(e.target.value);
    setQuizData({...quiz, quizDetails: e.target.value})
    }

    return (
    <Editor containerProps={{ style: { height: "150px" } }} value={quiz.quizDetails} onChange={onChange} />
    );
}