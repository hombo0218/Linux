class BookmarksController < ApplicationController
  def create
    @bookmark = Bookmark.new(bookmark_params)
    if @bookmark.save
      render json: { message: "Bookmark created successfully" }, status: :created
    else
      render json: { errors: @bookmark.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @bookmarks = Bookmark.all
    render json: @bookmarks
  end

  def destroy
    bookmark = Bookmark.find(params[:id])
    if bookmark.destroy
      render json: { message: "Deleted successfully" }, status: :ok
    else
      render json: { error: "Failed to delete" }, status: :unprocessable_entity
    end
  end

  private

  def bookmark_params
    params.require(:bookmark).permit(:url, :title, :description, :tags, :category)
  end
end
