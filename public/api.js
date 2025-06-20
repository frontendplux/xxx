export async function fetch_post(limit1, limit2) {
    try {
        const res = await fetch('server/post', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ start: limit1, end: limit2 })
        });

        const data = await res.json(); // ✅ PARSE JSON

        if (Array.isArray(data)) {
            return data;
        } else {
            console.error("Expected array, got:", data);
            return [];
        }
    } catch (err) {
        console.error("Fetch error:", err);
        return [];
    }
}
