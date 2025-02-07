document.addEventListener("DOMContentLoaded", () => {
    fetchBookmarks();

    // 削除ボタンのイベントリスナーを追加
    document.getElementById("deleteSelected").addEventListener("click", deleteSelectedBookmarks);
});

// ブックマーク一覧を取得して表示
async function fetchBookmarks() {
    try {
        const response = await fetch("/bookmarks"); // Rails APIからデータ取得
        const bookmarks = await response.json();

        const tableBody = document.getElementById("bookmarkList");
        tableBody.innerHTML = ""; // 既存のリストをクリア

        bookmarks.forEach(bookmark => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td><input type="checkbox" class="bookmark-checkbox" data-id="${bookmark.id}"></td>
                <td><a href="${bookmark.url}" target="_blank">${bookmark.url}</a></td>
                <td>${bookmark.title}</td>
                <td>${bookmark.description || "なし"}</td>
                <td>${bookmark.tags || "なし"}</td>
                <td>${bookmark.category}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("データの取得に失敗しました", error);
    }
}

// 選択したブックマークを削除
async function deleteSelectedBookmarks() {
    const checkboxes = document.querySelectorAll(".bookmark-checkbox:checked");
    if (checkboxes.length === 0) {
        alert("削除するブックマークを選択してください。");
        return;
    }

    if (!confirm("選択したブックマークを削除しますか？")) return;

    const deletePromises = Array.from(checkboxes).map(async checkbox => {
        const id = checkbox.dataset.id;
        try {
            const response = await fetch(`/bookmarks/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) {
                throw new Error("削除に失敗しました");
            }
        } catch (error) {
            console.error("削除エラー", error);
        }
    });

    await Promise.all(deletePromises);
    alert("削除が完了しました");
    fetchBookmarks(); // 再取得してリスト更新
}