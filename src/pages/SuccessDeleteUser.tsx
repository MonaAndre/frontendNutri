import { useNavigate } from 'react-router-dom';

export const SuccessDeleteUser = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Konto har raderats!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Ditt konto har raderats permanent från vårt system. Om du vill återvända någon gång, är du alltid välkommen att skapa ett nytt konto.
        </p>

        <button
          onClick={() => navigate('/register')}
          className="mt-4 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Tillbaka till registrering sida
        </button>
      </div>
    </div>
  );
};
