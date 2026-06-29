import DashboardSidebar from "../components/dashboard/DashboardSidebar";

const DashboardLayout = ({children}) => {
    return (
        <div>
            <div className="flex min-h-screen">
                <DashboardSidebar></DashboardSidebar>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;