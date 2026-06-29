
import { getUserSession } from "@/lib/core/session";

const WriterPage = async () => {

    const user = await getUserSession()

    // console.log(user)



    return (
        <div>
            <h2>WelCome Back writer {user?.name}</h2>
        </div>
    );
};

export default WriterPage;