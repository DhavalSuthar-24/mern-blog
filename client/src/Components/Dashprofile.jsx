import { Button, TextInput, Alert } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Fixed import
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from "../firebase";
import { updateStart,updateFailure } from '../redux/user/user.slice.js';

const Dashprofile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(0);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formdata, setFormData] = useState({}); // Fixed variable name and added missing import

    const dispatch = useDispatch(); // Fixed typo in useDispatch

    const filePickerRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        uploadImage();
    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploadError(null);
        if (!imageFile) return;

        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setImageUploadProgress(progress);
        }, (error) => {
            setImageFileUploadError("Couldn't upload the image (file must be under 2MB)");
            console.log(error);
            setImageUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                setImageFileUrl(downloadUrl);
                setFormData({ ...formdata, profilepic: downloadUrl }); // Fixed variable name
            });
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.id]: e.target.value }); // Fixed variable name
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formdata).length === 0) {
            return;
        }
        try {
            await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                body: JSON.stringify(formdata), // Fixed missing body in the fetch request
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json()
            if(res.ok){
                dispatch(updateStart(data));
            }else{
                dispatch(updateFailure(data.message))
            }
            dispatch(updateStart(formdata));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden relative" onClick={() => filePickerRef.current.click()}>
                    {imageUploadProgress && (
                        <CircularProgressbar
                            value={imageUploadProgress || 0}
                            text={`${imageUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    zIndex: 1,
                                },
                                path: {
                                    stroke: '#fff',
                                    transition: `rgba(62,152,199,${imageUploadProgress / 100})`,
                                    transform: `rotate(${imageUploadProgress}deg)`
                                },
                            }}
                        />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profilepic}
                        alt="user"
                        className={`self-center w-full h-full border-4 object-cover border-gray-300 absolute top-0 left-0 transform-translate-x-1/2 transform-translate-y-1/2 ${imageUploadProgress && imageUploadProgress < 100 && 'opacity-60'}`}
                        style={{ zIndex: 0 }}
                    />
                </div>
                {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

                <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser.username} onChange={handleChange} />
                <TextInput type="email" id="email" placeholder="Email" defaultValue={currentUser.email} onChange={handleChange} />
                <TextInput type="password" id="password" placeholder="Password" onChange={handleChange} />
                <Button gradientDuoTone="purpleToBlue" type="submit" outline>Update</Button>
            </form>
            <div className="text-red-500 flex justify-between mt-5">
                <span className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer">Sign out</span>
            </div>
        </div>
    );
};

export default Dashprofile;
