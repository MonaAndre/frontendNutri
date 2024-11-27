import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navigering';
import { Logo } from '../components/Logo';


export const Layout = () => {
    return (
        <div className='h-screen flex flex-col justify-between relative'>
            <header className='header' >
                <Navbar />
            </header>
            <main className='mt-10'>
                <div className="container px-5 mx-auto flex flex-col gap-10">
                    <Outlet />
                </div>

            </main>
            <footer className='footer'>
                <div className="container">
                    <div className="footer-box">
                        <Logo/>

                <h3>Examenarbetet: NutriTrack</h3>
                <p>Mona Andreeva, Medieinstitutet, 2025</p> 
                    </div>
                   
                </div>
               
            </footer>
        </div>
    );
};
