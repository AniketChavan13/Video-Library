import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";



export function EditVideo(){

    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0, Views:0, CategoryId:0}]);
    const [categories, SetCategories]= useState([{CategoryId:0, CategoryName:''}]);

    let params = useParams();
    let navigate = useNavigate();

    function LoadCategories(){
        axios.get(`http://127.0.0.1:5000/categories`)
        .then(response =>{
            response.data.unshift({CategoryId:0, CategoryName:'Select Category'});
            SetCategories(response.data);
        })
    }

    function GetVideo(){
        axios.get(`http://127.0.0.1:5000/video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        } )
    }

    useEffect(()=>{
        LoadCategories();
        GetVideo();
    },[])

    const formik = useFormik({

        initialValues:{
            VideoId:videos[0].VideoId,
            Title:videos[0].Title,
            Url:videos[0].Url,
            Likes:videos[0].Likes,
            Dislikes:videos[0].Dislikes,
            Views:videos[0].Views,
            CategoryId:videos[0].CategoryId
        },
        onSubmit:(video) =>{
            axios.put(`http://127.0.0.1:5000/edit-video/${video.VideoId}`, video)
            .then(()=>{
                alert('Video Updated');
                navigate('/admin-dash');
            })
        },
        enableReinitialize: true
    })

    return(
        <div className="container-fluid" style={{height:'100vh'}}>
            <form onSubmit={formik.handleSubmit}>
                <h3 className="text-white">Edit Video</h3>
                <dl>
                    <dt className="text-white">Video Id</dt>
                    <dd><input type="number" value={formik.values.VideoId} onChange={formik.handleChange} name="VideoId"/></dd>
                    <dt className="text-white">Title</dt>
                    <dd><input type="text" value={formik.values.Title} onChange={formik.handleChange} name="Title"/></dd>
                    <dt className="text-white">Url</dt>
                    <dd><input type="text" value={formik.values.Url} onChange={formik.handleChange} name="Url"/></dd>
                    <dt className="text-white">Likes</dt>
                    <dd><input type="number" value={formik.values.Likes} onChange={formik.handleChange} name="Likes"/></dd>
                    <dt className="text-white">Dislikes</dt>
                    <dd><input type="number" value={formik.values.Dislikes} onChange={formik.handleChange} name="Dislikes"/></dd>
                    <dt className="text-white">Views</dt>
                    <dd><input type="number" value={formik.values.Views} onChange={formik.handleChange} name="Views"/></dd>
                    <dt className="text-white">Category</dt>
                    <dd>
                    <select name="CategoryId" onChange={formik.handleChange} value={formik.values.CategoryId}>
                           {
                                categories.map(category =>
                                <option key={category.CategoryId} value={category.CategoryId}>
                                {category.CategoryName}
                                </option>
                               )
                            }
                    </select>

                    </dd>
                </dl>
                <button className="btn btn-success">Save</button>
                <Link to="/admin-dash" className="btn btn-warning mx-2">Cancel</Link>
            </form>
        </div>
    )
}