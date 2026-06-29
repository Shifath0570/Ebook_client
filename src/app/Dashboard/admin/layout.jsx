import { requireRole } from "@/lib/core/session";


const AminLayout =async ({children}) => {
    await requireRole('admin')
    return children;
};

export default AminLayout;