import { useNavigate } from 'react-router-dom';

export const SuccessReg = () => {
  const mail = localStorage.getItem("CreatedUsersMail") || '';
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          Konto har registrerats!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          En bekräftelse har skickats till din e-postadress: <span className="font-semibold">{mail}</span>.
          Vänligen bekräfta din e-post för att aktivera ditt konto.
        </p>

        <button
          onClick={() => navigate('/login')}
          className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Gå till inloggning
        </button>
      </div>
    </div>
  );
};
