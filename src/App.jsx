import { useEffect } from 'react'

// import { CardSim } from "lucide-react";

import './App.css'
import PayskulStudentLanding from './pages/forStudent'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './pages/layout';
import StudentLoan from './pages/StudentLoan';
import SuccessPage from './pages/SuccessPage';
import WaitlistForm from './pages/WaitListForm';
import WaitList from './pages/WaitList';
import WaitlistPage from './pages/waitListPage';
import ForIndividuals from './pages/ForIndividuals';
import StudentRegistrationForm from './pages/studentReg';

function App() {
   useEffect(() => {
//     // Get the visit count from localStorage
    const visitCount = localStorage.getItem("visitCount");

//     // Convert to number and increment
    const newCount = visitCount ? parseInt(visitCount, 10) + 1 : 1;

//     // Update localStorage
    localStorage.setItem("visitCount", newCount);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/school", element: <StudentLoan /> },
        { path: '/payment-success', element: <SuccessPage />},
        { path: '/wait-list', element: <WaitlistPage />},
        { path: '/wait-list/forschools', element: <WaitList />},
        { path: '/wait-list/individual', element: <StudentRegistrationForm />},





        { index: true, element: <PayskulStudentLanding /> },
        { path: "*", element: <h1>404</h1>}
      ],
    },
  ]);

  return <RouterProvider router={router} />;

}

export default App;

