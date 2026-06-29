

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getBooks = async ()=>{
    const res = await fetch(`${baseUrl}/api/books`);
    return await res.json();
}

export const getBookMarks = async ()=>{
    const res = await fetch(`${baseUrl}/api/bookmark`);
    return await res.json();
}

export const getBooksDetails = async (id)=>{
    const res = await fetch(`${baseUrl}/api/books/${id}`);
    return await res.json();
}

export const getUsers = async ()=>{
    const res = await fetch(`${baseUrl}/api/user`);
    return await res.json();
}

export const getPurchesBooks = async ()=>{
    const res = await fetch(`${baseUrl}/api/bookPurches`);
    return await res.json();
}

// export const getPurchesBookDetails = async (id)=>{
//     const res = await fetch(`${baseUrl}/api/bookPurchesDetails/${id}`);
//     return await res.json();
// }

// export const getBookPurches = async (purcheserId)=>{
//     const res = await fetch(`${baseUrl}/api/bookPurches?purcheserId=${purcheserId}`);
//     return await res.json();
// }


