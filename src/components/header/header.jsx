import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../firebase/auth';
import { useAuth } from '../../context/authcontext/authcontext';

function Header() {
  const navigate = useNavigate()
  const { value } = useAuth();
  console.log(value.currentUser);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
        <div className="container-fluid">
         
          <div className="mx-auto">
            {value.userLoggedIn ? null : (
              <>
                <Link className="me-3" to='/login'>Login</Link>
                <Link to='/singup'>Register New Account</Link>
              </>
            )}
          </div>

          
          {value.userLoggedIn && (
            <div class='d-flex align-items-center justify-content-end  gap-3'>
            <p class='text-info font-weight-bold fs-4'>Welcome {value.currentUser?.displayName}</p>
            <button
              onClick={() => {
                logOut().then(() => {
                  navigate('/login');
                });
              }}
              type="button" class="btn btn-info"
            >
              Logout
            </button>
            </div>
          )}
        </div>
      </nav>

    </div>
  )
};

export default Header;
