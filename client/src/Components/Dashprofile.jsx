import { Button, TextInput, Alert } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Adjusted import
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from "../firebase";

const Dashprofile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(0);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);

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
        setImageFileUploadError(null)
        if (!imageFile) return;

        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName); // Corrected usage of ref function

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
            });
        });
    };

    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
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

                <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser.username} />
                <TextInput type="email" id="email" placeholder="Email" defaultValue={currentUser.email} />
                <TextInput type="password" id="password" placeholder="Password" />
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
