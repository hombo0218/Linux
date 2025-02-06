// API のベースURL
const API_BASE = 'http://localhost:3000/api';

// ブックマーク一覧を取得して表示する
function fetchBookmarks() {
    fetch(`${API_BASE}/bookmarks`)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('bookmarkList');
            list.innerHTML = ''; // リストをクリア
            data.forEach(bookmark => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = `${bookmark.title} (${bookmark.url})`;
                list.appendChild(li);
            });
        })
        .catch(error => console.error('エラー:', error));
}

// ページ読み込み時にブックマーク一覧を取得
document.addEventListener('DOMContentLoaded', fetchBookmarks);

// フォーム送信時の処理
document.getElementById('bookmarkForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const url = document.getElementById('url').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const tags = document.getElementById('tags').value;

    fetch(`${API_BASE}/bookmarks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, title, description, tags })
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById('bookmarkForm').reset(); // フォームリセット
            fetchBookmarks(); // リスト更新
        })
        .catch(error => console.error('エラー:', error));
});

$('button').click(function(){
    swal({
    title: 'Are you sure?',
    text: "It will permanently deleted !",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(function() {
    swal(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    );
  })
    
  })