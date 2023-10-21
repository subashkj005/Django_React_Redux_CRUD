import React, { useEffect, useState } from 'react'
import './UserHome.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../features/userlist/userEditSlice'


function UserHome() {

    // let user = useSelector(state=>state.userlogin.user)
    const storedData = localStorage.getItem('user');
    const user = JSON.parse(storedData);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [user_name, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    const [newImage, setNewImage] = useState(null)

    const apiUrl = 'http://localhost:8000/'

    const handlelogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    const handleImageUpdate = () => {

        const updatedUserData = FormData()
        updatedUserData.append('profile_picture', newImage)

        const userId = user.id
        console.log(user.id, 'user id');

        dispatch(updateUser({ userId, updatedUserData }));

    }

    useEffect(()=>{

        if(user==null){
            navigate('/')
        }else{

            setUsername(`${user.first_name} ${user.last_name}`)
            setEmail(user.email)
            setImage(user.profile_picture)
        }

        
        
    },[])

  return (
    <>
        <form className='profile' >
            <button className='logout-btn' onClick={handlelogout}>Logout</button>
            <h1>User Profile</h1>
            <br />
            <img id="profile-image" src={`${apiUrl}${image}`} alt="User Image" />
            <label htmlFor="image-upload" id="upload-button">Edit Profile Picture</label>
            <input type="file" id="image-upload" onChange={e=>setNewImage(e.target.files[0])} style={{display : 'none'}} />
            <div id="user-details">
                {newImage && <button className='save-btn' onClick={handleImageUpdate}>Save</button>}
                <h2>{user_name}</h2>
                <p>{email}</p>
            </div>
        </form>
    </>
  )
}

export default UserHome