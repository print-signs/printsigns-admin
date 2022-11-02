
import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import { Link, useHistory, useParams } from 'react-router-dom'
import { isAutheticated } from "../../auth";
import swal from 'sweetalert'
import axios from 'axios'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useCallback } from 'react';


const EditCms = () => {
    const { id } = useParams()
    const token = isAutheticated()
    const history = useHistory()
    const [image, setImage] = useState()
    const [imagesPreview, setImagesPreview] = useState();
    const [data, setData] = useState({
        title: '',
        page_data: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {

        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleImage = (e) => {
        const files = e.target.files[0];
        setImage(files);
        // only for file preview------------------------------------
        const Reader = new FileReader();
        Reader.readAsDataURL(files);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImagesPreview(Reader.result);
            }
        };
        // -----------------------------------------------------------------------------
    };
    const getCms = useCallback(async () => {


        let res = await axios.get(
            `/api/restriction/getOne/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res.data.CmpRestriction) {
            setData((prev) => ({ ...res.data.CmpRestriction }))
            if (res.data.CmpRestriction.image) {
                setImagesPreview(res.data.CmpRestriction.image.url)
            }

        }
    }, [token]
    )

    useEffect(() => {
        getCms();
    }, []);

    const handleSubmit = async () => {
        if (data.title.trim() === '' || data.page_data.trim() === '') {
            swal({
                title: 'Warning',
                text: 'Fill all mandatory fields',
                icon: 'error',
                button: 'Close',
                dangerMode: true,
            })
            return
        }
        setLoading(true)
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('page_data', data.page_data)
        formData.append('image', image)
        try {
            const res = await axios
                .put(`/api/restriction/cms/update/${id}`, formData, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/formdata',
                    },
                })
            if (res.data.success === true) {

                setLoading(false)
                swal({
                    title: 'Edited',
                    text: 'Page edited successfully!',
                    icon: 'success',
                    button: 'Return',
                })
                history.goBack()

            }
        } catch (error) {
            const message = error?.response?.data?.message || 'Something went wrong!'
            setLoading(false)
            swal({
                title: 'Warning',
                text: message,
                icon: 'error',
                button: 'Retry',
                dangerMode: true,
            })
        }
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div
                        className="
                    page-title-box
                    d-flex
                    align-items-center
                    justify-content-between
                  "
                    >
                        <div style={{ fontSize: '28px' }} className="fw-bold mb-3">
                            Edit Page
                        </div>

                        <div className="page-title-right">
                            <button

                                type="button"
                                className="btn btn-success  mt-1  mb-0 my-1 btn btn-success btn-login waves-effect waves-light mr-1"
                                onClick={() => handleSubmit()}
                                disabled={loading}
                            >
                                {loading ? 'Loading' : 'Save'}
                            </button>
                            <Link to="/cms">
                                <button

                                    type="button"
                                    className="btn btn-warning  mt-1  mb-0  btn btn-success btn-login waves-effect waves-light"
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="container bg-light">
                    <div className="card-body">
                        <div className="row ">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">
                                    Title
                                </span>

                                <input
                                    type="text"

                                    className="form-control"
                                    id="title"
                                    value={data.title}
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                            </div>
                        </div>
                        <div>Page data *</div>
                        <div className="input-group  mt-1 mb-3">


                            <textarea
                                rows="3" cols="40"
                                type="text"
                                placeholder='Page data...'
                                className="form-control row-145"
                                id="page_data"
                                value={data.page_data}
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            ></textarea>
                        </div>

                        {/* <div className="row ">
                            <div className="App">
                                <CKEditor
                                    editor={ClassicEditor}
                                    onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle('height', '200px', editor.editing.view.document.getRoot())
                                        })
                                    }}
                                    data={data.page_data}
                                    // config={{
                                    //     extraPlugins: [MyCustomUploadAdapterPlugin],
                                    // }}

                                    onChange={(event, editor) => {
                                        let e = { target: { value: editor.getData(), id: 'page_data' } }
                                        handleChange(e)
                                    }}
                                />
                            </div>
                        </div> */}

                        <div className="row mt-3">
                            <div>image *</div>
                            <div className="col-md-8  ">
                                <input
                                    type="file"
                                    className="form-control"
                                    id="file"
                                    onChange={handleImage}
                                />
                                {/* <p className="pt-1 pl-2 text-secondary">Upload videos, images and pdf only</p> */}
                            </div>
                            <div id="createProductFormImage" className="w-50 d-flex mt-1">

                                {imagesPreview && <img className=" w-50 p-1 " src={imagesPreview} alt="Product Preview" />}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCms
