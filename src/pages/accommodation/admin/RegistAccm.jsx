import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegistAccm = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editorData, setEditorData] = useState("");

    const navigate = useNavigate();


    return (
        <div className="App">
            <h3>게시판 작성</h3>
            <div className="title">
                <TextField
                    fullWidth
                    multiline
                    rows={1}
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                />

            </div>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                config={editorConfiguration}
                placeholder="내용을 입력하세요"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            {/* <div className>
            {editorData !== "" ? <Button variant="contained" onClick={handleCancel}>취소</Button> : <Button disabled>취소</Button>}
        </div> */}

            <Box mt={2}>

                <form className="App" onSubmit={handleSubmit}>
                    {/* ... other input fields ... */}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        작성
                    </Button>

                    <Box component="span" mr={2} />

                    {editorData !== "" ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={resetHandler}
                        >
                            다시작성
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            disabled
                        >
                            다시작성
                        </Button>
                    )}

                    <Box component="span" mr={2} />

                    <Button onClick={cancelHandler}
                        variant="contained"
                        color="primary"
                    >
                        취소
                    </Button>
                </form>
            </Box>
        </div>

    );


}

export default RegistAccm;