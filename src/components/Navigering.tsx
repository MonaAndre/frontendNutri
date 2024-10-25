import { Link } from "react-router-dom"

export const Navigering = () => {
  return (
   <>
    <nav>
                    <ul className='nav-list'>
                        <li>
                            <Link className='nav-list__item' to="/register">Register</Link>
                        </li>
                        <li>
                            <Link className='nav-list__item' to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
   </>
  )
}
