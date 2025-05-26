import { Layout, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { removeStorage } from '../services/helperFunctions';
import { EXIST_LOCAL_STORAGE } from '../services/constants';

const { Header, Content } = Layout;

const MainLayout = () => {
    const username = "John Doe"; // Replace with dynamic username if needed
    let navigate = useNavigate();
    const handleLogout = () => {
        removeStorage(EXIST_LOCAL_STORAGE.AUTHTOKEN); // Clear the authentication token
        navigate('/login'); // Redirect to the login page
    };

    return (
        <Layout>
            <Header style={{ backgroundColor: '#001529', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#fff', fontSize: '16px' }}>{username}</span>
                    <Button type="primary" danger onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </Header>
            <Content style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default MainLayout;