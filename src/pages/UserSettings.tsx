import { ChangeUserDetails } from '../components/ChangeUserDetails';
import { DeleteUser } from '../components/DeleteUser';
import ThemeSwitcher from '../components/ThemeSwitcher';


export const UserSettings = () => {


    return (
        <>
            <section>
                <h2 className='heading'>Konto Information</h2>
                <p className='text-center'>Du kan ändra din profilinformation här</p>
              <ChangeUserDetails />
            </section>
            <section>
                <h2 className='heading'>Personliga inställningar</h2>
                <div className="flex flex-row gap-3 justify-between flex-wrap">
                    <label htmlFor="">Du kan byta en app theme till ljus eller mörk</label>
                    <ThemeSwitcher />
                </div>
            </section>
            <DeleteUser />
        </>
    );
};
