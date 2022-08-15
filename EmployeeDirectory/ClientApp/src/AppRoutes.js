import { Home } from "./components/Home";
import { EmployeeDetail } from "./components/EmployeeDetail";
import { EmployeeList } from "./components/EmployeeList";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/employee-list',
        element: <EmployeeList />
    },
    {
        path: '/employee-detail',
        element: <EmployeeDetail />
    }
];

export default AppRoutes;
