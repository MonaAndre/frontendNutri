import { useNavigate } from 'react-router-dom';

export const SuccessDeleteUser = () => {
  const navigate = useNavigate();

  return (
  
    
      <div className="bg-slate-200 dark:bg-slate-800 font-thin rounded-lg p-6  mx-auto text-center max-w-md w-full">
        <h2 className="text-3xl  text-green-600 mb-4">
        Konto har raderats!
        </h2>
        <p className=" text-gray-300 mb-6">
        Ditt konto har raderats permanent från vårt system. Om du vill återvända någon gång, är du alltid välkommen att skapa ett nytt konto.
        </p>

        <button
          onClick={() => navigate('/register')}
          className="btn primary-btn"
        >
          Registrera enn ny konto
        </button>
     
    </div>
   
  );
};
