

import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export function AdminDashboard(){

    const [videos, setVideos ] = useState([{VideoId:0,Title:'', Url:'', Likes:'', Dislikes:'', Views:0, CategoryId:0}]);

    function LoadVideos(){
        axios.get(`http://127.0.0.1:5000/videos`)
        .then(response=>{
            setVideos(response.data);
        })
    }

    useEffect(()=>{
        LoadVideos();
    },[])

    return(
        <div className="container-fluid" style={{height:'100vh'}}>
            <h3 className="text-white">Admin Dashboard</h3>
            <div>
                <Link to="/add-video" className="btn my-2 btn-primary bi bi-camera-video"> Add Video</Link>
                <Link to="/user-dash" className="btn mx-2 btn-warning bi bi-person-fill">User Dashboard</Link>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            videos.map(video=>

                                <tr key={video.VideoId}>
                                    <td>{video.Title}</td>
                                    <td>
                                        <iframe src={video.Url} width="200" height="100"></iframe>
                                    </td>
                                    <td>
                                        <Link to={`/edit-video/${video.VideoId}`} className="btn btn-warning bi bi-pen">Edit</Link>
                                        <Link to={`/delete-video/${video.VideoId}`} className="btn mx-2 btn-danger bi bi-trash">Delete</Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}