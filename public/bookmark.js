document.getElementById('bookmarkForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const url = document.getElementById('url').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const tags = document.getElementById('tags').value;
    const category = document.getElementById('category').value;

    const data = { bookmark: { url, title, description, tags, category } };

    try {
        const response = await fetch('/bookmarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            document.getElementById('bookmarkForm').reset();
        } else {
            const result = await response.json();
            alert(`エラー: ${result.errors.join(', ')}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('エラーが発生しました。');
    }
});
