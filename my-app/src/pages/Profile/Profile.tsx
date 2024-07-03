import './Profile.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext/AuthContext'; // Importando o contexto de autenticação
import EditExtras from '../../components/EditExtras/EditExtras';




const Profile = () => {


    const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
    const { currentUser, isAdmin } = useAuth();
    const { menu } = useParams()

    var menuAux = "Profile"

    if (menu != undefined) {
        menuAux = menu
    }

    const [currentMenu, setCurrentMenu] = useState(menuAux);




    return (<>

        <div className='Profile'>
            <div className={currentMenu === "TaskHistory" || currentMenu === "ServiceProfile" ? "profileBoxBig" : "profileBox"}>
                <div className='profileBoxCollumn1'>

                    <button className={currentMenu === "Profile" || currentMenu === "EditProfile" ? "selected" : "free"}
                        onClick={() => { setCurrentMenu("Profile") }}>
                        Perfil
                    </button>


                    {!isAdmin && (
                        <>
                            <button className={currentMenu === "Password" ? "selected" : "free"}
                                onClick={() => { setCurrentMenu("Password") }}>
                                Password
                            </button>



                        </>
                    )}


                    {isAdmin && (
                        <>

                            <button className={currentMenu === "atividades" ? "selected" : "free"}
                                onClick={() => { setCurrentMenu("atividades") }}>
                                Atividades
                            </button>

                            <button className={(currentMenu === "extras" ? "selected" : "free")}
                                onClick={() => { setCurrentMenu("extras") }}>
                                Extras
                            </button>

                        </>
                    )}
                </div>
                <div className='profileBoxCollumn2'>
                    <div className={currentMenu === "extras" ? "profileSelected" : "menuFree"}>
                        <EditExtras></EditExtras>
                    </div>
                </div>
            </div>

        </div>

    </>)


}

export default Profile