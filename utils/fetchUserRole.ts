// utils/fetchUserRole.ts

export async function fetchUserRole(userId: {}, token: string) {
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
            throw new Error('Failed to fetch user role');
        }

        const data = await res.json();
        if (data?.success) {
            return data?.user?.role; // assuming the response contains a "role" field
        }

    } catch (error) {
        console.error('Error fetching role:', error);
        throw error;
    }
}
