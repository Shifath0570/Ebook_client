'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

console.log(baseUrl)

export const createBooks = async (newUserData)=>{
    const res = await fetch(`${baseUrl}/api/book`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(newUserData),
    })

    return await res.json();
}


