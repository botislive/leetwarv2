async function fetchInfo(username1, username2) {
    try {
        const response1 = await fetch(`https://leetcode-api-pied.vercel.app/user/${username1}`);
        const response2 = await fetch(`https://leetcode-api-pied.vercel.app/user/${username2}`);

        if (!response1.ok || !response2.ok) {
            throw new Error('Failed to fetch user data');
        }

        const userdata1 = await response1.json();
        const userdata2 = await response2.json();

        if (userdata1.status === 'error' || userdata2.status === 'error') {
            throw new Error('User not found');
        }

        return { userdata1, userdata2 };   

    } catch (error) {
        console.log(error);
        throw error;   
    }
}

export default fetchInfo;
