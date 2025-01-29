import { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'

export default function PublicRoutes() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (user) {
            toast.success('Already Login please Logout ')
            navigate('/');
        }
    }, [user, navigate]);
  return (
    <>
    <Outlet></Outlet>
    
    </>
  )
}