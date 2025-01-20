import './RegisterUsersPage.css';
import Sidebar from '../../components/Sidebar';
import FormsUsers from '../../components/FormsUsers';

function RegisterUsersPage() {
    return (
        <div className="page-content">
            <Sidebar />
            <div className='main-container'>
                <div className='gray-bar'>
                </div>
                <div className='content'>
                    <FormsUsers />
                </div>
            </div>
        </div>
    );
} 

export default RegisterUsersPage