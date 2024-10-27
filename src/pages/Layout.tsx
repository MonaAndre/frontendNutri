import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigering';

export const Layout = () => {
    return (
        <div className='h-screen flex flex-col justify-between'>
            <header>
               <Navigation/>
            </header>
            <main>
                <div className="container px-5">
                    <Outlet />
                </div>

            </main>
            <footer className='footer'>
               <h3>Examenarmetet: NutriTrack</h3>  
               <p>Mona Andreeva, Medieinstitutet, 2025</p>
            </footer>
        </div>
    );
};
