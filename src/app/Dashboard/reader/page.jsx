import { getUserSession } from "@/lib/core/session";

const ReaderPage =async () => {

    const user = await getUserSession()

    // console.log(user)



    return (
        <div>
            <h2>WelCome Back Reader {user?.name}</h2>
        </div>
    );
};

export default ReaderPage;