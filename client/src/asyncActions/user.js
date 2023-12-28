export const auth = async () => {
    try {
        let res = await fetch('http://localhost:5000/api/auth/auth', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
        res = await res.json();
        return res;
    } catch (e) {
        alert(e)
    }
}