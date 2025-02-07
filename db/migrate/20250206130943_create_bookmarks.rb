class CreateBookmarks < ActiveRecord::Migration[7.0]
  def change
    create_table :bookmarks do |t|
      t.string :url, null: false
      t.string :title, null: false
      t.text :description
      t.string :tags
      t.string :category, default: "未分類"

      t.timestamps
    end
  end
end
