// utils/fetchUserRole.ts

export async function fetchUserRole(userId: {}, token: string) {
    console.log(userId, token)
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_HOST}/api/user/getuser`;
        const res = await fetch(apiUrl, {
            method: 'POST', // Use POST as required by the endpoint
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }), // Pass the userId in the request body
        });

        if (!res.ok) {
            console.log('not ok res')
            throw new Error('Failed to fetch user role');
        }else{
            console.log('ok res')

        }

        const data = await res.json();
        if (data?.success) {
            console.log('FETCH USER ROLE1',data?.user?.role)
            return data?.user?.role; // assuming the response contains a "role" field
        }

        console.log('FETCH USER ROLE2',data?.user?.role)

    } catch (error) {
        console.error('Error fetching role:', error);
        throw error;
    }
}
