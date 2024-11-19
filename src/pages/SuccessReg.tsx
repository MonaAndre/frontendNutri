import { useNavigate } from 'react-router-dom';

export const SuccessReg = () => {
  const mail = localStorage.getItem("CreatedUsersMail") || '';
  const navigate = useNavigate();

  return (
   
      <div className="bg-slate-200 dark:bg-slate-800 font-thin rounded-lg p-6  mx-auto text-center max-w-md w-full">
        <h2 className="heading text-blue-600">
          Konto har registrerats!
        </h2>
        <p className=" mb-6">
          En bekräftelse har skickats till din e-postadress: <span className="font-normal">{mail}</span>.
          Vänligen bekräfta din e-post för att aktivera ditt konto.
        </p>

        <button
          onClick={() => navigate('/login')}
          className="btn primary-btn"
        >
          Gå till inloggning
        </button>
     
    </div>
  );
};
