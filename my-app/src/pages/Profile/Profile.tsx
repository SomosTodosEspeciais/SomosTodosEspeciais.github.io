import './Profile.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext/AuthContext'; // Importando o contexto de autenticação




const Profile = () => {

    
    const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
    const { currentUser, isAdmin } = useAuth();
    const {menu} = useParams()

    var menuAux = "Profile"
    
    if(menu != undefined){
        menuAux = menu
    }

    const [currentMenu, setCurrentMenu] = useState(menuAux);
    
    


        return (<>

            <div className='Profile'>
                <div className={currentMenu === "TaskHistory" || currentMenu === "ServiceProfile" ? "profileBoxBig" : "profileBox"}>
                    <div className='profileBoxCollumn1'>

                        <button className={currentMenu === "Profile" || currentMenu === "EditProfile" ? "selected" : "free"}
                            onClick={() => { setCurrentMenu("Profile") }}>
                            Profile
                        </button>

                        <button className={currentMenu === "Password" ? "selected" : "free"}
                            onClick={() => { setCurrentMenu("Password") }}>
                            Password
                        </button>
                    
                        {!isAdmin && (
                            <>
                                <button className={(currentMenu === "CancelTasks" ? "selected" : "free")}
                                    onClick={() => { setCurrentMenu("CancelTasks") }}>
                                    Cancel Tasks
                                </button>
                                <button className={(currentMenu === "TaskHistory" ? "selected" : "free")}
                                    onClick={() => { setCurrentMenu("TaskHistory") }}>
                                    Task History
                                </button>
                            </>
                        )}


                        {isAdmin  && (
                            <>

                                <button className={currentMenu === "ServiceProfile" ? "selected" : "free"}
                                    onClick={() => { setCurrentMenu("ServiceProfile") }}>
                                    Service
                                </button>

                                <button className={(currentMenu === "TaskHistory" ? "selected" : "free")}
                                    onClick={() => { setCurrentMenu("TaskHistory") }}>
                                    Task History
                                </button>

                            </>
                        )}



                        <button className={currentMenu === "DeleteAccount" ? "selected" : "free"}
                            onClick={() => { setCurrentMenu("DeleteAccount") }}>
                            Delete Account
                        </button>
                    </div>
                    <div className='profileBoxCollumn2'>
                        
                    </div>
                </div>

            </div>

        </>)


}

export default Profile